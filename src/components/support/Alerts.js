import React, {Component, Fragment} from 'react';
import {withAlert} from 'react-alert';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class Alerts extends Component {
  static propTypes = {
    errors: PropTypes.object.isRequired,
    messages: PropTypes.string.isRequired,
  };

  componentDidUpdate(prevProps) {
    const {alert, errors, messages} = this.props;

    if (errors !== prevProps.errors) {
      if (errors.server_errors) {
        const se = errors.server_errors;
        for (const [key, value] of Object.entries(se)) {
          if (key === 'non_field_errors') {
            console.log('key, value', key, value);
            value.forEach(val => {
              if (val === 'The fields owner, title must make a unique set.') {
                alert.error('TITLE: Another photo already has this title.');
              } else if (val === 'Invalid Credentials') {
                alert.error(
                  'LOGIN: The login credentials provided are invalid.',
                );
              }
            });
          } else alert.error(key + ': ' + value);
        }
      }
      if (errors.network_errors) {
        const ne = errors.network_errors;
        if (ne.message && ne.message === 'Failed to fetch') {
          alert.error('NETWORK: Unable to connect to server. Sorry :/');
        }
      }
    } 
    if (messages !== prevProps.messages) {
      console.log('messages', messages);
      if (messages.success_message) alert.success(messages.success_message);
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  messages: state.messages,
});

export default connect(mapStateToProps)(withAlert()(Alerts));
