const { logData } = require("../utils/log");
const BotCoin = require("./blockChain");

const botCoin = new BotCoin();
botCoin.createNewBotCoin(1, "1", "2");
botCoin.createNewTransaction(100, "Waheed", "Asif");
botCoin.createNewBotCoin(2, "2", "3");
botCoin.createNewTransaction(200, "Waheed", "Shoaib");
botCoin.createNewTransaction(100, "Waheed", "Shoaib");
botCoin.createNewTransaction(2300, "Waheed", "Shoaib");
botCoin.createNewTransaction(400, "Waheed", "Shoaib");
botCoin.createNewBotCoin(3, "3", "4");

logData(botCoin);
