import React from "react";
import Layout from "../Components/Layout";
import InputForm from "../Components/InputForm";
import { useFormik } from "formik";
import * as Yup from "yup";

const NuevoCliente = (params) => {
  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      empresa: "",
      email: "",
      telefono: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El nombre es obligatorio"),
      apellido: Yup.string().required("El apellido es obligatorio"),
      empresa: Yup.string().required("La empresa en obligatoria"),
      email: Yup.string()
        .email("Email invalido")
        .required("El email es obligatorio"),
      telefono: Yup.string(),
    }),
    onSubmit: (valores) => {
      console.log(valores);
    },
  });
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Nuevo cliente</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form
            className="bg-white shadow-md pt-6 pb-8 mb-4 px-8"
            onSubmit={formik.handleSubmit}
          >
            <InputForm
              name="nombre"
              type="text"
              placeholder="Nombre Cliente"
              label="Nombre"
              formik={formik}
            />
            <InputForm
              name="apellido"
              type="text"
              placeholder="Apellido Cliente"
              label="Apellido"
              formik={formik}
            />
            <InputForm
              name="empresa"
              type="text"
              placeholder="Empresa Cliente"
              label="Empresa"
              formik={formik}
            />
            <InputForm
              name="email"
              type="email"
              placeholder="Email Cliente"
              label="Email"
              formik={formik}
            />
            <InputForm
              name="telefono"
              type="tel"
              placeholder="Telefono Cliente"
              label="Telefono"
              formik={formik}
            />
            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
              value="Registrar Cliente"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NuevoCliente;
