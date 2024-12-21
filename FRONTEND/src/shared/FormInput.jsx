import React from "react";

const FormInput = ({
  text,
  id,
  type,
  placeholder,
  pattern,
  register,
  required, 
  error,
  minLength,
  maxLength,
  onChange,
}) => {
  return (
    <div>
      <label
        className="block text-gray-700 text-md font-bold mb-2 dark:text-dark-text"
        htmlFor={id}
      >
        {text}
      </label>
      <input
        {...register(id, {          
          required,
          ...(pattern && { pattern }), // Apply pattern if specified
          ...(minLength && { minLength }), // Apply minLength if specified
          ...(maxLength && { maxLength }), // Apply maxLength if specified
        })}
        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out dark:bg-gray-800"
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error?.message || "Please enter valid input"}
        </p>
      )}
    </div>
  );
};

export default FormInput;
