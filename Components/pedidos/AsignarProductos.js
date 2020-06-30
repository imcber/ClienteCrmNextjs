import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { gql, useQuery } from "@apollo/client";
import PedidoContext from "../../context/pedidos/PedidoContext";

const OBTENER_PRODUCTOS = gql`
  query obtenerProductos {
    obtenerProductos {
      id
      nombre
      existencia
      precio
    }
  }
`;

const AsignarProductos = () => {
  const { data, loading } = useQuery(OBTENER_PRODUCTOS);
  const [productos, setProductos] = useState([]);
  const { agregarProductos, actualizarTotal } = useContext(PedidoContext);

  useEffect(() => {
    agregarProductos(productos);
    //actualizar total
    actualizarTotal();
  }, [productos]);

  if (loading) return "Cargando";
  if (!data) return "Sin data";

  const { obtenerProductos } = data;
  const productosOptions = obtenerProductos.filter((item) => {
    return item.existencia > 0;
  });

  return (
    <>
      <p className="mt-5 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
        Seleccione los productos
      </p>
      <Select
        className="mt-3"
        options={productosOptions}
        isMulti={true}
        getOptionValue={(opciones) => opciones.id}
        getOptionLabel={({ nombre, existencia }) =>
          `${nombre} - ${existencia} Disponibles`
        }
        placeholder="Seleccione el Producto"
        noOptionsMessage={() => "No hay resultados"}
        onChange={(opciones) => setProductos(opciones)}
      ></Select>
    </>
  );
};

export default AsignarProductos;
