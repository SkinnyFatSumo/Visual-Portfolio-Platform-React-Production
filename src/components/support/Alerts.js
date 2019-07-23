import React, {Component, Fragment} from 'react';
import {withAlert} from 'react-alert';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
  };

  /*
  componentDidMount() {
    this.props.alert.show('It works.');
  }
  */

  componentDidUpdate(prevProps) {
    const {error, alert} = this.props;
    if (error !== prevProps.error) {
      const e = error.errors;
      if (e.username) e.username.forEach(msg => alert.error('USERNAME: ' + msg));
      if (e.email) e.email.forEach(msg => alert.error('EMAIL: ' + msg));
      if (e.title) e.title.forEach(msg => alert.error('TITLE: ' + msg));
      if (e.tagname) e.tagname.forEach(msg => alert.error('TAG: ' + msg));
      if (e.password) e.password.forEach(msg => alert.error('PASSWORD: ' + msg));
      if (e.non_field_errors) e.non_field_errors.forEach(msg => alert.error(msg));
      if (e.photo_source) e.photo_source.forEach(msg => alert.error('PHOTO: ' + msg));
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = state => ({
  error: state.errors,
});

export default connect(mapStateToProps)(withAlert()(Alerts));
