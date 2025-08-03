import Stripe from 'stripe';
const stripe = new Stripe('sk_test_TA_CLE_SECRETE_ICI'); // Mets ta clé secrète Stripe ici

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        { price: 'ID_DE_TON_PRIX_STRIPE', quantity: 1 }, // Mets ici l’ID de ton produit Stripe
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/merci`,
      cancel_url: `${req.headers.origin}/`,
      customer_email: email,
    });
    res.status(200).json({ id: session.id });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
