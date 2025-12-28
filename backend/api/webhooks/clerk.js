import { Webhook } from "svix";
import connectDB from "../../config/db.js"; // your Mongo connection
import User from "../../models/User.js";

export const config = {
  api: {
    bodyParser: false, // Required for raw body
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  await connectDB(); // make sure your DB connection works

  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  // Read Svix headers
  const svixHeaders = {
    "svix-id": req.headers["svix-id"],
    "svix-timestamp": req.headers["svix-timestamp"],
    "svix-signature": req.headers["svix-signature"],
  };

  // Read raw body
  const buffer = await getRawBody(req);
  const payload = buffer.toString();

  let event;

  try {
    const wh = new Webhook(WEBHOOK_SECRET);
    event = wh.verify(payload, svixHeaders);
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return res.status(400).json({ error: "Invalid signature" });
  }

  const { type, data } = event;

  // Handle events
  if (type === "user.created") {
    await User.create({
      clerkUserId: data.id,
      email: data.email_addresses[0]?.email_address,
      fullName: `${data.first_name || ""} ${data.last_name || ""}`,
      image: data.image_url,
    });
  }

  if (type === "user.updated") {
    await User.findOneAndUpdate(
      { clerkUserId: data.id },
      {
        email: data.email_addresses[0]?.email_address,
        fullName: `${data.first_name || ""} ${data.last_name || ""}`,
        image: data.image_url,
      }
    );
  }

  if (type === "user.deleted") {
    await User.findOneAndDelete({ clerkUserId: data.id });
  }

  return res.status(200).json({ received: true });
}

// Helper to read raw body
function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", chunk => data += chunk);
    req.on("end", () => resolve(Buffer.from(data)));
    req.on("error", reject);
  });
}
