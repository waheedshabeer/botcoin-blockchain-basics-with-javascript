const BlockChain = require("./blockChain");
const bodyParser = require("body-parser");
const express = require("express");
const uuid = require("uuid");
const nodeAddress = uuid.v1().split("-").join("");
const app = express();
const port = 3000;

const { response, failedResponse } = require("../res/response");
const { minningReward } = require("../utils/values");
const botCoin = new BlockChain();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  try {
    response(res, botCoin);
  } catch (error) {
    failedResponse(res, error);
  }
});

app.get("/mine", (req, res) => {
  try {
    const lastBlock = botCoin.getLastNode();
    const previousBlockHash = lastBlock.hash;
    const currentBlockData = {
      transactions: lastBlock.transactions,
      index: lastBlock.index,
    };
    const nonse = botCoin.proofOfWork(previousBlockHash, currentBlockData);
    const hash = botCoin.hashBlock(previousBlockHash, currentBlockData, nonse);
    botCoin.createNewTransaction(minningReward, "REWARD", nodeAddress);
    const newBlock = botCoin.createNewBlockChain(
      nonse,
      previousBlockHash,
      hash
    );

    response(
      res,
      { newBlock, BlockChain: botCoin },
      "New block mined successfully"
    );
  } catch (error) {
    failedResponse(res, error);
  }
});

app.post("/transaction", (req, res) => {
  try {
    const { amount, senderAddress, receiverAddress } = req.body;
    const block = botCoin.createNewTransaction(
      amount,
      senderAddress,
      receiverAddress
    );
    response(res, req.body, `Your transaction will be saved at Block ${block}`);
  } catch (error) {
    failedResponse(res, error);
  }
});

app.listen(port, function () {
  console.log(`Blockchain node is ${port}`);
});
