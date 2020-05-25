import React from "react";
import { useMutation, gql } from "@apollo/client";
import Swal from "sweetalert2";

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
  const eliminarCliente = async (id) => {
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
          onClick={() => eliminarCliente(id)}
          className="flex items-center justify-center bg-red-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
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
    </tr>
  );
};

export default Cliente;
