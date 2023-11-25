const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const port = 3500;
const httpServer = http.createServer(app);

app.use(bodyParser.json());
app.use(cors());

const scannedData = [];
const otherScannedData = [];
let externalCartData = [];
let externalWalletAddress = null;

function arraysAreEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (JSON.stringify(arr1[i]) !== JSON.stringify(arr2[i])) {
      return false;
    }
  }

  return true;
}

function flushExternalData() {
  externalCartData = [];
  externalWalletAddress = null;
}

// Function to flush external data every minute
const flushDataInterval = setInterval(flushExternalData, 120 * 1000); // Executes every 120 seconds (2 minute)

const wss = new WebSocket.Server({ server: httpServer });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
  });
});

app.post('/scan', (req, res) => {    //Gets bottle array and wallet from the front-end//
  const { cart, walletAddress } = req.body;

  if (cart && Array.isArray(cart) && walletAddress) {
    const cartData = { cart };
    const addressData = { walletAddress };

    externalCartData.push(cartData);
    externalWalletAddress = addressData;

    scannedData.push({ cart, walletAddress });
    console.log(`Received and stored scanned data: ${JSON.stringify({ cart, walletAddress })}`);

    if (arraysAreEqual(scannedData, otherScannedData)) {
      console.log('Both scannedData and otherScannedData match.');
      notifyClients();
    }

    res.status(200).json({ message: 'Data received and stored.' });
  } else {
    res.status(400).json({ message: 'Invalid data received.' });
  }
});

app.post('/scan2', (req, res) => {
  const { cart } = req.body;

  if (cart && Array.isArray(cart)) {
    otherScannedData.push({ cart });
    console.log(`Received and stored scanned data in otherScannedData: ${JSON.stringify({ cart })}`);

    if (arraysAreEqual(scannedData, otherScannedData)) {
      console.log('Both scannedData and otherScannedData match.');
      notifyClients();
    }

    res.status(200).json({ message: 'Data received and stored in otherScannedData.' });
  } else {
    res.status(400).json({ message: 'Invalid data received.' });
  }
});

app.get('/external/cart-data', (req, res) => {  // Shows the bottles deposited according to the barcode and it's details//
  if (externalCartData.length > 0) {
    res.status(200).json(externalCartData);
  } else {
    res.status(404).json({ message: 'Cart data not available yet.' });
  }
});

app.get('/external/cart-data/total-entries', (req, res) => { //This fucntion counts the bottles//
  if (externalCartData.length > 0) {
    let totalItems = 0;
    
    externalCartData.forEach(entry => {
      if (entry.cart && Array.isArray(entry.cart)) {
        totalItems += entry.cart.length;
      }
    });

    const extendedAmount = `${totalItems}000000000000000000`; // Concatenate 18 zeros for a proper format fulfilment with ETH standars//
    res.status(200).json({ amount: extendedAmount });
  } else {
    res.status(404).json({ message: 'Cart data not available yet.' });
  }
});

app.get('/external/wallet-address', (req, res) => {  // This allows to check which address is being stored before minting//
  if (externalWalletAddress) {
    res.status(200).json(externalWalletAddress);
  } else {
    res.status(404).json({ message: 'Wallet address not available yet.' });
  }
});

app.get('/scanned-data-count-multiplied', (req, res) => { // No usable here//
  const dataCount = scannedData.length - 1;
  const multipliedCount = dataCount; // Retaining the existing logic
  res.status(200).json({ multipliedCount });
});


app.get('/scanned-data', (req, res) => {   
  res.status(200).json(scannedData);
});

app.get('/scanned-data2', (req, res) => {
  res.status(200).json(otherScannedData);
});

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

function notifyClients() {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send('Both scannedData and otherScannedData match.');
    }
  });
}
