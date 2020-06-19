import React from "react";
import { useRouter } from "next/router";
import Layout from "../../Components/Layout";
import InputForm from "../../Components/InputForm";
import { Formik } from "formik";
import * as Yup from "yup";
import { gql, useMutation, useQuery } from "@apollo/client";
import Swal from "sweetalert2";

const QR_PRODUCTO_ID = gql`
  query obtenerProducto($id: ID!) {
    obtenerProducto(id: $id) {
      nombre
      existencia
      precio
    }
  }
`;

const MUT_ACTUALIZA_PRODUCTO = gql`
  mutation actualizarProducto($id: ID, $input: ProductoInput) {
    actualizarProducto(id: $id, input: $input) {
      nombre
    }
  }
`;

const EditarProducto = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const validationSchema = Yup.object({
    nombre: Yup.string().required("EL nombre es obligatorio"),
    existencia: Yup.number()
      .required("La cantidad es obligatorio")
      .integer("La existencia deben ser numeros enteros")
      .min(1, "La existencia no puede ser menos a 1"),
    precio: Yup.number()
      .required("El precio es obligatorio")
      .positive("No se aceptan numeros negativos"),
  });

  //Obtener data del producto
  const { data, loading, error } = useQuery(QR_PRODUCTO_ID, {
    variables: {
      id,
    },
  });

  //Mutaion para la actualizacion
  const [actualizaProducto] = useMutation(MUT_ACTUALIZA_PRODUCTO);

  const modificarProducto = async ({ nombre, existencia, precio }) => {
    try {
      const { data } = await actualizaProducto({
        variables: {
          id,
          input: {
            nombre,
            existencia,
            precio,
          },
        },
      });
      Swal.fire("Actualizado", "El producto se actualizo con exito", "success");
      router.push("/productos");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return "Cargando...";
  if (!data) return "Producto inexistente";

  const { obtenerProducto } = data;

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Editar Producto</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <Formik
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={obtenerProducto}
            onSubmit={async (valores) => {
              modificarProducto(valores);
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
                    placeholder="Nombre Producto"
                    label="Nombre"
                    formik={props}
                  />
                  <InputForm
                    name="existencia"
                    type="number"
                    placeholder="Cantidad Disponible"
                    label="Cantidad"
                    formik={props}
                  />
                  <InputForm
                    name="precio"
                    type="number"
                    placeholder="Precio Producto"
                    label="Precio"
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

export default EditarProducto;
