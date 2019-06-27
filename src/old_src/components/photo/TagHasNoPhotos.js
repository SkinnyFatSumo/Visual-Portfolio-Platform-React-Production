import React, {Component, Fragment} from 'react';

import {withRouter} from 'react-router-dom';

// React Components
import AddRelationDefaultTag from './AddRelationDefaultTag';

// Bootstrap Components
import {Button, ButtonToolbar, Container} from 'react-bootstrap';

class TagHasNoPhotos extends Component {
  constructor(props) {
    super(props);
    this.state = {isActive: false};
    this.toggleActive = this.toggleActive.bind(this);
  }

  toggleActive = e => {
    e.preventDefault();
    this.setState({isActive: !this.state.isActive});
  };

  render() {
    if (
      this.props.user !== null &&
      this.props.user.username === this.props.match.params.username &&
      this.props.isAuthenticated
    ) {
      return (
        <div className="tag-content-container">
          <button onClick={this.toggleActive} className="tagname-button">
            {this.props.tagname}
          </button>
          {this.state.isActive ? (
            <div className="general-outer-container">
              <AddRelationDefaultTag
                tagname={this.props.tagname}
                tag_id={this.props.tag_id}
                unassociated_photos={this.props.all_photos}
              />
              <Button
                variant="danger"
                className="remove-tag-button"
                id={this.props.tag_id}
                onClick={this.props.destroyTag}>
                Delete Tag
              </Button>
            </div>
          ) : null}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default withRouter(TagHasNoPhotos);
