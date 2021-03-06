import React from "react";
import { useMutation, gql } from "@apollo/client";
import Swal from "sweetalert2";
import Router from "next/router";

//Elimina un cliente
const ELIMINA_CLIENTE = gql`
  mutation eliminarCliente($id: ID!) {
    eliminarCliente(id: $id)
  }
`;

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

const Cliente = ({ item: { nombre, apellido, empresa, email, id } }) => {
  //Mutation para eliminar cliente
  const [eliminaCliente] = useMutation(ELIMINA_CLIENTE, {
    update(cache) {
      //obtener copia del objeto de cache
      const { obtenerClientesXVendedor } = cache.readQuery({
        query: QUERY_CLIENTES_VENDEDOR,
      });

      //reescribir cache
      cache.writeQuery({
        query: QUERY_CLIENTES_VENDEDOR,
        data: {
          obtenerClientesXVendedor: obtenerClientesXVendedor.filter(
            (cliente) => cliente.id !== id
          ),
        },
      });
    },
  });
  //Funcion para eliminar clientes
  const eliminarCliente = async () => {
    Swal.fire({
      title: "Deseas eliminar a este cliente?",
      text: "Este cambio no es reversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "No, Cancelar",
    }).then(async (result) => {
      if (result.value) {
        try {
          const { data } = await eliminaCliente({
            variables: {
              id,
            },
          });

          Swal.fire("Eliminado!", data.eliminarCliente, "success");
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  //Funcion para editar cliente
  const editarCliente = () => {
    Router.push({
      pathname: "/editarcliente/[id]",
      query: { id },
    });
  };

  return (
    <tr>
      <td className="border px-4 py-2">
        {nombre} {apellido}
      </td>
      <td className="border px-4 py-2">{empresa}</td>
      <td className="border px-4 py-2">{email}</td>
      <td className="border px-4 py-2">
        <button
          type="button"
          onClick={() => eliminarCliente()}
          className="flex items-center justify-center bg-red-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold hover:bg-red-800"
        >
          Eliminar
          <svg fill="currentColor" viewBox="0 0 20 20" className="w-8 h-8 ml-3">
            <path
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
              fillRule="evenodd"
            ></path>
          </svg>
        </button>
      </td>
      <td className="border px-4 py-2">
        <button
          type="button"
          className="flex items-center justify-center bg-blue-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold hover:bg-blue-800"
          onClick={() => editarCliente()}
        >
          Editar
          <svg fill="currentColor" viewBox="0 0 20 20" className="w-8 h-8 ml-3">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default Cliente;
