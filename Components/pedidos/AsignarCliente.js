import React, { useState, useEffect, useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import Select from "react-select";
import PedidoContext from "../../context/pedidos/PedidoContext";

//Obtiene los clientes del vendedor
const QUERY_CLIENTES_VENDEDOR = gql`
  query obtenerClientesXVendedor {
    obtenerClientesXVendedor {
      id
      nombre
      apellido
      empresa
      email
    }
  }
`;
const AsignarCliente = () => {
  const { data, loading, error } = useQuery(QUERY_CLIENTES_VENDEDOR);
  const [cliente, setCliente] = useState({});
  const { agregarCliente } = useContext(PedidoContext);

  useEffect(() => {
    agregarCliente(cliente);
  }, [cliente]);

  if (loading) return "Cargando...";
  if (!data) return "Sin clientes";

  const { obtenerClientesXVendedor } = data;

  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
        Seleccione el cliente
      </p>
      <Select
        className="mt-3"
        options={obtenerClientesXVendedor}
        onChange={(opcion) => setCliente(opcion)}
        getOptionValue={(opciones) => opciones.id}
        getOptionLabel={(opciones) => opciones.nombre}
        placeholder="Seleccione el Cliente"
        noOptionsMessage={() => "No hay resultados"}
      ></Select>
    </>
  );
};

export default AsignarCliente;
