const { STRIPE_SK } = require("../../config/config");
const { httpStatus } = require("../../config/constants");

const stripe = require("stripe")(STRIPE_SK);

const paymentInit = async (req, res) => {
    try {
        const payment = await stripe.paymentIntents.create({
            amount: req.body.price,
            currency: req.body.currency,
            automatic_payment_methods: {enabled: true}
        });

        res.send(payment.client_secret);
    } catch (error) {
        console.log(error);
        res.status(httpStatus.SERVICE_ERROR.status).send({error: error.message});
    }
}

module.exports = paymentInit;