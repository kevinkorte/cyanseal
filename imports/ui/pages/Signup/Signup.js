import React from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { StripeProvider, Elements } from 'react-stripe-elements';
import validate from '../../../modules/validate';
import InjectedForm from '../../components/Stripe/Stripe';

const stripe = Stripe(Meteor.settings.public.pk_test);
const elements = stripe.elements();

class Signup extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {

    const component = this;

    validate(component.form, {
      rules: {
        firstName: {
          required: true,
        },
        lastName: {
          required: true,
        },
        emailAddress: {
          required: true,
          email: true,
        },
        password: {
          required: true,
          minlength: 6,
        },
      },
      messages: {
        firstName: {
          required: 'What\'s your first name?',
        },
        lastName: {
          required: 'What\'s your last name?',
        },
        emailAddress: {
          required: 'Need an email address here.',
          email: 'Is this email address correct?',
        },
        password: {
          required: 'Need a password here.',
          minlength: 'Please use at least six characters.',
        },
      },
      submitHandler() { component.handleSubmit(component.form); },
    });
  }

  handleSubmit(form) {
    const { history } = this.props;
    console.log(form);


    // Accounts.createUser({
    //   email: form.emailAddress.value,
    //   password: form.password.value,
    //   profile: {
    //     name: {
    //       first: form.firstName.value,
    //       last: form.lastName.value,
    //     },
    //   },
    // }, (error) => {
    //   if (error) {
    //     Bert.alert(error.reason, 'danger');
    //   } else {
    //     Meteor.call('users.sendVerificationEmail');
    //     Bert.alert('Welcome!', 'success');
    //     history.push('/documents');
    //   }
    // });
  }

  render() {
    return (
      <StripeProvider apiKey={Meteor.settings.public.pk_test}>
        <PaymentInput />
      </StripeProvider>
    );
  }
}

Signup.propTypes = {
  history: PropTypes.object.isRequired,
};

class PaymentInput extends React.Component {
  render() {
    return (
      <Elements>
        <InjectedForm onSubmit={this.submitHandler}/>
      </Elements>
    );
  }
}

export default Signup;