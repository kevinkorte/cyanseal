import React from 'react';
import { injectStripe, CardElement } from 'react-stripe-elements';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Accounts } from 'meteor/accounts-base';
import autoBind from 'react-autobind';
import fontawesome from '@fortawesome/fontawesome';
import ExclamationSolid from '../../icons/ExclamationSolid';
import validate from '../../../modules/validate';
const stripe = Stripe(Meteor.settings.public.pk_test);

class PaymentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCardError: false
    }
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
    this.props.stripe.createToken().then(({token}) => {
      Accounts.createUser({
        email: form.emailAddress.value,
        password: form.password.value,
        profile: {
          name: {
            first: form.firstName.value,
            last: form.lastName.value
          }
        }
      }, (error) => {
        if (error) {
          console.error(error);
        } else {
          Meteor.call('signup.createCustomer', token, form.email.value, (error, customer) => {
            if ( error ) {
              console.error(error);
            } else {
              console.log(customer);
            }
          });
        }
      })
    });
  }

  handleChange(event) {
    console.log(event.error);
    const displayError = document.getElementById('card-errors');
    if (event.error) {
      this.setState({
        isCardError: true
      });
      displayError.textContent = event.error.message;
    } else {
      this.setState({
        isCardError: false
      });
      displayError.textContent = ''
    }

  }

  render() {

    return (
      <div className="Signup d-flex align-items-center">
        <Container>
 
          <Row>
            <Col lg={6} className="bg-white py-3">
            <Row className="mb-5">
            <Col xs={6}>
            Logo
            </Col>
            <Col xs={6} className="d-flex justify-content-end">
            <div>
              <small className="text-muted">Have an account?</small>
              <Button color="outline-secondary btn-sm btn-sm-radius ml-2">Login</Button>
            </div>
            </Col>
          </Row>
          <Row className="mb-3">
          <Col>
          <h4 className="page-header text-center">
            <div className="d-block">Get Started</div>
            <small className="text-muted">You're only a moment away from trying it out.</small>
          </h4>
          </Col>
          </Row>

              <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
                <CardElement className="stripe-payment-input" onChange={this.handleChange} style={{base: {fontSize: '18px'}}} classes={{base: 'form-control', invalid: 'form-control is-invalid'}} />
                <small id="emailHelp" className="form-text text-danger d-flex align-items-center">
                { this.state.isCardError ? <ExclamationSolid width="15" fill="#dc3545" /> : null }
                <span className="pl-1" id="card-errors"></span>
                </small>
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
            <Col lg={4} className="signup-sidebar">
              Sidebar
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default injectStripe(PaymentForm);