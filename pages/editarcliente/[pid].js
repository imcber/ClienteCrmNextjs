import React from "react";
import { useRouter } from "next/router";
import Layout from "../../Components/Layout";
import InputForm from "../../Components/InputForm";
import { Formik } from "formik";
import * as Yup from "yup";
import { gql, useQuery, useMutation } from "@apollo/client";
import Swal from "sweetalert2";

const QUERY_CLIENTE_ID = gql`
  query obtenerClienteId($id: ID!) {
    obtenerClienteId(id: $id) {
      nombre
      apellido
      empresa
      email
      telefono
    }
  }
`;

const MUT_EDITAR_CLIENTE = gql`
  mutation actualizarCliente($input: ClienteInput, $id: ID!) {
    actualizarCliente(id: $id, input: $input) {
      nombre
    }
  }
`;

const EditarCliente = () => {
  //obtener el ID actual
  const router = useRouter();
  const {
    query: { id },
  } = router;

  //obtener data del cliente
  const { data, loading } = useQuery(QUERY_CLIENTE_ID, {
    variables: {
      id,
    },
  });

  const [editaCliente] = useMutation(MUT_EDITAR_CLIENTE);

  //Modifica cliente
  const modificarCliente = async (valores) => {
    const { nombre, apellido, empresa, email, telefono } = valores;
    try {
      const { data } = await editaCliente({
        variables: {
          id,
          input: {
            nombre,
            apellido,
            empresa,
            email,
            telefono,
          },
        },
      });
      Swal.fire("Actualizado", "El cliente se actualizo con exito", "success");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const validationSchema = Yup.object({
    nombre: Yup.string().required("El nombre es obligatorio"),
    apellido: Yup.string().required("El apellido es obligatorio"),
    empresa: Yup.string().required("La empresa en obligatoria"),
    email: Yup.string()
      .email("Email invalido")
      .required("El email es obligatorio"),
    telefono: Yup.string(),
  });

  if (loading) return "Cargando...";
  if (!data) return "No existe cliente";

  const { obtenerClienteId } = data;

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Editar Cliente</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <Formik
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={obtenerClienteId}
            onSubmit={async (valores) => {
              modificarCliente(valores);
            }}
          >
            {(props) => {
              return (
                <form
                  className="bg-white shadow-md pt-6 pb-8 mb-4 px-8"
                  onSubmit={props.handleSubmit}
                >
                  <InputForm
                    name="nombre"
                    type="text"
                    placeholder="Nombre Cliente"
                    label="Nombre"
                    formik={props}
                  />
                  <InputForm
                    name="apellido"
                    type="text"
                    placeholder="Apellido Cliente"
                    label="Apellido"
                    formik={props}
                  />
                  <InputForm
                    name="empresa"
                    type="text"
                    placeholder="Empresa Cliente"
                    label="Empresa"
                    formik={props}
                  />
                  <InputForm
                    name="email"
                    type="email"
                    placeholder="Email Cliente"
                    label="Email"
                    formik={props}
                  />
                  <InputForm
                    name="telefono"
                    type="tel"
                    placeholder="Telefono Cliente"
                    label="Telefono"
                    formik={props}
                  />
                  <input
                    type="submit"
                    className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 cursor-pointer"
                    value="Editar Cliente"
                  />
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default EditarCliente;
