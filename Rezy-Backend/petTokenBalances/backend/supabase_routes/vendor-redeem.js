const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_PUBLIC);

router.post('/vendor-scan', async function (req, res) {
  const { qrCodeData } = req.body;

  // Validate the QR code data
  if (!qrCodeData || typeof qrCodeData !== 'object' || !qrCodeData.couponId || !qrCodeData.walletAddress) {
    return res.status(400).json({ error: 'Invalid QR code data' });
  }

  // Check if the coupon is valid and not spent
  const { data: couponData, error: couponError } = await supabase
    .from('userActivities')
    .select('coupon_spent')
    .eq('coupon_id', qrCodeData.couponId)
    .eq('wallet_address', qrCodeData.walletAddress)
    .maybeSingle();

  if (couponError || !couponData) {
    return res.status(404).json({ error: 'Coupon not found or error fetching coupon data' });
  }

  if (couponData.coupon_spent) {
    return res.status(400).json({ error: 'Coupon already used' });
  }

  // Mark the coupon as spent
  const { error: updateError } = await supabase
    .from('userActivities')
    .update({ coupon_spent: true })
    .eq('coupon_id', qrCodeData.couponId)
    .eq('wallet_address', qrCodeData.walletAddress);

  if (updateError) {
    return res.status(500).json({ error: 'Error updating coupon status' });
  }

  res.json({ message: 'Coupon successfully redeemed' });
});

module.exports = router;
