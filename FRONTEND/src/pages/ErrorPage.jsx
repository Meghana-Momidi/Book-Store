import React from "react";
import { Link, useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  // Default to 404 if no error object is provided
  const status = error?.status || 404;
  const message =
    status === 404
      ? "The page you are looking for does not exist or has been moved."
      : "An unexpected error occurred while processing your request. Please try again later.";

  return (
    <div
      className="flex h-screen items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200"
      role="alert"
      aria-live="assertive"
    >
      <div className="text-center">
        {status === 404 ? (
          <div
            className="flex flex-col items-center justify-center h-[85vh] text-center"
            role="document"
          >
            <h1
              className="text-6xl mb-4"
              aria-label="Page Not Found"
            >
              🤔
            </h1>
            <h1
              className="text-4xl font-bold text-red-600 mb-8"
              id="error-title"
              aria-labelledby="error-title"
            >
              Looking for something?
            </h1>
            <p
              className="text-gray-600 mb-8 text-lg"
              id="error-description"
            >
              {message}
            </p>
            <Link
              to="/"
              className="bg-primary font-semibold px-4 py-2 rounded-md transition transition-transform transform hover:scale-110 duration-300"
              aria-label="Go back to the homepage"
            >
              Go Back Home
            </Link>
          </div>
        ) : (
          <>
            <h2
              className="mt-4 text-3xl font-semibold text-gray-700"
              id="error-title"
            >
              Internal Server Error
            </h2>
            <p
              className="mt-2 text-gray-600 font-semibold"
              id="error-description"
            >
              {message}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default ErrorPage;
