import React from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { StripeProvider, Elements } from 'react-stripe-elements';
import validate from '../../../modules/validate';
import InjectedForm from '../../components/Stripe/Stripe';

const stripe = Stripe('pk_test_v6a9Z1nhKeKpqXAJ6uP26Vpa');
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
    console.log(this.props);


    this.props.stripe.createToken().then(({token}) => {
      console.log('Received Stripe Token:', token);
    })

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
      <div className="Signup">
        <Container>
          <Row>
            <Col lg={6}>
              <h4 className="page-header">Sign Up</h4>
              <Row>
                <StripeProvider apiKey="pk_test_v6a9Z1nhKeKpqXAJ6uP26Vpa">
                  <PaymentInput />
                </StripeProvider>
              </Row>
              {/* <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}> */}
                <Row>
                  <Col xs={6}>
                    <FormGroup>
                      <Label for="firstName">First Name</Label>
                      <input
                        type="text"
                        name="firstName"
                        className="form-control"
                        id="firstName"
                      />
                    </FormGroup>
                  </Col>
                  <Col xs={6}>
                    <FormGroup>
                    <Label for="lastName">Last Name</Label>
                      <input
                        type="text"
                        name="lastName"
                        className="form-control"
                        id="lastName"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                <Label for="email">Email</Label>
                  <input
                    type="email"
                    name="emailAddress"
                    className="form-control"
                    id="email"
                  />
                </FormGroup>
                <FormGroup>
                <Label for="password">Password</Label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="password"
                  />
                </FormGroup>
                <Button type="submit">Sign Up</Button>
              {/* </form> */}
            </Col>
            <Col lg={4}>
            Sidebar
            </Col>
          </Row>
        </Container>
      </div>
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
        <InjectedForm />
      </Elements>
    );
  }
}

export default Signup;