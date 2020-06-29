import React, { useContext } from "react";
import Layout from "../Components/Layout";
import AsignarCliente from "../Components/pedidos/AsignarCliente";
import AsignarProductos from "../Components/pedidos/AsignarProductos";

//Context de pedidos
import PedidoContext from "../context/pedidos/PedidoContext";

const NuevoPedido = () => {
  //utilizar context y obtener funciones y valores
  const pedidoContext = useContext(PedidoContext);
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Nuevo pedido</h1>
      <AsignarCliente />
      <AsignarProductos />
    </Layout>
  );
};

export default NuevoPedido;
