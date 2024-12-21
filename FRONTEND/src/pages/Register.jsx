import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import FormInput from "../shared/FormInput";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";

const Register = () => {
  const [message, setMessage] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const { registerUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    reset,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const { username, email, password } = data;
    try {
      await registerUser(username, email, password);
      Swal.fire({
        title: "Success!",
        text: "User registered successfully!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/login");
      });
    } catch (error) {
      let errorTitle = "Error!";
      let errorMessage = "Please provide a valid email and password.";

      if (error.code === "auth/email-already-in-use") {
        errorTitle = "Email in Use!";
        errorMessage = "This email is already in use. Please choose another email.";
      }
      Swal.fire({
        title: errorTitle,
        text: errorMessage,
        icon: "error",
        confirmButtonText: "Try Again",
      }).then(() => {
        reset();
      });
      setMessage("Please provide a valid email and password");
      setTimeout(() => {
        setMessage("");
      }, 3000);
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
        navigate("/");
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
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-xl font-semibold mb-4 text-center" tabIndex="0">
          Please Register
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} aria-labelledby="register-form">
          <fieldset>
            <legend className="sr-only">Register Form</legend>

            <FormInput
              text="Username"
              type="text"
              id="username"
              placeholder="Enter username (upto 30 characters)"
              minLength={3}
              maxLength={30}
              register={register}
              required={true}
              trigger={trigger}
              error={errors.username}
              aria-describedby="username-error"
            />

            <FormInput
              text="Email"
              type="email"
              id="email"
              placeholder="Enter your email address"
              register={register}
              required={true}
              pattern={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
              trigger={trigger}
              error={errors.email}
              aria-describedby="email-error"
            />

            <FormInput
              text="Password"
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              register={register}
              required={true}
              trigger={trigger}
              error={errors.password}
              minLength={8}
              maxLength={30}
              aria-describedby="password-error"
            />

            {message && (
              <p id="form-message" className="text-red-500 text-xs italic mb-3">
                {message}
              </p>
            )}

            <div className="mt-6">
              <button
                type="submit"
                className={`w-full bg-blue-500 text-white font-bold py-2 px-8 rounded focus:outline-none ${
                  isValid
                    ? "hover:bg-blue-700 opacity-100"
                    : "opacity-50 cursor-not-allowed"
                }`}
                aria-label="Register"
              >
                Register
              </button>
            </div>
          </fieldset>
        </form>

        <p className="text-center mt-4">
          Already have an account? Please {" "}
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-700"
            aria-label="Go to login page"
          >
           Login
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

export default Register;
