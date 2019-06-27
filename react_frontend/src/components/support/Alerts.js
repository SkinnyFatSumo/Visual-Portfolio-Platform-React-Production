import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';


class Alerts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.alert.show('It works.');
  }

  render() {
    return (
      <Fragment />
    );
  }
}

export default withAlert(Alerts);
