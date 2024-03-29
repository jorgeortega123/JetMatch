import Parse from "parse/dist/parse.min.js";
import { customAlphabet } from "nanoid";
import dayjs from "dayjs";

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
    return null;
  } else {
    return verifyUserFromDb(tokenCache);
  }
};

const verifyUserFromDb = async (token) => {
  try {
    const query = new Parse.Query("users");
    query.equalTo("userId", token);

    const results = await query.find();

    return results;
  } catch (error) {
    console.log(
      "Error al buscar el usuario: " + error.code + " " + error.message
    );
    return null;
  }
};

export const createUser = async () => {
  const responses = await verifyUserFromCache();
  if (responses != null) {
    return responses;
  }
  const newUser = new Parse.Object("users");
  const nanoid = customAlphabet("1234567890abcdef", 6);
  const tokenUser = nanoid();
  newUser.set("userId", tokenUser);
  newUser.set("email", "undefined");
  newUser.set("name", "undefined");
  newUser.set("password", "undefined");

  try {
    const result = await newUser.save();
    console.log("New object created with objectId: " + result.id);
    localStorage.setItem("token", tokenUser);
    return true;
  } catch (error) {
    console.error(
      "Failed to create new object, with error code: " + error.message
    );
    return false;
  }
};

export const loginCredentials = () => {};

export const addNewSegment = async ({
  nameSegment,
  typeOfRegister,
  timeInterval,
  numbersInterval,
  color,
}) => {
  const res = await verifyUserFromCache();
  if (res) {
    const tokenCache = localStorage.getItem("token");
    const newSegment = new Parse.Object("counts");
    // const newSegment = new segmentoFromDb()
    // const fecha = dayjs().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    newSegment.set("nameSegment", nameSegment);
    newSegment.set("typeOfRegister", typeOfRegister);
    newSegment.set("timeInterval", timeInterval);
    newSegment.set("numbersInterval", numbersInterval);
    newSegment.set("colorSegment", color);
    newSegment.set("currentNumber", 0);
    // newSegment.set("updateTimerAt", fecha)
    newSegment.set("userId", tokenCache);
    try {
      //Save the Object
      let result = await newSegment.save();
      console.log("New object created with objectId: " + result.id);
      return "Se creo un nuevo segmento" + result.id;
    } catch (error) {
      console.log(
        "Failed to create new object, with error code: " + error.message
      );
      return "No se pudo crear el segmento";
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
    console.log("Token de usuario no se encontró en DB");
    return null;
  }
};

export const updateSegment = async ({ idSegment, current }) => {
  if (verifyUserFromCache) {
    const tokenCache = localStorage.getItem("token");
    const userDb = new Parse.Query("counts");
    const fecha = dayjs().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    try {
      //Save the Object
      var segmentEdit = await userDb.get(idSegment);
      segmentEdit.set("objectId", idSegment);
      const current = parseInt(segmentEdit.get("currentNumber"));

      // Incrementar el valor en 1
      const newCurrent = current + 1;

      // Establecer el nuevo valor en "currentNumber"
      segmentEdit.set("updateTimerAt", fecha);
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
      return values;
    } catch (error) {
      console.log("Error al obtener el objeto:", error);
    }
  } else {
    console.log("Token de usuario no se encontro en DB");
  }
};

export const eliminarObjetoPorId = async (objetoId) => {
  const query = new Parse.Query("counts");

  try {
    const objeto = await query.get(objetoId);
    await objeto.destroy();

    console.log(`Objeto con ID ${objetoId} eliminado exitosamente.`);
    return {
      value: true,
      data: ` Objeto con ID ${objetoId} eliminado exitosamente.`,
    };
  } catch (error) {
    console.error("Error al eliminar el objeto:", error);
    return { value: false, data: "Error al eliminar el objeto:" + error,  };
  }
};

// export const formAccount = async (data) => {
//   const tokenCache = localStorage.getItem("token");
//   var res = await verifyUserFromCache();
//   if (res) {
//     try {
//       const query = new Parse.Query("users");
//       const user = query.equalTo("userId", tokenCache);
//       user.get("email", data.email);
//       user.get("password", data.email);
//       user.get("name", data.name);
//     } catch (error) {
//       console.log("Error al obtener el objeto:", error);
//     }
//   } else {
//     console.log("user not found");
//     return false;
//   }
// };

export const updateUserNameById = async (data) => {
  const tokenCache = localStorage.getItem("token");
  const query = new Parse.Query("users");
  query.equalTo("userId", tokenCache);

  try {
    const user = await query.first();
    if (user) {
      // El usuario se encontró en la base de datos
      user.set("email", data.email);
      user.set("password", data.password);
      user.set("name", data.name);
      user.set("isVerified", true);
      await user.save();
      console.log("Nombre actualizado correctamente");
      return true;
    } else {
      // El usuario no se encontró en la base de datos
      console.log("Usuario no encontrado");
      return false;
    }
  } catch (error) {
    console.error("Error al actualizar el nombre del usuario:", error);
    return false;
  }
};

export const loginByEmail = async (email, pass) => {
  var onError = false;
  var userId = null;
  const query = new Parse.Query("users");
  query.equalTo("email", email);

  try {
    const user = await query.first();
    if (user) {
      // El usuario se encontró en la base de datos
      var password = user.get("password");
      userId = user.get("userId");
      if (pass != password) onError = true;
      localStorage.setItem("token", userId);
      console.log("Usuario encontrado");
      onError = false;
    } else {
      // El usuario no se encontró en la base de datos
      console.log("Usuario no encontrado");
      onError = true;
    }
  } catch (error) {
    console.error("Error al actualizar el nombre del usuario:", error);
    onError = true;
  }

  console.log(onError, userId);
  return onError;
};

export const getUserDataById = async () => {
  const tokenCache = localStorage.getItem("token");
  if (!tokenCache) return null;
  const query = new Parse.Query("users");

  try {
    query.equalTo("userId", tokenCache);
    const user = await query.first();
    if (user) {
      // El usuario se encontró en la base de datos
      const userData = {
        name: user.get("name"),
        email: user.get("email"),
        verified: user.get("isVerified"),
        password: user.get("password"),
        // Agrega más campos según tus necesidades
      };
      return userData;
    } else {
      // El usuario no se encontró en la base de datos
      return null;
    }
  } catch (error) {
    console.error("Error al buscar los datos del usuario:", error);
    return null;
  }
};
