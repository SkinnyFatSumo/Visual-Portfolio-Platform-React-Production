import React, {Component} from 'react';
import {Router, withRouter, Link, Redirect} from 'react-router-dom';
import {Button, Form, Collapse, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import store from '../../Store';

import {registerUser} from '../../actions/authActions';
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
    if (password !== password_2) {
      alert('Error, passwords do not match');
    } else {
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

    /*
    <Form.Row>
      <Form.Group as={Col}>
        <Form.Label>First Name</Form.Label>
        <Form.Control
          className="form-element-box"
          type="test"
          onChange={this.handleChange}
        />
        <Form.Text className="text-muted">Optional</Form.Text>
      </Form.Group>

      <Form.Group as={Col}>
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          className="form-element-box"
          type="name"
          onChange={this.handleChange}
        />
        <Form.Text className="text-muted">Optional</Form.Text>
      </Form.Group>
    </Form.Row>
    */
    return (
      <div className="centering-container">
        <div className="login-or-register-container">
          <div className="general-outer-container" id="account">
            <h4>Register</h4>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formGroupUsername">
                <Form.Label>Create a Username</Form.Label>
                <Form.Control
                  className="form-element-box"
                  type="text"
                  name="username"
                  value={username}
                  onChange={this.handleChange}
                  placeholder="Enter Username"
                />
              </Form.Group>
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  className="form-element-box"
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Enter Email"
                  onChange={this.handleChange}
                />
                <Form.Text className="text-muted">
                  We will never email you or share your email address. This is
                  just for logging in.
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className="form-element-box"
                  name="password"
                  value={password}
                  type="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                />
                <Form.Control
                  className="form-element-box"
                  name="password_2"
                  value={password_2}
                  type="password"
                  placeholder="Confirm Password"
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Button
                name="submit"
                type="submit"
                id="register-login-button">
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
    {registerUser, fetchAllUsers},
  )(Register),
);
