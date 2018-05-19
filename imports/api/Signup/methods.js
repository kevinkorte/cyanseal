import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import Stripe from 'stripe';

const stripe = Stripe(Meteor.settings.private.sk_test);

Meteor.methods({
  'signup.createCustomer'(token) {
    try {
      stripe.customers.create({
        email: 'foo-customer@example.com'
      })
      .then(function(customer){
        return stripe.customers.createSource(customer.id, {
          source: token.id
        })
      .catch(function(err) {
        console.error(err);
        // Deal with an error
      });
      })
    } catch (exception) {
      console.error('error!', exception);
    }
  }
})