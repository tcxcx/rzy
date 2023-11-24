require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const { createClient } = require('@supabase/supabase-js');
const cronJob = require('./tokenBalances/cronScheduler'); 

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_PUBLIC;
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();

// Apply middleware
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:4000', 'http://localhost:5000', 'http://localhost:5001', 'http://localhost:5002', 'https://rezy.lat', 'https://vendor.rezy.lat', 'https://minteador.onrender.com'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

// Routes
let redeemPromo = require("./supabase_routes/redeem-promo");
let vendorPromo = require("./supabase_routes/vendor-redeem");

// Use the routes
app.use('/redeem-promo', redeemPromo);
app.use('/vendor-scan', vendorPromo);


// Start the server
const PORT = 5000 || 5002;
if (require.main === module) {
  cronJob();

  app.listen(PORT, () => {
    console.log(`Server is running on port 5000`);
  });
}

// Export the app for testing purposes
module.exports = app;
