import React, { useState } from "react";
import FormInput from "../shared/FormInput";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import getBaseURL from "../utils/baseURL";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AdminLogin = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger, // Trigger validation when needed (for example on change)
    reset, // to clear form fields
  } = useForm({
    mode: "onChange", // Will trigger validation on every input change
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${getBaseURL()}/api/admin/login`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const auth = response.data;
      console.log(auth);
      console.log(auth.user.username);

      if (auth.token) {
        localStorage.setItem("adminToken", auth.token);
        // Decode the token to get the expiration time
        const decodedToken = jwtDecode(auth.token);
        const expirationTime = decodedToken.exp * 1000;
        console.log(decodedToken);
        console.log(expirationTime);

        localStorage.setItem("adminTokenExpiration", expirationTime);
        localStorage.setItem("admin", JSON.stringify(auth.user));
        localStorage.removeItem("currentUser");
        localStorage.setItem("currentUser", JSON.stringify(auth.user));
      }

      Swal.fire({
        title: "Welcome!",
        text: "Login successful!",
        icon: "success",
        confirmButtonText: "Continue",
      }).then(() => {
        navigate("/dashboard");
      });
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data.message || "An error occurred. Please try again.";
        setMessage(errorMessage);

        Swal.fire({
          title: "Login Failed!",
          text: errorMessage, // Use the error message from backend
          icon: "error",
          confirmButtonText: "Retry",
        }).then(() => {
          reset();
        });
      }
    }
  };
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div
        className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        role="form"
        aria-labelledby="login-form"
      >
        <h2 id="login-form" className="text-xl font-semibold mb-4 text-center">
          Admin Login
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
          aria-describedby="form-errors"
        >
          <FormInput
            text="Username"
            type="text"
            id="username"
            placeholder="Username"
            register={register}
            required
            trigger={trigger}
            error={errors.email}
            aria-invalid={errors.email ? "true" : "false"}
          />
          <FormInput
            text="Password"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            register={register}
            required
            trigger={trigger}
            error={errors.password}
            aria-invalid={errors.password ? "true" : "false"}
          />
          {message && (
            <p
              className="text-red-500 text-xs italic mb-3"
              role="alert"
              aria-live="assertive"
            >
              {message}
            </p>
          )}

          <div className="mt-6">
            <button
              className={`w-full bg-blue-500  text-white font-bold py-2 px-8 rounded focus:outline-none ${
                isValid
                  ? "hover:bg-blue-700 opacity-100"
                  : "opacity-50 cursor-not-allowed"
              }`}
              disabled={!isValid}
              aria-disabled={!isValid}
            >
              Login
            </button>
          </div>
        </form>
        {/* <p className="text-center mt-4">
          Don't have an account? Please{" "}
          <Link
            to="/register"
            className="text-blue-500 hover:text-blue-700"
            aria-label="Go to the registration page"
          >
            Register
          </Link>
        </p> */}
        <p className="mt-5 text-center text-gray-500 text-xs">
          ©{new Date().getFullYear()} Book Store. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
