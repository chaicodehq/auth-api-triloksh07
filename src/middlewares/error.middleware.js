/**
 * TODO: Global error handler
 *
 * 1. Handle Mongoose validation errors (error.name === 'ValidationError'):
 *    - Return 400 with { error: { message: error.message } }
 * 2. Handle Mongoose duplicate key errors (error.code === 11000):
 *    - Return 409 with { error: { message: "Email already exists" } }
 * 3. Handle all other errors:
 *    - Return 500 with { error: { message: error.message } }
 */
export function errorHandler(error, req, res, next) {
  let statusCode = 500;
  let message = error.message;

  if (error.name === 'ValidationError') {
    statusCode = 400;
    message = error.message;
  }
  else if (error.code === 11000) {
    statusCode = 409;
    message = "Email already exists";
  }

  return res.status(statusCode).json({
    error: { message },
  });
}
