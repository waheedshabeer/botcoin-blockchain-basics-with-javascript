const { response, failedResponse } = require("../utils/response");
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
  transactionBroadcast,
  chain,
  testingNodes,
  testingNode,
  receiveNewBlock,
} = require("../utils/endpoints");
const uuid = require("uuid");

const nodeAddress = uuid.v1().split("-").join("");
const botCoin = new BlockChain();
const port = process.argv[2];
const app = express();

app.use(bodyParser.json());

app.get(chain, (req, res) => {
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
    const newBlock = botCoin.createNewBlockChain(
      nonse,
      previousBlockHash,
      hash
    );

    let allPromisses = [];
    botCoin.networkNodes.forEach((nodeURL) => {
      allPromisses.push(
        axios({
          url: nodeURL + receiveNewBlock,
          data: { newBlock },
          method: "POST",
        })
      );
    });
    Promise.all(allPromisses).then(async () => {
      try {
        await axios({
          url: botCoin.currentNodeURL + transactionBroadcast,
          data: {
            amount: minningReward,
            senderAddress: "REWARD",
            receiverAddress: nodeAddress,
          },
          method: "POST",
        });
      } catch (error) {
        console.log(error);
      }
    });

    response(
      res,
      { newBlock, BlockChain: botCoin },
      "New block mined and broascasted successfully"
    );
  } catch (error) {
    failedResponse(res, error);
  }
});

app.post(transaction, (req, res) => {
  try {
    const { newTrsansaction } = req.body;
    const block = botCoin.addTransactionToPendingTransactions(newTrsansaction);
    response(
      res,
      req.body,
      `Broadcasted transaction will be saved at Block ${block}`
    );
  } catch (error) {
    failedResponse(res, error);
  }
});

app.post(transactionBroadcast, (req, res) => {
  try {
    const { amount, senderAddress, receiverAddress } = req.body;
    const newTrsansaction = botCoin.createNewTransaction(
      amount,
      senderAddress,
      receiverAddress
    );
    const block = botCoin.addTransactionToPendingTransactions(newTrsansaction);
    let allPromises = [];
    botCoin.networkNodes.forEach((nodeURL) => {
      allPromises.push(
        axios({
          url: nodeURL + transaction,
          method: "POST",
          data: {
            newTrsansaction,
          },
        })
      );
    });
    Promise.all(allPromises).then(() => {
      response(
        res,
        req.body,
        `Transaction is broadcasted to ${botCoin.networkNodes.length} nodes and will be saved at Block ${block}`
      );
    });
  } catch (error) {
    failedResponse(res, error);
  }
});

app.post(receiveNewBlock, (req, res) => {
  try {
    const { newBlock } = req.body;
    const lastBlock = botCoin.getLastNode();
    const isCorrectHash =
      lastBlock.previousBlockHash === newBlock.previousBlockHash;
    const isCorrectIndex = lastBlock.index + 1 === newBlock.index;

    if (isCorrectHash && isCorrectIndex) {
      botCoin.chain.push(newBlock);
      botCoin.pendingTransactions = [];
      response(
        res,
        req.body,
        `Broadcasted block is accepted and added into chain`
      );
    } else {
      failedResponse(res, "Broadcasted block is rejected");
    }
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
  if (botCoin.currentNodeURL == testingNode) {
    let allPromisses = [];
    testingNodes.forEach(async (newNodeURL) => {
      await axios({
        url: botCoin.currentNodeURL + registerAndBroadcastNode,
        method: "POST",
        data: {
          newNodeURL,
        },
      });
    });
    Promise.all(allPromisses).catch((e) => {
      console.log(e);
    });
  }
  console.log(`Blockchain node is ${port}`);
});
