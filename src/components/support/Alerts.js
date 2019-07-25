import React, {Component, Fragment} from 'react';
import {withAlert} from 'react-alert';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class Alerts extends Component {
  static propTypes = {
    errors: PropTypes.object.isRequired,
  };

  componentDidUpdate(prevProps) {
    const {errors, alert} = this.props;

    if (errors !== prevProps.errors) {
      if (errors.server_errors) {
        const se = errors.server_errors;
        for (const [key, value] of Object.entries(se)) {
          if (key === 'non_field_errors') {
            if (value === 'The fields owner, title must make a unique set.') {
              alert.error('TITLE: Another photo already has this title.');
            }
          }
          else alert.error(key + ': ' + value);
        }
      }
      if (errors.network_errors) {
        const ne = errors.network_errors;
        if (ne.message && ne.message === 'Failed to fetch') {
          alert.error('NETWORK: Unable to connect to server. Sorry :/');
        }
      }
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(withAlert()(Alerts));
