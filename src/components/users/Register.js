import React, {Component} from 'react';
import {Router, withRouter, Link, Redirect} from 'react-router-dom';
import {Button, Form, Collapse, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import store from '../../Store';

import {passwordsMatch, registerUser} from '../../actions/authActions';
import {fetchAllUsers} from '../../actions/userActions';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      password_2: '',
      first_name: '',
      last_name: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    const {password, password_2, username, email} = this.state;
    if (this.props.passwordsMatch(password, password_2)) {
      var user_data = {
        username: username,
        email: email,
        password: password,
      };
      this.props.registerUser(user_data);
      console.log('register form submitted');
    }
  };

  handleChange = e => this.setState({[e.target.name]: e.target.value});

  componentDidUpdate(prevProps) {
    if (!prevProps.isAuthenticated && this.props.isAuthenticated) {
      store.dispatch(fetchAllUsers());
    }
    if (this.props.isAuthenticated && this.props.allUsersLoaded) {
      this.props.history.push('/user/' + this.props.user.username + '/grid/');
    }
  }

  render() {
    const {
      username,
      email,
      password,
      password_2,
      first_name,
      last_name,
    } = this.state;

    return (
      <div className="centering-container">
        <div className="login-or-register-container">
          <div className="general-outer-container" id="account">
            <h4 style={{marginTop: '5px'}}>Register</h4>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formGroupUsername">
                <Form.Control
                  className="form-element-box"
                  type="text"
                  name="username"
                  value={username}
                  onChange={this.handleChange}
                  placeholder="username"
                />
                <Form.Control
                  style={{marginTop: '5px'}}
                  className="form-element-box"
                  type="text"
                  name="email"
                  value={email}
                  placeholder="email"
                  onChange={this.handleChange}
                />
                <Form.Text className="text-muted">
                  We will never send you spam. Promise.
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formGroupPassword">
                <Form.Control
                  className="form-element-box"
                  name="password"
                  value={password}
                  type="password"
                  placeholder="password"
                  onChange={this.handleChange}
                />
                <Form.Control
                  style={{marginTop: '5px'}}
                  className="form-element-box"
                  name="password_2"
                  value={password_2}
                  type="password"
                  placeholder="confirm password"
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Button name="submit" type="submit" id="register-login-button">
                Submit
              </Button>
            </Form>
          </div>
          <div className="general-outer-container" id="register-or-login-link">
            <Link to="/login" className="nav-link">
              Have an Account? Click here to go to login page.
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  allUsersLoaded: PropTypes.bool.isRequired,
  registerUser: PropTypes.func.isRequired,
  fetchAllUsers: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  allUsersLoaded: state.users.allUsersLoaded,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default withRouter(
  connect(
    mapStateToProps,
    {passwordsMatch, registerUser, fetchAllUsers},
  )(Register),
);
