import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import FormInput from "../../shared/FormInput";
import FormSelect from "../../shared/FormSelect";
import { useAddBookMutation } from "../../features/books/booksApi";
import FormCheckbox from "../../shared/FormCheckbox";

const AddBook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [imageFile, setimageFile] = useState(null);
  const [addBook, { isLoading, isError }] = useAddBookMutation();
  const [imageFileName, setimageFileName] = useState("");

  const onSubmit = async (data) => {
    const newBookData = {
      ...data,
      coverImage: imageFileName,
      trending: data.trending || false,
    };

    try {
      await addBook(newBookData).unwrap();
      Swal.fire({
        title: "Book added",
        text: "Your book is uploaded successfully!",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Okay!",
      });
      reset();
      setimageFileName("");
      setimageFile(null);
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Failed to add book. Please try again.",
        icon: "error",
        confirmButtonColor: "#d33",
        confirmButtonText: "Okay",
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setimageFile(file);
      setimageFileName(file.name);
    }
  };

  return (
    <div
      className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:text-white"
      role="form"
      aria-labelledby="form-title"
    >
      <h2
        id="form-title"
        className="text-2xl font-bold text-gray-800 mb-4 dark:text-white"
      >
        Add New Book
      </h2>

      {/* Form starts here */}
      <form onSubmit={handleSubmit(onSubmit)} aria-live="polite">
        <FormInput
          id="title"
          label="Title"
          name="title"
          placeholder="Enter book title"
          register={register}
          aria-required="true"
          aria-invalid={!!errors.title}
        />

        <FormInput
          id="description"
          label="Description"
          name="description"
          placeholder="Enter book description"
          type="textarea"
          register={register}
          aria-required="true"
          aria-invalid={!!errors.description}
        />

        <FormSelect
          label="Category"
          name="category"
          options={[
            { value: "", label: "Choose A Category" },
            { value: "business", label: "Business" },
            { value: "marketing", label: "Marketing" },
            { value: "fiction", label: "Fiction" },
            { value: "horror", label: "Horror" },
            { value: "adventure", label: "Adventure" },
          ]}
          register={register}
          aria-required="true"
          aria-invalid={!!errors.category}
        />

        <FormInput
          id="oldPrice"
          label="Old Price"
          name="oldPrice"
          type="number"
          placeholder="Old Price"
          register={register}
          step="0.01"
          aria-required="true"
          aria-invalid={!!errors.oldPrice}
        />

        <FormInput
          id="newPrice"
          label="New Price"
          name="newPrice"
          type="number"
          placeholder="New Price"
          register={register}
          step="0.01"
          aria-required="true"
          aria-invalid={!!errors.newPrice}
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
            htmlFor="coverImage"
            className="block text-sm font-semibold text-gray-700 mb-2 dark:text-white"
          >
            Cover Image
          </label>
          <input
            id="coverImage"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-2 w-full dark:text-gray-300"
            aria-label="Upload cover image"
          />
          {imageFileName && (
            <p className="text-sm text-gray-500" aria-live="polite">
              Selected: {imageFileName}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-purple-500 text-white font-bold rounded-md focus:ring focus:ring-purple-300"
          aria-busy={isLoading}
        >
          {isLoading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
