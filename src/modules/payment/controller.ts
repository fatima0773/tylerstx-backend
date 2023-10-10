import { Request, Response } from 'express';
import Stripe from 'stripe';
import { ResponseCode } from '../../common/apiResponse';

const stripe = new Stripe('sk_test_51Nl5gfCom1elGNrKHRUlwkV23YrNvvxNHxKNOYxEjdwAz5EEvXWB83ltq4OlbyolwM2ldsPfp25g2N5TsJ9GiAi7002k9MK1wq', { apiVersion: '2020-08-27' });

export const paymentIntent = async (req: Request, res: Response) => {
  try {
    const { amount, paymentMethodId } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true,
    });

    res.status(ResponseCode.SUCCESS).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(ResponseCode.INTERNAL_SERVER_ERROR).json({ error });
  }
};
