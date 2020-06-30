import {
  CANTIDAD_PRODUCTOS,
  SELECCIONAR_CLIENTE,
  SELECCIONAR_PRODUCTO,
  ACTUALIZAR_TOTAL,
} from "../../types";

export default (state, action) => {
  //console.log(`ACCION: ${action.type}`);

  switch (action.type) {
    case SELECCIONAR_CLIENTE:
      return {
        ...state,
        cliente: action.payload,
      };
    case SELECCIONAR_PRODUCTO:
      return {
        ...state,
        productos: action.payload,
      };
    case CANTIDAD_PRODUCTOS:
      return {
        ...state,
        productos: state.productos.map((item) =>
          item.id === action.payload.id ? (item = action.payload) : item
        ),
      };
    case ACTUALIZAR_TOTAL:
      return {
        ...state,
        total: !state.productos
          ? 0
          : state.productos.reduce(
              (nuevoTotal, item) => (nuevoTotal += item.precio * item.cantidad),
              0
            ),
      };
    default:
      return state;
  }
};
