import React, { Component } from 'react';
import { withRouter } from 'react-router';

import styles from './header.scss';

export class Header extends Component {
  render() {
    return (
      <div className={styles.header}>
        <nav>
          <p>Test please</p>
        </nav>
      </div>
    );
  }
}

export default withRouter(Header);
