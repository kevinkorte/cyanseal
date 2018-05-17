import React from 'react';
import autoBind from 'react-autobind';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import validate from '../../../modules/validate';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {

    const component = this;

    validate(component.form, {
      submitHandler() { component.handleSubmit(component.form); },
    });
  }

  handleSubmit(form) {
    console.log('handled submit', form);
  }

  render() {
    return (
      <div className="Signup">
        <Container>
          <Row>
            <Col md="6">
              <h4 className="page-header">Sign Up</h4>
              <Form onSubmit={event => event.preventDefault()}>
                <Row>
                  <Col xs="6">
                  <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input
                      type="email"
                      name="email"
                      id="exampleEmail"
                      placeholder="with a placeholder"
                    />
                  </FormGroup>
                  </Col>
                </Row>
                <Button>Submit</Button>
              </Form>
            </Col> 
          </Row>
        </Container>
      </div>
    )
  }
}

export default Signup