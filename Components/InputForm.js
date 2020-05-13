import React from "react";

const InputForm = ({ name, type, placeholder, label, formik }) => {
  if (!formik)
    return "Se necesita pasar el objeto de Formik para las validaciones";
  const { errors, handleBlur, handleChange, values, touched } = formik;

  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={name}
        type={type}
        placeholder={placeholder}
        value={values[name]}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errors[name] && touched[name] ? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
          <p className="font-bold">{errors[name]}</p>
        </div>
      ) : null}
    </div>
  );
};

export default InputForm;
