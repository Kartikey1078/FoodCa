import { Webhook } from "svix";
import User from "../../models/User.js";
import connectDB from "../../config/db.js";

export default async function clerkWebhook(req, res) {
  try {
    await connectDB();

    const secret = process.env.CLERK_WEBHOOK_SECRET;
    if (!secret) return res.status(500).send("Missing secret");

    const payload = req.body.toString("utf8");

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    const wh = new Webhook(secret);
    const event = wh.verify(payload, headers);

    const { type, data } = event;

    if (type === "user.created") {
      await User.create({
        clerkUserId: data.id,
        email: data.email_addresses?.[0]?.email_address,
        fullName: `${data.first_name} ${data.last_name}`.trim(),
        image: data.image_url,
      });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Clerk Webhook Error:", err.message);
    return res.status(400).send("Webhook error");
  }
}
