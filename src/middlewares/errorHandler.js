// src/middlewares/errorHandler.js

const errorHandler = (err, req, res, next) => {
  // 1. Log the error to your console for debugging
  console.error("❌ Error caught by safety net:", err.message);

  // 2. Use the status code from the error object, or default to 500 (Internal Server Error)
  const statusCode = err.statusCode || 500;
  
  // 3. Send a clean, consistent JSON response to the client
  return res.status(statusCode).json({
    success: false,
    message: err.message || "Something went wrong on the server."
  });
};

module.exports = errorHandler;
