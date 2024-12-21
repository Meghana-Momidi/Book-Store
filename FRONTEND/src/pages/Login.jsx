import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import FormInput from "../shared/FormInput";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";

const Login = () => {
  const [message, setMessage] = useState("");

  const { loginUser, signInWithGoogle } = useAuth();
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
      await loginUser(data.email, data.password); // Replace with your login logic
      Swal.fire({
        title: "Welcome!",
        text: "Login successful!",
        icon: "success",
        confirmButtonText: "Continue",
      }).then(() => {
        navigate("/"); // Redirect after user clicks 'Continue'
        
      });
    } catch (error) {
      Swal.fire({
        title: "Login Failed!",
        text: "Invalid email or password. Please try again.",
        icon: "error",
        confirmButtonText: "Retry",
      }).then(() => {
        reset();
      });
      console.error(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      Swal.fire({
        title: "Welcome!",
        text: "You have successfully signed in with Google.",
        icon: "success",
        confirmButtonText: "Continue",
      }).then(() => {
        navigate("/"); // Redirect to the home page
      });
    } catch (error) {
      Swal.fire({
        title: "Sign-In Failed",
        text: "An error occurred while signing in with Google. Please try again.",
        icon: "error",
        confirmButtonText: "Retry",
      });
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" role="form" aria-labelledby="login-form">
        <h2 id="login-form" className="text-xl font-semibold mb-4 text-center">
          Please Login
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
          aria-describedby="form-errors"
        >
          <FormInput
            text="Email"
            type="email"
            id="email"
            placeholder="Enter your email address"
            register={register}
            required
            pattern={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
            trigger={trigger}
            error={errors.email}
            aria-invalid={errors.email ? "true" : "false"}
          />
          <FormInput
            text="Password"
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            register={register}
            required
            trigger={trigger}
            error={errors.password}
            aria-invalid={errors.password ? "true" : "false"}
          />
          {message && (
            <p className="text-red-500 text-xs italic mb-3" role="alert" aria-live="assertive">
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
        <p className="text-center mt-4">
          Don't have an account? Please{" "}
          <Link to="/register" className="text-blue-500 hover:text-blue-700" aria-label="Go to the registration page">
            Register
          </Link>
        </p>
        <div className="mt-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex flex-wrap gap-1 items-center justify-center bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
            aria-label="Sign in with Google"
          >
            <FaGoogle className="mr-2" />
            Sign in with Google
          </button>
        </div>
        <p className="mt-5 text-center text-gray-500 text-xs">
          ©{new Date().getFullYear()} Book Store. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
