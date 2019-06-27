// React
import React, {Component, Fragment} from 'react';

// Redux
import {connect} from 'react-redux';

// React Router
import {Router, withRouter, Redirect, Link} from 'react-router-dom';

import {
  InputGroup,
  FormControl,
  Button,
  Form,
  Collapse,
  Col,
  Row,
  Container,
  Nav,
} from 'react-bootstrap';

// import {fetchAllUsers} from '../../actions/userActions';
import PropTypes from 'prop-types';

// ------------------------------------------------------------------------- //
//                 ROOT COMPONENT FOR ALL --PHOTO-- MATERIAL                 //
// ------------------------------------------------------------------------- //

class SearchUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      valid_users: [],
      isActive: false,
    };
    this.onChange = this.onChange.bind(this);
    this.clearState = this.clearState.bind(this);
    this.onOptionChange = this.onOptionChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({isActive: this.props.active});
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('PATHNAME', this.props.history.location.pathname);
    const {username, isActive} = this.state;
    const {source, allUsersLoaded, users} = this.props;
    if (source === 'navbar') {
      // if's active, and username is empty, make it inactive
      // if it's inactive, and username is not empty, make it active

      if (isActive === true && username === '') {
        this.setState({isActive: false});
      } else if (isActive === false && username !== '') {
        this.setState({isActive: true});
      }
    }

    if (
      this.props.allUsersLoaded &&
      this.state.username !== prevState.username
    ) {
      console.log('state username', username);

      var user_lower = username.toLowerCase();
      var resulting_users = users.map(user => user.username.toLowerCase());

      if (username !== '') {
        resulting_users = resulting_users.filter(user =>
          user.includes(user_lower),
        );
      }

      resulting_users = resulting_users
        .sort((a, b) => {
          if (a < b) {
            return -1;
          }
          if (a > b) {
            return 1;
          }
          return 0;
        })
        .slice(0, this.props.quantity);
      this.setState({
        valid_users: resulting_users,
      });
    }
  }

  onFormSubmit(e) {
    e.preventDefault();
    console.log('form submitted');
    var submitted_name;
    this.state.valid_users.includes(this.state.username)
      ? (submitted_name = this.state.username)
      : (submitted_name = this.state.valid_users[0]);

    if (submitted_name !== undefined) {
      this.props.history.push('/user/' + submitted_name + '/grid/', {
        hydrated: true,
      });
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  clearState() {
    this.setState({username: ''});
  }

  onOptionChange(e) {
    console.log('on option change', e.target.name);
  }

  render() {
    var user_buttons = this.state.valid_users.map((username, index) => (
      <option
        className="list-option"
        key={index}
        id={index}
        name={username}
        value={username}
      />
    ));

    const {pathname} = this.props.history.location.pathname;

    return (
      <form
        id={'search-users-form-' + this.props.id}
        onSubmit={this.onFormSubmit}>
        <input
          style={this.props.style}

          autoComplete="off"
          id={'search-users-input-' + this.props.id}
          list="users-list"
          name="username"
          onChange={this.onChange}
          placeholder="&nbsp; &nbsp; find a user"
          type="text"
          value={this.state.username}
        />
        {this.state.isActive ? (
          <datalist className="general-dropdown-list" id="users-list">
            {user_buttons}
          </datalist>
        ) : null}
        <button
          id={'search-users-input-button-' + this.props.id}
          className='search-users-input-button'
          onSubmit={this.onFormSubmit}>
          Go
        </button>
      </form>
    );
  }
}

SearchUsers.propTypes = {
  users: PropTypes.array.isRequired,
  allUsersLoaded: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  users: state.users.users,
  allUsersLoaded: state.users.allUsersLoaded,
});

export default withRouter(
  connect(
    mapStateToProps,
    {},
  )(SearchUsers),
);
