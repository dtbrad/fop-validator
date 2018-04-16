import React, { Component } from 'react';
import 'bootstrap3/dist/css/bootstrap.css';
import 'bootstrap3/dist/css/bootstrap-theme.css';
import { Alert, Button, ButtonGroup, Col, Dropdown, Grid, NavItem, Row } from 'react-bootstrap';

const hasValidFormsOfPaymentAvailable = arr => arr.some(card => card.valid);

const hasSelectedFormOfPayment = arr => arr.some(card => card.selected);

const creditCards = [
  {
    name: 'Visa',
    selected: false,
    valid: true
  },
  {
    name: 'Discover',
    selected: false,
    valid: true
  },
  {
    name: 'MasterCard',
    selected: false,
    valid: true
  }
];

const initialState = {
  creditCards
};
class App extends Component {
  constructor() {
    super();
    this.state = initialState;
    this.selectCard = this.selectCard.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleValidCard = this.toggleValidCard.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const validBooking = hasValidFormsOfPaymentAvailable(this.state.creditCards) && hasSelectedFormOfPayment(this.state.creditCards);
    this.setState({ clickedBook: true, validBooking });
  }

  selectCard(selectedCardName) {
    const newCardsArray = this.state.creditCards.map(card => Object.assign({}, card, { selected: card.name === selectedCardName }));
    this.setState({ creditCards: newCardsArray });
  }

  toggleValidCard(selectedCard) {
    const newCardsArray = this.state.creditCards.map(card => Object.assign({}, card, { selected: false, valid: selectedCard.target.name === card.name ? !card.valid : card.valid }));
    this.setState({ creditCards: newCardsArray });
  }

  render() {
    const errorMessage = hasValidFormsOfPaymentAvailable(this.state.creditCards) ? (
      null
    ) : <Alert bsStyle="danger">All your cards are expired</Alert>;

    const bookingMessage = this.state.validBooking ? (
      <Alert bsStyle="success">Your flight is booked!</Alert>
    ) : (
      <Alert bsStyle="danger">Try again with valid form of payment</Alert>
    );

    const creditCardOption = creditCard => <NavItem key={creditCard.name} tag={Dropdown} eventKey={creditCard.name} disabled={!creditCard.valid} onSelect={this.selectCard} >{creditCard.name}</NavItem>;

    const creditCardButton = creditCard => <Button key={creditCard.name} inline name={creditCard.name} onClick={this.toggleValidCard}>{creditCard.name}</Button>;

    return (
      <div className="App">
        <Grid>
          <Row>
            <Col md={12}>
              <h1 className="text-center">Form of Payment App</h1>
              <br />
              { this.state.clickedBook ? bookingMessage : null }
              {errorMessage}
            </Col>
          </Row>
          <Row>
            <form onSubmit={this.handleSubmit}>
              <Col md={6}>
                <Dropdown block>
                  <Dropdown.Toggle block>
                    Select Form of Payment
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <NavItem tag={Dropdown} eventKey="" onSelect={this.selectCard} >None</NavItem>
                    {this.state.creditCards.map((creditCardOption))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col md={6}>
                <Button bsStyle="primary" type="submit" block>Book Ticket</Button>
              </Col>
            </form>
          </Row>
          <br />
          <Row>
            <Col md={12}>
              <br />
              <hr />
              <pre>{JSON.stringify(this.state, null, 2)}</pre>
              <div className="text-center">
                <h5>Toggle credit card validity (will reset form)</h5>
                <ButtonGroup >{this.state.creditCards.map(creditCardButton)}</ButtonGroup>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;