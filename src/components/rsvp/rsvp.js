import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Form, Button } from 'reactstrap';

class Rsvp extends Component {
  static propTypes = {
    guest: PropTypes.string.isRequired
  };

  static defaultProps = {
    guest: ''
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();

    const response = e.target.name;
    const { guest } = this.props;

    /* eslint-disable */
    const rsvp = await axios.post('/api/rsvp', {
      guest,
      response
    });
  }

  render() {
    return (
      <div>
        <Form>
          <Button
            name="Yes"
            onClick={this.handleSubmit}
          >
            Accept
          </Button>
          <Button
            name="No"
            onClick={this.handleSubmit}
          >
            Decline
          </Button>
        </Form>
      </div>
    );
  }
}

export default Rsvp;
