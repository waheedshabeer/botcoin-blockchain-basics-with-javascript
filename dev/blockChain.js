const sha256 = require("sha256");

function BotCoin() {
  this.chain = [];
  this.pendingTransactions = [];
}

BotCoin.prototype.createNewBotCoin = function (nonce, previousHash, hash) {
  const newBotCoin = {
    index: this.chain.length,
    nonce,
    previousHash,
    hash,
    timeStamp: Date.now(),
    pendingTransactions: this.pendingTransactions,
  };

  this.pendingTransactions = [];
  this.chain.push(newBotCoin);
  return newBotCoin;
};

BotCoin.prototype.getLastNode = function (params) {
  return this.chain[this.chain.length - 1];
};

BotCoin.prototype.createNewTransaction = function (
  amount,
  senderAddress,
  receiverAddress
) {
  const newTransaction = {
    amount,
    senderAddress,
    receiverAddress,
  };

  this.pendingTransactions.push(newTransaction);

  return this.getLastNode["index"] + 1;
};

BotCoin.prototype.hashBlock = function (
  previousBlockHash,
  nonce,
  currentBlock
) {
  const stringForHash =
    previousBlockHash + nonce.toString() + JSON.stringify(currentBlock);
  return sha256(stringForHash);
};

module.exports = BotCoin;
