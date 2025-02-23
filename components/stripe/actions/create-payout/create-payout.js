const pick = require("lodash.pick");
const stripe = require("../../stripe.app.js");

module.exports = {
  key: "stripe-create-payout",
  name: "Create a Payout",
  type: "action",
  version: "0.0.1",
  description: "Send funds to your own bank account. Your Stripe balance must be able to cover " +
    "the payout amount, or you'll receive an 'Insufficient Funds' error.",
  props: {
    stripe,
    amount: {
      "propDefinition": [
        stripe,
        "amount",
      ],
      "optional": false,
    },
    currency: {
      "propDefinition": [
        stripe,
        "currency",
      ],
      "optional": false,
    },
    description: {
      propDefinition: [
        stripe,
        "description",
      ],
    },
    statement_descriptor: {
      propDefinition: [
        stripe,
        "statement_descriptor",
      ],
    },
    method: {
      propDefinition: [
        stripe,
        "payout_method",
      ],
    },
    source_type: {
      propDefinition: [
        stripe,
        "payout_source_type",
      ],
    },
    metadata: {
      propDefinition: [
        stripe,
        "metadata",
      ],
    },
  },
  async run() {
    const data = pick(this, [
      "amount",
      "currency",
      "description",
      "statement_descriptor",
      "method",
      "source_type",
      "metadata",
    ]);
    return await this.stripe.sdk().payouts.create(data);
  },
};
