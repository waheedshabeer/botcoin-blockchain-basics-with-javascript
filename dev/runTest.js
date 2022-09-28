const { blockChain } = require("../tests/data");
const { logData } = require("../utils/log");
const BotCoin = require("./blockChain");

const botCoin = new BotCoin();

logData(botCoin.isChainValid(blockChain.chain));
