const chain = "/";
const mine = "/mine";
const transaction = "/transaction";
const registerAndBroadcastNode = "/register-and-broadcast-node";
const registerNode = "/register-node";
const registerNodesBulk = "/register-nodes-bulk";
const transactionBroadcast = "/transaction/broadcast";
const testingNode = "http://localhost:3001";
const testingNodes = [
  "http://localhost:3002",
  "http://localhost:3003",
  "http://localhost:3004",
  "http://localhost:3005",
  "http://localhost:3006",
];
const receiveNewBlock = "/receive-new-block";

module.exports = {
  chain,
  mine,
  transaction,
  registerNode,
  registerAndBroadcastNode,
  registerNodesBulk,
  transactionBroadcast,
  testingNode,
  testingNodes,
  receiveNewBlock,
};
