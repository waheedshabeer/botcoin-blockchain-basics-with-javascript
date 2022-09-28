const { errorLogs } = require("./log");

const response = (res, data, message, error) => {
  res.json({
    status: error ? false : true,
    message: message || "Request successfully executed...",
    data,
    error,
  });
};

const failedResponse = (res, error) => {
  if (errorLogs) console.log(error);
  res.json({
    status: false,
    message: message || "Something went wrong...",
    error,
  });
};

module.exports = { response, failedResponse };
