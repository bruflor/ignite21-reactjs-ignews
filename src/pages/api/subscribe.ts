import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { stripe } from "../../services/stripe";
import { query as q } from "faunadb";
import { fauna } from "@/services/fauna";
// @ts-nocheck
type User = {
  ref: {
    id: string;
  };
  data: {
    stripe_customer_id: string;
  };
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const session = await getSession({ req });
if(session?.user?.email){
    const user = await fauna.query<User>(

        q.Get(q.Match(q.Index("user_by_email"), q.Casefold(session?.user?.email)))
        );

    let customerId = user.data.stripe_customer_id;
 
    if (!customerId) {
      // @ts-ignore
      const stripeCustomer = await stripe.customers.create({
        email: session?.user?.email,
      });

      await fauna.query(
        q.Update(q.Ref(q.Collection("users"), user.ref.id), {
          data: { stripe_customer_id: stripeCustomer.id },
        })
      );
      customerId = stripeCustomer.id;
    }
    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      billing_address_collection: "required",
      line_items: [{ price: "price_1Mc6s9DnHiKpoTei2NrPAzOh", quantity: 1 }],
      mode: "subscription",
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCESS_URL as string,
      cancel_url: process.env.STRIPE_CANCEL_URL as string,
    });
    return res.status(200).json({ sessionId: stripeCheckoutSession.id });
  }
  
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
  }
};
