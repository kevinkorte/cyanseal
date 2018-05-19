import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import Stripe from 'stripe';

const stripe = Stripe(Meteor.settings.private.sk_test);

Meteor.methods({
  'signup.createCustomer'(token, email) {
    try {
      stripe.customers.create({
        email: email,
        source: token.id
      })
      .then(function(customer) {
        stripe.subscriptions.create({
          customer: customer.id,
          trial_from_plan: true,
          items: [
            {
              plan: Meteor.settings.private.plan
            }
          ]
        })
      })
      .catch(function(err) {
        console.error(err);
        // Deal with an error
      })
    } catch (exception) {
      console.error('error!', exception);
    }
  }
})