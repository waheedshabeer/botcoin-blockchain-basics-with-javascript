const { response, failedResponse } = require("../res/response");
const { minningReward } = require("../utils/values");
const BlockChain = require("./blockChain");
const bodyParser = require("body-parser");
const express = require("express");
const axios = require("axios");
const {
  registerAndBroadcastNode,
  registerNode,
  registerNodesBulk,
  transaction,
  mine,
} = require("../utils/endpoints");
const uuid = require("uuid");

const nodeAddress = uuid.v1().split("-").join("");
const botCoin = new BlockChain();
const port = process.argv[2];
const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  try {
    response(res, botCoin);
  } catch (error) {
    failedResponse(res, error);
  }
});

app.get(mine, (req, res) => {
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

app.post(transaction, (req, res) => {
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

// DECENTERELIZE NETWORK
app.post(registerAndBroadcastNode, (req, res) => {
  try {
    const { newNodeURL } = req.body;
    if (
      !botCoin.networkNodes.includes(newNodeURL) &&
      botCoin.currentNodeURL != newNodeURL
    ) {
      botCoin.networkNodes.push(newNodeURL);
    }
    const allPrimises = [];
    botCoin.networkNodes.forEach((node) => {
      allPrimises.push(
        axios({
          method: "POST",
          url: node + registerNode,
          data: {
            newNodeURL,
          },
        })
      );
    });
    Promise.all(allPrimises).then(() => {
      axios({
        method: "POST",
        url: newNodeURL + registerNodesBulk,
        data: {
          allNodesURLs: [...botCoin.networkNodes, botCoin.currentNodeURL],
        },
      });
      response(
        res,
        {},
        `Node registered to ${botCoin.networkNodes.length} nodes successfully...`
      );
    });
  } catch (error) {
    failedResponse(res, error);
  }
});

app.post(registerNode, (req, res) => {
  try {
    const { newNodeURL } = req.body;
    if (
      !botCoin.networkNodes.includes(newNodeURL) &&
      botCoin.currentNodeURL != newNodeURL
    )
      botCoin.networkNodes.push(newNodeURL);
    response(res, {}, `Node registered successfully...`);
  } catch (error) {
    failedResponse(res, error);
  }
});

app.post(registerNodesBulk, (req, res) => {
  try {
    const { allNodesURLs } = req.body;
    allNodesURLs.forEach((newNodeURL) => {
      if (
        !botCoin.networkNodes.includes(newNodeURL) &&
        botCoin.currentNodeURL != newNodeURL
      )
        botCoin.networkNodes.push(newNodeURL);
    });
    response(res, {}, `All Nodes registered successfully...`);
  } catch (error) {
    failedResponse(res, error);
  }
});

app.listen(port, function () {
  console.log(`Blockchain node is ${port}`);
});
