const logData = (data, stringyfy) => {
  console.log("====================================");
  console.log(stringyfy ? JSON.stringify(data) : data);
  console.log("====================================");
};
const errorLogs = true;

module.exports = { logData, errorLogs };
