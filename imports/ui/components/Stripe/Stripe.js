import React from 'react';
import { injectStripe, CardElement } from 'react-stripe-elements';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import validate from '../../../modules/validate';
const stripe = Stripe(Meteor.settings.public.pk_test);
console.log(Meteor.settings.public.pk_test);

class PaymentForm extends React.Component {

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
    this.props.stripe.createToken().then(({token}) => {
      Meteor.call('signup.createCustomer', token);
    });
  }

  render() {

    return (
      <div className="Signup">
        <Container>
          <Row>
            <Col lg={6}>
              <h4 className="page-header">Sign Up</h4>
              <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
                <CardElement className="stripe-payment-input" onSubmit={this.submitHandler} />
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
              </form>
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

export default injectStripe(PaymentForm);