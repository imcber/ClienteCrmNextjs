import React, { useReducer } from "react";
import PedidoContext from "./PedidoContext";
import PedidoReducer from "./PedidoReducer";

import {
  CANTIDAD_PRODUCTOS,
  SELECCIONAR_CLIENTE,
  SELECCIONAR_PRODUCTO,
  ACTUALIZAR_TOTAL,
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
  const agregarProductos = (productosSeleccionados) => {
    let nuevoState;

    if (state.productos && productosSeleccionados) {
      //se recorren los productos agregados
      nuevoState = productosSeleccionados.map((item) => {
        //se busca el primero objeto que coincidan con el ID del item actual con los del state
        const nuevoObjeto = state.productos.find(
          (productState) => productState.id === item.id
        );
        //Regresa el contenido originial, agregando lo que se obtuvo del state
        return { ...item, ...nuevoObjeto };
      });
    } else {
      nuevoState = productosSeleccionados;
    }

    dispatch({
      type: SELECCIONAR_PRODUCTO,
      payload: nuevoState,
    });
  };

  //Modifica las cantidades de lo sproductos
  const cantidadProductos = (producto) => {
    dispatch({
      type: CANTIDAD_PRODUCTOS,
      payload: producto,
    });
  };

  //Actualizar el total
  const actualizarTotal = () => {
    dispatch({ type: ACTUALIZAR_TOTAL });
  };

  return (
    <PedidoContext.Provider
      value={{
        cliente: state.cliente,
        total: state.total,
        productos: state.productos,
        agregarCliente,
        agregarProductos,
        cantidadProductos,
        actualizarTotal,
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
};

export default PedidoState;
