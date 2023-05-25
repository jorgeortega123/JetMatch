import Parse from "parse/dist/parse.min.js";
import { customAlphabet } from "nanoid";
// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = process.env.NEXT_PUBLIC_APPLICATION_ID;
//
const PARSE_HOST_URL = "https://parseapi.back4app.com";
const PARSE_JAVASCRIPT_KEY = process.env.NEXT_PUBLIC_JAVASCRIPT_KEY;
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

const verifyUserFromCache = async () => {
  const tokenCache = localStorage.getItem("token");
  if (!tokenCache) {
    console.log("NO EXISTE");
    return false;
  } else {
    console.log("Si EXISTE");
    return verifyUserFromDb(tokenCache);
  }
};

const verifyUserFromDb = async (token) => {
  try {
    const query = new Parse.Query("users");
    query.equalTo("userId", token);

    const results = await query.find();

    return results.length > 0;
  } catch (error) {
    console.log(
      "Error al buscar el usuario: " + error.code + " " + error.message
    );
    return false;
  }
};

export const createUser = async () => {
  const responses = await verifyUserFromCache();
  console.log("OLA");
  console.log(responses);
  if (!responses) {
    console.log("YSE");
    const newUser = new Parse.Object("users");
    const nanoid = customAlphabet("1234567890abcdef", 6);
    var tokenUser = nanoid();
    newUser.set("userId", tokenUser);
    newUser.set("email", "");
    newUser.set("name", "");
    newUser.set("password", "");
    try {
      console.log("NOO");
      //Save the Object
      let result = await newUser.save();
      console.log("New object created with objectId: " + result.id);
      localStorage.setItem("token", tokenUser);
      return true;
    } catch (error) {
      alert("Failed to create new object, with error code: " + error.message);
      return false;
    }
  } else {
    console.log("USUARIO YA REGISTRADO");
    return true;
  }
};

export const addNewSegment = async ({
  nameSegment,
  typeOfRegister,
  timeInterval,
  numbersInterval,
}) => {
  const res = await verifyUserFromCache();
  if (res) {
    const tokenCache = localStorage.getItem("token");
    const newSegment = new Parse.Object("counts");
    // const newSegment = new segmentoFromDb()
    newSegment.set("nameSegment", nameSegment);
    newSegment.set("typeOfRegister", typeOfRegister);
    newSegment.set("timeInterval", timeInterval);
    newSegment.set("numbersInterval", numbersInterval);
    newSegment.set("currentNumber", 0);
    newSegment.set("userId", tokenCache);
    try {
      //Save the Object
      let result = await newSegment.save();
      console.log("New object created with objectId: " + result.id);
      return ("Se creo un nuevo segmento" + result.id)
    } catch (error) {
      console.log(
        "Failed to create new object, with error code: " + error.message
      );
      return ("No se pudo crear el segmento")
    }
  } else {
    console.log("Token de usuario no se encontro en DB");
  }
};

export const fetchSegment = async () => {
  const tokenCache = localStorage.getItem("token");
  var res = await verifyUserFromCache();
  if (res) {
    try {
      const query = new Parse.Query("counts");
      query.equalTo("userId", tokenCache);
      const results = await query.find();
      console.log(results);
      return results;
    } catch (error) {
      console.log("Error al obtener usuarios:", error);
      return false;
    }
  } else {
    alert("Token de usuario no se encontró en DB");
    return null;
  }
};

export const updateSegment = async ({ idSegment, current }) => {
  if (verifyUserFromCache) {
    const tokenCache = localStorage.getItem("token");
    const userDb = new Parse.Query("counts");

    try {
      //Save the Object
      var segmentEdit = await userDb.get(idSegment);
      segmentEdit.set("objectId", idSegment);
      const current = parseInt(segmentEdit.get("currentNumber"));

      // Incrementar el valor en 1
      const newCurrent = current + 1;

      // Establecer el nuevo valor en "currentNumber"
      segmentEdit.set("currentNumber", newCurrent);
      let result = await segmentEdit.save();
      console.log("New object created with objectId: " + result.id);
    } catch (error) {
      alert("Failed to create new object, with error code: " + error.message);
    }
  } else {
    alert("Token de usuario no se encontro en DB");
  }
};

export const fetchObjectById = async (objectId) => {
  var res = await verifyUserFromCache();
  if (res) {
    try {
      const query = new Parse.Query("counts");
      const object = await query.get(objectId);
      const values = object.toJSON();
      console.log("Valores del objeto:", values);
      return values
    } catch (error) {
      console.log("Error al obtener el objeto:", error);
    }
  } else {
    alert("Token de usuario no se encontro en DB");
  }
};
