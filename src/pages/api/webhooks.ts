import { stripe } from "../../services/stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "stream";
import Stripe from "stripe";
import { saveSubscrition } from "./_lib/manageSubscription";

async function buffer(readable: Readable) {
  const chunks = [];

  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
    return Buffer.concat(chunks);
  }
}

const relevantEvents = new Set(["checkout.session.completed"]);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const secret = req.headers["stripe-signature"];

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        buf,
        secret,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err: any) {
      return res.status(400).send(`Webhook error: ${err.message}`);
    }

    const type = event.type;
    if (relevantEvents.has(type)) {
      try {
        switch (type) {
          case "checkout.session.completed":
            const checkoutSession = event.data
              .object as Stripe.Checkout.Session;
            await saveSubscrition(
              checkoutSession.subscription.toString(),
              checkoutSession.customer.toString()
            );
            break;
          default:
            throw new Error("Unhandled events");
        }
      } catch (err) {
        return res.json({ error: "webhook handler failed" });
      }
    } else {
      res.json({ received: true });
    }

    res.status(200).json({ ok: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
  }
};
