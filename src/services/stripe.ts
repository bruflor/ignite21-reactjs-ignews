import Stripe from "stripe";

export const stripe = new Stripe(
  // @ts-ignore

  process.env.STRIPE_API_KEY, {
  apiVersion: "2022-11-15",
  appInfo: {
    name: "Ignews",
    version: "0.1.0",
  },
});
