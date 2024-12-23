import React from "react";

const FormCheckbox = ({ id, type, text,register }) => {
  return (
    <div className="mb-4 flex items-center mt-4">
      <label
        htmlFor={id}
        className="block text-gray-700 text-md font-bold dark:text-dark-text mr-3"
      >
        {text}
      </label>
      <input
        type={type}
        id={id}
        {...register(id)}
        className="mr-2 leading-tight"
      />
    </div>
  );
};

export default FormCheckbox;
