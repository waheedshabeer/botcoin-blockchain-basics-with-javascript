const { errorLogs } = require("../utils/log");

const response = (res, data, message, error) => {
  res.json({
    status: error ? false : true,
    message: "Request successfully executed...",
    data,
    error,
  });
};

const failedResponse = (res, error) => {
  if (errorLogs) console.log(error);
  res.json({
    status: false,
    message: "Something went wrong...",
    error,
  });
};

module.exports = { response, failedResponse };
