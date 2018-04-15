import React, { Component } from 'react';

import Rsvp from 'components/rsvp/rsvp';
import getQueryString from 'utils/_get-query-string';
import guestsRawData from 'assets/json/guestData.json';

class RsvpView extends Component {
  state = {
    guest: ''
  }

  componentWillMount() {
    if (typeof window !== 'undefined') {
      const param = 'surname';
      const url = window.location.href;
      const guest = getQueryString(param, url);

      this.setState({ guest });
    }
  }

  render() {
    const { guest } = this.state;
    const guestData = guestsRawData[guest];
    const { intro, desc } = guestData;

    return (
      <div>
        <h1>{intro}</h1>
        <h2>{desc}</h2>
        <Rsvp guest={guest} />
      </div>
    );
  }
}

export default RsvpView;
