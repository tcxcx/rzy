const express = require("express");
const router = express.Router();
const { createClient } = require("@supabase/supabase-js");
const { Resend } = require("resend");
const QRCode = require("qrcode");

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_PUBLIC
);
const resend = new Resend(process.env.RESEND_URL);

router.post("/", async function (req, res) {
  const { wallet_address, businessName, tokens, email, tokenBalance, active } =
    req.body;

  // Check if the wallet_address already exists in tokenBalances
  let { data: existingBalance, error: balanceError } = await supabase
    .from("tokenBalances")
    .select("*")
    .eq("wallet_address", wallet_address)
    .maybeSingle();

  if (balanceError) {
    console.error("Error checking token balance:", balanceError);
    return res.status(500).json({ error: "Error checking token balance" });
  }

  // If the wallet_address does not exist, insert it
  if (!existingBalance) {
    let { error: insertTokenBalanceError } = await supabase
      .from("tokenBalances")
      .insert([
        {
          wallet_address: wallet_address,
          balance: tokenBalance,
          last_updated: new Date().toISOString(),
        },
      ]);

    if (insertTokenBalanceError) {
      console.error("Error inserting token balance:", insertTokenBalanceError);
      return res.status(500).json({ error: "Error inserting token balance" });
    }
  } else if (existingBalance.balance !== tokenBalance) {
    // Update existing token balance
    let { error: updateTokenBalanceError } = await supabase
      .from("tokenBalances")
      .update({ balance: tokenBalance, last_updated: new Date().toISOString() })
      .eq("wallet_address", wallet_address);

    if (updateTokenBalanceError) {
      console.error("Error updating token balance:", updateTokenBalanceError);
      return res.status(500).json({ error: "Error updating token balance" });
    }
  }
  // Insert into the Coupons table
  let { data: couponData, error: couponError } = await supabase
    .from("Coupons")
    .select("*")
    .eq("business_name", businessName)
    .eq("tokens_required", tokens)
    .maybeSingle();

  if (couponError) {
    console.error("Error finding coupon:", couponError);
    return res.status(500).json({ error: "Error finding coupon" });
  }

  let couponId = couponData?.coupon_id;
  const qrData = { couponId: couponId, walletAddress: wallet_address };
  const qrCodeURL = await QRCode.toDataURL(JSON.stringify(qrData));

  const currentTime = new Date().toISOString();

  if (!couponId) {
    // Insert new coupon if not found
    const { data: newCoupon, error: newCouponError } = await supabase
      .from("Coupons")
      .insert({
        business_name: businessName,
        tokens_required: tokens,
        active: active ?? true,
        coupons_redeemed: 1,
        created_at: currentTime,
        updated_at: currentTime,
      })
      .single();

    if (newCouponError || !newCoupon) {
      console.error(
        "Error inserting new coupon:",
        newCouponError ? newCouponError.message : "Unknown error"
      );
      console.log("Supabase response:", { newCoupon, newCouponError });
      return res
        .status(500)
        .json({
          error: "Error inserting new coupon",
          details: newCouponError ? newCouponError.message : "Unknown error",
        });
    }

    couponId = newCoupon.coupon_id;
  } else {
    // Update coupons redeemed count for the existing coupon
    const { error: updateCouponError } = await supabase
      .from("Coupons")
      .update({
        coupons_redeemed: (couponData.coupons_redeemed || 0) + 1,
        updated_at: currentTime,
      })
      .eq("coupon_id", couponId);

    if (updateCouponError) {
      console.error("Error updating coupon:", updateCouponError);
      return res.status(500).json({ error: "Error updating coupon" });
    }
  }

  // Update userActivities
  const { error: userActivityError } = await supabase
    .from("userActivities")
    .insert({
      wallet_address: wallet_address,
      coupon_id: couponId,
      user_coupons_redeemed: 1,
      qr_code_url: qrCodeURL,
      coupon_spent: false,
    });

  if (userActivityError) {
    console.error("Error updating user activities:", userActivityError);
    return res.status(500).json({ error: "Error updating user activities" });
  }

  const emailData = await resend.emails.send({
    from: "REZY <coupon@rezy.lat>",
    to: "tomas.cordero.esp@gmail.com",
    subject: "New Coupon Redeemed",
    html: `
    <div class="email-container">
        <div style="margin-bottom: 8px; padding-top: 16px; display: block; text-align: center;">
            <img src="https://kjfgojhzdalyjbbblasl.supabase.co/storage/v1/object/sign/rezy_image/2.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJyZXp5X2ltYWdlLzIucG5nIiwiaWF0IjoxNzAwNzE2MzE0LCJleHAiOjE3MzIyNTIzMTR9.Ylz7HeaX3i37nOFDj9eqrhAIQFikwBkHrEOAy710lus&t=2023-11-23T05%3A11%3A55.744Z" alt="Company Logo" style="height: 64px; width: auto; margin: 0 auto; display: block; text-align: center;">
        </div>
        <div class="email-content" style="margin: 8px 16px 16px; padding: 16px;">
            <div style="text-align: left; font-weight: bold; font-size: 12px; margin-bottom: 16px;">
            <h1>Congratulations on Your New Coupon!</h1>
            </div>
            <div style="font-size: 14px; color: #718096; margin-bottom: 8px;">
            <p>You have successfully redeemed a coupon for <strong>${businessName}</strong>!</p>
            <p>Here is your QR Code for the coupon:</p>
            <img src="${qrCodeURL}" alt="QR Code" />
            </div>
            <div style="font-size: 14px; color: #718096; margin-bottom: 8px; padding-top: 16px;">
            <p>Please keep this email as a reference for your redeemed coupon.</p>
            <p>If you have any questions or need assistance, feel free to contact our support team.</p>
            <p>Thank you for being a valued member of our community!</p>

            </div>
            <div style="font-size: 18px; font-weight: bold; color: #000000; margin-bottom: 8px; padding-top: 16px;">
            <p>Best regards,</p>
                      </div>
            <div style="font-size: 18px; font-weight: bold; color: #000000; margin-bottom: 8px;">
            <p>The REZY Team</p>  
                        </div>
            <div style="font-size: 12px; color: #A0AEC0; margin-bottom: 8px; padding-top: 16px;">
            REZY will never call you by phone or send you an email asking you to disclose or verify your banking information. If you receive any suspicious emails with links to update your account information or they ask you over the phone, do not click on any of the links or give any data. Inform DREX about these suspicious emails or calls.
            </div>
            <div style="font-size: 12px; color: #A0AEC0; margin-bottom: 8px; text-align: center; padding-top: 16px;">
                These emails are automatic. Please do not reply.
            </div>
        </div>
    </div>`,
  });

  console.log("Email sent successfully", emailData);
  // If all goes well, send a success response
  res.json({ message: "Promo redeemed successfully" });
});

module.exports = router;
