import React from "react";

const FormSelect = ({ label, name, options, register }) => {
  return (
    <div className="mb-4 ">
      <label className="block text-sm font-semibold text-gray-700 py-4 dark:text-white">
        {label}
      </label>
      <select
        {...register(name, { required: true })}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-800 dark:text-gray-400 "
        
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
