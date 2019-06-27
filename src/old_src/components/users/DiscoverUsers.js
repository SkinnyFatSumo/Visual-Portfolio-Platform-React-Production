// React
import React, {Component, Fragment} from 'react';

// Redux
import {connect} from 'react-redux';

// React Router
import {withRouter, Link} from 'react-router-dom';

import SearchUsers from './SearchUsers';

import {Button, Form, Collapse, Col} from 'react-bootstrap';

// import {fetchAllUsers} from '../../actions/userActions';
import PropTypes from 'prop-types';

// ------------------------------------------------------------------------- //
//                 ROOT COMPONENT FOR ALL --PHOTO-- MATERIAL                 //
// ------------------------------------------------------------------------- //

class DiscoverUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      isActive: false,
    };
  }

  render() {
    return (
      <div className="centering-container">
        <div className="general-outer-container">
          <SearchUsers
            quantity={20}
            source="bad_url"
            active={true}
            id="bad-url"
          />
          <div id="login-form">
            <Link to="/login" className="nav-link">
              Have an Account? Click here to go to login page.
            </Link>
          </div>
          <div id="register-form">
            <Link to="/register" className="nav-link">
              Don't have an Account? Click here to register.
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

DiscoverUsers.propTypes = {
  allUsersLoaded: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  allUsersLoaded: state.users.allUsersLoaded,
  users: state.users.users,
});

export default withRouter(
  connect(
    mapStateToProps,
    {},
  )(DiscoverUsers),
);
