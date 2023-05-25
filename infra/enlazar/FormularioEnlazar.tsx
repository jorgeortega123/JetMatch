import React, { useState } from 'react';

const FormularioEnlazar: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmacionContrasena, setConfirmacionContrasena] = useState('');
  const [contrasenaError, setContrasenaError] = useState('');
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (contrasena !== confirmacionContrasena) {
        setContrasenaError('Las contraseñas no coinciden');
        return;
      }
  
    // Realizar validación o enviar los datos a la API aquí
  };

  return (
    <form className="max-w-sm mx-auto p-4 bg-white rounded shadow">
      <div className="mb-4">
        <label htmlFor="nombre" className="block mb-1 font-medium">
          Nombre
        </label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="id" className="block mb-1 font-medium">
          ID
        </label>
        <input
          type="text"
          id="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block mb-1 font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="contrasena" className="block mb-1 font-medium">
          Contraseña
        </label>
        <input
          type="password"
          id="contrasena"
          value={contrasena}
          onChange={(e) => {
            setContrasena(e.target.value);
            setContrasenaError('');
          }}
          className={`w-full px-3 py-2 border ${
            contrasenaError ? 'border-red-500' : 'border-gray-300'
          } rounded focus:outline-none focus:border-blue-500`}
        />
       
      </div>

      <div className="mb-4">
        <label htmlFor="confirmacionContrasena" className="block mb-1 font-medium">
          Confirmación de Contraseña
        </label>
        <input
          type="password"
          id="confirmacionContrasena"
          value={confirmacionContrasena}
          onChange={(e) => {
            setConfirmacionContrasena(e.target.value);
            setContrasenaError('');
          }}
          className={`w-full px-3 py-2 border ${
            contrasenaError ? 'border-red-500' : 'border-gray-300'
          } rounded focus:outline-none focus:border-blue-500`}
        />
         {contrasenaError && (
          <p className="text-red-500 text-sm mt-1">{contrasenaError}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        onClick={handleSubmit}
      >
        Enviar
      </button>
    </form>
  );
};

export default FormularioEnlazar;
