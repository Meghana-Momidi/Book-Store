import React, { useEffect, useState } from "react";
import FormInput from "../../shared/FormInput";
import FormSelect from "../../shared/FormSelect";
import { useNavigate, useParams } from "react-router-dom";
import {
  useFetchBookByIdQuery,
  useUpdateBookMutation,
} from "../../features/books/booksApi";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import Loader from "../../shared/Loader";
import getBaseURL from "../../utils/baseURL";
import FormCheckbox from "../../shared/FormCheckbox";

const EditBook = () => {
  const [imageFile, setimageFile] = useState(null);
  const [imageFileName, setimageFileName] = useState("");
  const { id } = useParams();
  const { data: bookData } = useFetchBookByIdQuery(id);
  const [updateBook, { isLoading, isError }] = useUpdateBookMutation();
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  // console.log(bookData);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setimageFile(file);
      setimageFileName(file.name);
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
    const updatedData = Object.fromEntries(
      Object.entries(data).filter(
        ([key, value]) => value !== "" && value !== null && value !== undefined
      )
    );
    try {
      await updateBook({ id, ...updatedData }).unwrap();
      Swal.fire({
        title: "Book Updated",
        text: "Your book is updated successfully!",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33", 
        confirmButtonText: "Okay!",
      }).then(() => navigate("/dashboard/manage-books"));
      reset();
      setimageFileName("");
      setimageFile(null);
    } catch (error) {
      console.error(error);

      Swal.fire({
        title: "Error",
        text: "Failed to update book. Please try again.",
        icon: "error",
        confirmButtonColor: "#d33",
        confirmButtonText: "Okay",
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:dark-text">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 dark:text-white">
        Update Book
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          id="title"
          label="Title"
          name="title"
          placeholder={bookData?.title}
          register={register}
        />
        <FormInput
          id="description"
          label="Description"
          name="description"
          placeholder={bookData?.description}
          type="textarea"
          register={register}
        />

        <FormSelect
          label="Category"
          name="category"
          options={[
            { value: "", label: "Choose A Category" },
            { value: "business", label: "Business" },
            { value: "technology", label: "Technology" },
            { value: "fiction", label: "Fiction" },
            { value: "horror", label: "Horror" },
            { value: "adventure", label: "Adventure" },
          ]}
          register={register}
        />

        {/* Old Price */}
        <FormInput
          id="oldPrice"
          label="Old Price"
          name="oldPrice"
          type="number"
          placeholder={bookData?.oldPrice}
          register={register}
          step="0.01"
        />

        {/* New Price */}
        <FormInput
          id="newPrice"
          label="New Price"
          name="newPrice"
          type="number"
          placeholder={bookData?.newPrice}
          register={register}
          step="0.01"
        />
        {/* trending */}
        <FormCheckbox
          id="trending"
          type="checkbox"
          name="trending"
          register={register}
          text="Trending"
        />

        {/* Cover Image Upload */}
        <div className="mb-4 mt-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2 dark:text-white py-4">
            Cover Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-2 w-full dark:text-gray-300"
          />
          {imageFileName && (
            <p className="text-sm text-gray-500">Selected: {imageFileName}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-purple-500 text-white font-bold rounded-md"
        >
          {isLoading ? (
            <span className="">Updating.. </span>
          ) : (
            <span>Update Book</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default EditBook;
