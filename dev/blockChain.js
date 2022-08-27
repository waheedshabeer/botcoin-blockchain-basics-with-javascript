const sha256 = require("sha256");

function BlockChain() {
  this.chain = [];
  this.pendingTransactions = [];
  this.createNewBlockChain(100, "00", "GENISISBLOCK");
}

BlockChain.prototype.createNewBlockChain = function (
  nonce,
  previousHash,
  hash
) {
  const newBlockChain = {
    index: this.chain.length,
    nonce,
    previousHash,
    hash,
    timeStamp: Date.now(),
    pendingTransactions: this.pendingTransactions,
  };

  this.pendingTransactions = [];
  this.chain.push(newBlockChain);
  return newBlockChain;
};

BlockChain.prototype.getLastNode = function (params) {
  return this.chain[this.chain.length - 1];
};

BlockChain.prototype.createNewTransaction = function (
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

BlockChain.prototype.hashBlock = function (
  previousBlockHash,
  currentBlock,
  nonce
) {
  const stringForHash =
    previousBlockHash + JSON.stringify(currentBlock) + nonce.toString();
  return sha256(stringForHash);
};

BlockChain.prototype.proofOfWork = function (
  previousBlockHash,
  currentBlockData
) {
  let nonse = 0;
  let hash = this.hashBlock(previousBlockHash, currentBlockData, nonse);

  while (hash.substring(0, 4) !== "0000") {
    nonse++;
    hash = this.hashBlock(previousBlockHash, currentBlockData, nonse);
  }
  return nonse;
};

module.exports = BlockChain;
