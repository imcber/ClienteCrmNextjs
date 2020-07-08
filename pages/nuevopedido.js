import React, { useContext } from "react";
import Layout from "../Components/Layout";
import AsignarCliente from "../Components/pedidos/AsignarCliente";
import AsignarProductos from "../Components/pedidos/AsignarProductos";
import ResumenPedido from "../Components/pedidos/ResumenPedido";
import Total from "../Components/pedidos/Total";
import { gql, useMutation } from "@apollo/client";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

//Context de pedidos
import PedidoContext from "../context/pedidos/PedidoContext";

const NUEVO_PEDIDO = gql`
  mutation nuevoPedido($input: PedidoInput) {
    nuevoPedido(input: $input) {
      id
    }
  }
`;

const PEDIDOS_VENDEDOR = gql`
  query obtenerPedidosVendedor {
    obtenerPedidosVendedor {
      id
    }
  }
`;

const NuevoPedido = () => {
  const router = useRouter();
  //utilizar context y obtener funciones y valores
  const pedidoContext = useContext(PedidoContext);
  const { cliente, productos, total } = pedidoContext;

  //Mutation para nuevo pedido
  const [nuevoPedido] = useMutation(NUEVO_PEDIDO, {
    update(cache, { data: nuevoPedido }) {
      const { obtenerPedidosVendedor } = cache.readQuery({
        query: PEDIDOS_VENDEDOR,
      });

      cache.writeQuery({
        query: PEDIDOS_VENDEDOR,
        data: {
          obtenerPedidosVendedor: [...obtenerPedidosVendedor, nuevoPedido],
        },
      });
    },
  });

  const validarPedido = () => {
    if (!productos) return "";
    return !productos.every((item) => item.cantidad > 0) ||
      total === 0 ||
      !cliente.id
      ? " opacity-50 cursor-not-allowed "
      : "";
  };

  const crearNuevoPedido = async () => {
    const { id } = cliente;
    //Limpiar objeto para los productos
    const pedido = productos.map(({ __typename, existencia, ...item }) => item);

    try {
      const { data } = await nuevoPedido({
        variables: {
          input: {
            cliente: id,
            total,
            pedido,
          },
        },
      });
      router.push("/pedidos");
      Swal.fire("Correcto", "Pedido registrado correctamente", "success");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Nuevo pedido</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <AsignarCliente />
          <AsignarProductos />
          <ResumenPedido />
          <Total />
          <button
            type="button"
            className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${validarPedido()}`}
            onClick={() => crearNuevoPedido()}
          >
            Registrar pedido
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default NuevoPedido;
