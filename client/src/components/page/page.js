import React, { Component } from 'react';
import { StickyContainer } from 'react-sticky';
import { Helmet } from 'react-helmet';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';

import Header from 'components/header/header';

export default class Page extends Component {
  static propTypes = {
    title: PropTypes.string,

    header: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.bool
    ]),
    before: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.element,
      PropTypes.object
    ]),
    after: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.element,
      PropTypes.object
    ])
  };

  static defaultProps = {
    title: 'Shing Wedding',
    header: () => (<Header />),
    before: null,
    after: null
  };

  static contextTypes = {
    router: React.PropTypes.object,
    store: React.PropTypes.object
  };

  static scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false
    };
  }

  /**
   * Only update if props and/or state have changed
   * @param  {Object} nextProps
   * @param  {Object} nextState
   * @return {Boolean}
   */
  shouldComponentUpdate(nextProps, nextState) {
    if (isEqual(nextProps, this.props) && isEqual(nextState, this.state)) {
      return false;
    }

    return true;
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  render() {
    return (
      <StickyContainer>
        <Helmet>
          <title>{this.props.title}</title>
        </Helmet>
        {this.props.header &&
          this.props.header.call(this, Header)
        }

        {this.props.before &&
          this.props.before
        }

        {this.props.after &&
          this.props.after
        }
      </StickyContainer>
    );
  }
}
