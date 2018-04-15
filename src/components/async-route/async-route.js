import React, { Component } from 'react';

export default function asyncRoute(getComponent) {
  return class AsyncRoute extends Component {
    static RouteComponent = null;

    constructor(props) {
      super(props);

      this.state = {
        RouteComponent: AsyncRoute.RouteComponent
      };
    }

    componentWillMount() {
      if (this.state.RouteComponent) {
        return;
      }

      const RouteComponent = getComponent();
      AsyncRoute.RouteComponent = RouteComponent;

      if (this.mounted) {
        this.setState({ RouteComponent });
      } else {
        this.state.RouteComponent = RouteComponent;
      }
    }

    componentDidMount() {
      this.mounted = true;
    }

    render() {
      const { RouteComponent } = this.state;

      return (
        <If condition={RouteComponent}>
          <RouteComponent {...this.props} />
        </If>
      );
    }
  };
}
