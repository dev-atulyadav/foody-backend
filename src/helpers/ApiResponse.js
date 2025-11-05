class ApiResponse {
  static success(res, message, data = null, code = 200) {
    return res.status(code).json({
      status: "success",
      message,
      data,
      code,
    });
  }

  static error(res, message, statusCode = 500) {
    return res.status(statusCode).json({
      status: "error",
      message,
      code: statusCode,
    });
  }
}
export default ApiResponse;
