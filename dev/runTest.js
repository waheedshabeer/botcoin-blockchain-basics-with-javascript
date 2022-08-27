const { logData } = require("../utils/log");
const BotCoin = require("./blockChain");

const botCoin = new BotCoin();

botCoin.createNewTransaction(100, "Waheed", "Asif");
botCoin.createNewBlockChain(1, "1", "2");
botCoin.createNewTransaction(200, "Waheed", "Shoaib");
botCoin.createNewTransaction(100, "Waheed", "Shoaib");
botCoin.createNewBlockChain(2, "2", "3");
botCoin.createNewTransaction(2300, "Waheed", "Shoaib");
botCoin.createNewTransaction(400, "Waheed", "Shoaib");
botCoin.createNewBlockChain(3, "3", "4");
const nonse = botCoin.proofOfWork(
  botCoin.getLastNode().hash,
  botCoin.getLastNode()
);
logData(botCoin, 1);
