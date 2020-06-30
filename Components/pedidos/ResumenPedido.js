import React, { useState, useEffect, useContext } from "react";
import PedidoContext from "../../context/pedidos/PedidoContext";
import ProductoResumen from "./ProductoResumen";

const ResumenPedido = () => {
  const pedidoContext = useContext(PedidoContext);
  const { productos } = pedidoContext;

  return (
    <>
      <p className="mt-5 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
        Cantidades del producto
      </p>
      {productos && productos.length > 0 ? (
        <>
          {productos.map((item) => (
            <ProductoResumen key={item.id} producto={item} />
          ))}
        </>
      ) : (
        <p className="mt-5 text-sm">Aun no hay prodcutos</p>
      )}
    </>
  );
};

export default ResumenPedido;
