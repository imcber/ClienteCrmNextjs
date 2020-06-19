import React from "react";
import Layout from "../Components/Layout";
import InputForm from "../Components/InputForm";
import { useFormik } from "formik";
import * as Yup from "yup";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const NUEVO_PRODUCTO = gql`
  mutation nuevoProducto($input: ProductoInput) {
    nuevoProducto(input: $input) {
      id
    }
  }
`;

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

const NuevoProducto = () => {
  //routing
  const router = useRouter();

  const [nuevoProducto] = useMutation(NUEVO_PRODUCTO, {
    update(cache) {
      //Sacar lista de productos
      const { obtenerProductos } = cache.readQuery({
        query: OBTENER_PRODUCTOS,
      });

      //reescribir cache
      cache.writeQuery({
        query: OBTENER_PRODUCTOS,
        data: {
          obtenerProductos: [...OBTENER_PRODUCTOS, nuevoProducto],
        },
      });
    },
  });
  const formik = useFormik({
    initialValues: { nombre: "", existencia: "", precio: "" },
    validationSchema: Yup.object({
      nombre: Yup.string().required("EL nombre es obligatorio"),
      existencia: Yup.number()
        .required("La cantidad es obligatorio")
        .integer("La existencia deben ser numeros enteros")
        .min(1, "La existencia no puede ser menos a 1"),
      precio: Yup.number()
        .required("El precio es obligatorio")
        .positive("No se aceptan numeros negativos"),
    }),
    onSubmit: async ({ nombre, existencia, precio }) => {
      try {
        const { data } = await nuevoProducto({
          variables: {
            input: {
              nombre,
              existencia,
              precio,
            },
          },
        });

        Swal.fire("Agregado", `El producto se agrego con exito`, "success");
        router.push("/productos");
      } catch (error) {
        Swal.fire("Error", error, "error");
        console.log(error);
      }
    },
  });
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Nuevo Producto</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          <form
            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
          >
            <InputForm
              name="nombre"
              type="text"
              placeholder="Nombre Producto"
              label="Producto"
              formik={formik}
            />
            <InputForm
              name="existencia"
              type="number"
              placeholder="Cantidad Disponible"
              label="Cantidad Disponible"
              formik={formik}
            />
            <InputForm
              name="precio"
              type="number"
              placeholder="Precio Producto"
              label="Precio"
              formik={formik}
            />

            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900 cursor-pointer"
              value="Agregar Producto"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NuevoProducto;
