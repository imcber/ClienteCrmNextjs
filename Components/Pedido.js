import React, { useEffect, useState } from "react";

const Pedido = ({ data }) => {
  const {
    total,
    cliente: { nombre, apellido, telefono, email },
    estado,
    pedido,
  } = data;
  const [estadoPedido, setEstadoPedido] = useState(estado);

  useEffect(() => {
    if (estadoPedido) {
      setEstadoPedido(estadoPedido);
    }
  });

  return (
    <div className="mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow">
      <div>
        <p className="font-bold text-gray-800">
          Cliente: {nombre} {apellido}
        </p>
        <h2 className="text-gray-900 font-bold">Estado Pedido:</h2>

        <select
          value={estadoPedido}
          className="mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold"
          onChange={() => {}}
        >
          <option value="COMPLETADO">COMPLETADO</option>
          <option value="PENDIENTE">PENDIENTE</option>
          <option value="CANCELADO">CANCELADO</option>
        </select>
      </div>
      <div>
        <h2 className="text-gray-800 font-bold mt-2">Resumen del Pedido</h2>
        <div className="md:grid md:grid-cols-2 md:gap-4">
          {pedido.map(({ id, nombre, cantidad }) => (
            <div key={id} className="mt-4">
              <p className="text-sm text-gray-600">Producto: {nombre}</p>
              <p className="text-sm text-gray-600">Cantidad: {cantidad}</p>
            </div>
          ))}
        </div>
        <div className="md:grid md:grid-cols-2 md:gap-4">
          <p className="text-gray-800 mt-3 font-bold text-xl">
            <span className="font-bold">Total a pagar: $ {total}</span>
          </p>
          <div className="md:grid md:grid-cols-2 md:gap-4">
            <button className="uppercase text-xs font-bold flex justify-center items-center mt-4 bg-red-800 px-5 py-2 inline-block text-white rounded">
              Eliminar
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                className="w-8 h-8 ml-3"
              >
                <path
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
            </button>
            <button className="uppercase text-xs font-bold flex items-center justify-center mt-4 bg-blue-800 px-5 py-2 inline-block text-white rounded">
              Editar
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                className="w-8 h-8 ml-3"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pedido;
