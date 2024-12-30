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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setimageFile(file);
      setimageFileName(file.name);
    }
  };

  const onSubmit = async (data) => {
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
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Okay!",
      }).then(() => navigate("/dashboard/manage-books"));
      reset();
      setimageFileName("");
      setimageFile(null);
    } catch (error) {
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
    <div
      className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:dark-text"
      role="region"
      aria-labelledby="update-book-heading"
    >
      <h2
        id="update-book-heading"
        className="text-2xl font-bold text-gray-800 mb-4 dark:text-white"
      >
        Update Book
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} aria-label="Edit Book Form">
        <FormInput
          id="title"
          label="Title"
          name="title"
          placeholder={bookData?.title}
          register={register}
          aria-required="true"
        />
        <FormInput
          id="description"
          label="Description"
          name="description"
          placeholder={bookData?.description}
          type="textarea"
          register={register}
          aria-required="true"
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
          aria-required="true"
        />
        <FormInput
          id="oldPrice"
          label="Old Price"
          name="oldPrice"
          type="number"
          placeholder={bookData?.oldPrice}
          register={register}
          step="0.01"
          aria-required="true"
        />
        <FormInput
          id="newPrice"
          label="New Price"
          name="newPrice"
          type="number"
          placeholder={bookData?.newPrice}
          register={register}
          step="0.01"
          aria-required="true"
        />
        <FormCheckbox
          id="trending"
          type="checkbox"
          name="trending"
          register={register}
          text="Trending"
          aria-checked="false"
          aria-label="Mark as trending"
        />
        <div className="mb-4 mt-2">
          <label
            htmlFor="cover-image"
            className="block text-sm font-semibold text-gray-700 mb-2 dark:text-white"
          >
            Cover Image
          </label>
          <input
            id="cover-image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-2 w-full dark:text-gray-300"
            aria-describedby="cover-image-desc"
          />
          <p id="cover-image-desc" className="sr-only">
            Upload a cover image for the book.
          </p>
          {imageFileName && (
            <p className="text-sm text-gray-500">Selected: {imageFileName}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-purple-500 text-white font-bold rounded-md"
          aria-busy={isLoading}
        >
          {isLoading ? "Updating..." : "Update Book"}
        </button>
      </form>
    </div>
  );
};

export default EditBook;
