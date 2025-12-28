import { Webhook } from "svix";
import User from "../models/User.js";
import connectDB from "../config/db.js";

const clerkWebhook = async (req, res) => {
  try {
    await connectDB(); // ✅ ensure DB connected

    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
    if (!WEBHOOK_SECRET) {
      console.error("❌ Missing CLERK_WEBHOOK_SECRET");
      return res.status(500).send("Missing webhook secret");
    }

    const payload = req.body.toString("utf8");

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    const wh = new Webhook(WEBHOOK_SECRET);
    const event = wh.verify(payload, headers);

    const { type, data } = event;

    if (type === "user.created") {
      const email =
        data.email_addresses?.find(
          (e) => e.id === data.primary_email_address_id
        )?.email_address;

      await User.findOneAndUpdate(
        { clerkUserId: data.id },
        {
          clerkUserId: data.id,
          email,
          fullName: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          image: data.image_url,
        },
        { upsert: true, new: true }
      );
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Clerk Webhook Error:", err);
    return res.status(400).send("Webhook error");
  }
};

export default clerkWebhook;
