import React, {Component} from 'react';
import {Router, withRouter} from 'react-router-dom';

class ErrorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.goBackTwo = this.goBackTwo.bind(this);
    this.goBackThree = this.goBackThree.bind(this);
  }
  componentDidMount() {
    // CHECK IF HYDRATED, MAKE HYDRATION A STATE VARIABLE IN HISTORY
    if (this.props.history.location.state === undefined) {
      this.props.history.push({state: {failure: 'generic', return_url: null}});
    } else if (this.props.history.location.state.failure === undefined) {
      this.props.history.push({state: {failure: 'generic', return_url: null}});
    }
  }

  goBackTwo = () => {
    this.props.history.go(-2);
  };
  goBackThree = () => {
    this.props.history.go(-3);
  };

  render() {
    const {failure, return_url} = this.props.history.location.state;
    return (
      <div>
        <h4>Uh oh, something went wrong :(</h4>
        <h6>{failure}</h6>
        <h6>{return_url}</h6>
        <button>PlaceHolder: Go Back to Before The Issue</button>
        <button onClick={this.goBackTwo}>Go Back 2</button>
        <button onClick={this.goBackThree}>Go Back 3</button>
      </div>
    );
  }
}

export default withRouter(ErrorPage);
