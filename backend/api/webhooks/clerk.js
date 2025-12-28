import { Webhook } from "svix";
import { buffer } from "micro";
import connectDB from "../../config/db.js";
import User from "../../models/User.js";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  await connectDB();

  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    return res.status(500).json({ error: "Missing webhook secret" });
  }

  // Read raw body (Vercel-safe)
  const payload = (await buffer(req)).toString();

  const headers = {
    "svix-id": req.headers["svix-id"],
    "svix-timestamp": req.headers["svix-timestamp"],
    "svix-signature": req.headers["svix-signature"],
  };

  let event;

  try {
    const wh = new Webhook(WEBHOOK_SECRET);
    event = wh.verify(payload, headers);
  } catch (err) {
    console.error("❌ Webhook verification failed:", err);
    return res.status(400).json({ error: "Invalid signature" });
  }

  const { type, data } = event;

  try {
    if (type === "user.created") {
      await User.create({
        clerkUserId: data.id,
        email: data.email_addresses?.[0]?.email_address,
        fullName: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
        image: data.image_url,
      });
    }

    if (type === "user.updated") {
      await User.findOneAndUpdate(
        { clerkUserId: data.id },
        {
          email: data.email_addresses?.[0]?.email_address,
          fullName: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          image: data.image_url,
        }
      );
    }

    if (type === "user.deleted") {
      await User.findOneAndDelete({ clerkUserId: data.id });
    }

    return res.status(200).json({ received: true });
  } catch (dbErr) {
    console.error("❌ DB error:", dbErr);
    return res.status(500).json({ error: "Database error" });
  }
}
