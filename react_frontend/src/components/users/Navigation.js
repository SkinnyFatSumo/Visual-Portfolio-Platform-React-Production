import React, {Component} from 'react';
import {Nav, Navbar, Collapse} from 'react-bootstrap';

// Router
import {matchPath} from 'react-router';
import {withRouter} from 'react-router-dom';

// Redux
import {connect} from 'react-redux';

// Components
import SearchUsers from '../users/SearchUsers';

// Actions
import {logoutUser} from '../../actions/authActions';

// Helpers
import {validOwner} from '../support/helpers';
import PropTypes from 'prop-types';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {menu_value: 'account'};

    //this.onFormSubmit = this.onFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = e => {
    e.preventDefault();
    console.log('EVENT TARGET VALUE:', e.target.value);
    var redirect = e.target.value;
    this.setState({menu_value: 'account'});
    if (redirect === 'login') {
      this.props.history.push('/login/');
    } else if (redirect === 'logout') {
      this.props.logoutUser();
    } else if (redirect === 'profile') {
      this.props.history.push('/user/' + this.props.user.username + '/grid/');
    }
  };

  componentDidUpdate(prevProps) {
    console.log('NAVIGATION UPDATE', this.props.match.params.username);
    // IF USERNAME IN ROUTER CHANGES, FORCE THE COMPONENT TO UPDATE
  }

  render() {
    const match = matchPath(this.props.history.location.pathname, {
      path: '/user/:username',
    });

    const {history} = this.props.history;

    console.log('Username?', match);

    return (
      <Navbar expand="sm" id="navbar">
        <Navbar.Toggle id="navbar-toggle" aria-controls="collapsible-nav" />
        <Navbar.Collapse id="collapsible-nav">
          <Nav>
            <Nav.Item className="nav-item">
              <SearchUsers
                style={match === null ? {marginBottom: '9px'} : null}
                quantity={5}
                source="navbar"
                id="navbar"
                active={false}
              />
            </Nav.Item>
            <Nav.Item className="nav-item">
              {match !== null ? (
                <h4 id="nav-viewing-user">&nbsp;{match.params.username}&nbsp;</h4>
              ) : null}
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
        <Nav>
          <Nav.Item>
            <form
              id="account-options-form"
              onSubmit={this.onFormSubmit}
              style={
                match === null ? {marginBottom: '3px', marginTop: '3px'} : null
              }>
              <select
                className="account-options"
                id="account-options-selector"
                name="&nbsp; Account"
                onChange={this.handleChange}
                value={this.state.menu_value}>
                <option
                  id="account"
                  className="list-option"
                  disabled
                  selected
                  hidden
                  value="account">
                  Account
                </option>
                {this.props.isAuthenticated ? (
                  <option id="profile" className="list-option" value="profile">
                    View My Profile
                  </option>
                ) : null}
                {this.props.isAuthenticated ? (
                  <option id="logout" className="list-option" value="logout">
                    Logout
                  </option>
                ) : (
                  <option id="login" className="list-option" value="login">
                    Login
                  </option>
                )}
              </select>
            </form>
          </Nav.Item>
        </Nav>
      </Navbar>
    );
  }
}

Navigation.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default withRouter(
  connect(
    mapStateToProps,
    {logoutUser},
  )(Navigation),
);
