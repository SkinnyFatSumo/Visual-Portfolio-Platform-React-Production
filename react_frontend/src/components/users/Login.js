import React, {Component} from 'react';
import {Router, withRouter, Link, Redirect} from 'react-router-dom';
import {Button, Form, Collapse, Col} from 'react-bootstrap';
import PropTypes from 'prop-types';
// import '../../css/users/login.css';

// Redux
import {connect} from 'react-redux';

// GET Requests for ALL photos/tags
import {authenticateUser} from '../../actions/authActions'; // async

import {loginUser} from '../../actions/authActions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    console.log('user:', user);
    this.props.loginUser(user);
    console.log('login form submitted');
  };

  handleChange = e => this.setState({[e.target.name]: e.target.value});

  render() {
    if (this.props.isAuthenticated) {
      const user_profile_endpoint =
        '/user/' + this.props.user.username + '/grid/';
      return <Redirect to={user_profile_endpoint} />;
    }
    const {email, password} = this.state;
    return (
      <div className="centering-container">
        <div className="login-or-register-container">
          <div className="general-outer-container" id="account">
            <h4>Login</h4>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  autoComplete="off"
                  className="form-element-box"
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Enter Email"
                  onChange={this.handleChange}
                />
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
              </Form.Group>
              <Button
                id="register-login-button"
                name="submit"
                type="submit">
                Submit
              </Button>
            </Form>
          </div>
          <div className="general-outer-container" id="register-or-login-link">
            <Link to="/register" className="nav-link">
              Don't have an Account? Click here to register.
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default withRouter(
  connect(
    mapStateToProps,
    {loginUser},
  )(Login),
);
