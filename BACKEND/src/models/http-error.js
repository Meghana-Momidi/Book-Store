class HttpError extends Error {
  constructor(message, errorCode) {
    super(message);
    this.code = errorCode;
  }
  // This method will send the error response automatically
  send(res) {
    res.status(this.code).json({
      message: this.message,
      errorCode: this.code,
    });
  }
}
module.exports = HttpError;
