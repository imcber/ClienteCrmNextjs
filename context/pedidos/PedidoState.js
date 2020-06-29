import React, { useReducer } from "react";
import PedidoContext from "./PedidoContext";
import PedidoReducer from "./PedidoReducer";

import {
  CANTIDAD_PRODUCTOS,
  SELECCIONAR_CLIENTE,
  SELECCIONAR_PRODUCTO,
} from "../../types";

const PedidoState = ({ children }) => {
  //state del pedido

  const initialState = {
    cliente: {},
    productos: [],
    total: 0,
  };

  const [state, dispatch] = useReducer(PedidoReducer, initialState);

  //modifica el cliente
  const agregarCliente = (cliente) => {
    dispatch({
      type: SELECCIONAR_CLIENTE,
      payload: cliente,
    });
  };

  //modifica los productos
  const agregarProductos = (productos) => {
    dispatch({
      type: SELECCIONAR_PRODUCTO,
      payload: productos,
    });
  };

  return (
    <PedidoContext.Provider value={{ agregarCliente, agregarProductos }}>
      {children}
    </PedidoContext.Provider>
  );
};

export default PedidoState;
