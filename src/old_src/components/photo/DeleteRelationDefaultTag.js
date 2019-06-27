import React, {Component} from 'react';
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Form,
  Collapse,
  Col,
} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux';

// Actions
import {rudRelation} from '../../actions/tagActions';

import {validOwner} from '../support/helpers';

class DeleteRelationDefaultTag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo_title: '',
    };

    this.onChange = this.onChange.bind(this);
    this.formSbumit = this.formSubmit.bind(this);
    this.deleteRelation = this.deleteRelation.bind(this);
    this.launchDetailView = this.launchDetailView.bind(this);
    this.filterOutput = this.filterOutput.bind(this);
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  formSubmit = e => {
    e.preventDefault();
  };

  deleteRelation = event => {
    event.preventDefault();
    console.log('Tag ID', this.props.tag_id);
    var relation = this.props.relations.find(
      relation =>
        relation.photo == event.target.id &&
        relation.tag == this.props.tag_id,
    );
    console.log('relation', relation);
    this.props.rudRelation(relation.id, 'DELETE');
  };

  launchDetailView = e => {
    event.preventDefault();
    //  PUSH TO GALLERY VIEW
    this.props.history.push(
      '/user/' +
        this.props.match.params.username +
        '/detail/' +
        event.target.id,
    );
  };

  filterOutput(photo_buttons) {
    if (this.state.photo_title === '') {
      return null;
    } else if (photo_buttons.length > 0 || this.state.photo_title === 'all') {
      return photo_buttons;
    } else {
      return (
        <Button variant="danger" block>
          no matches
        </Button>
      );
    }
  }

  render() {
    const {photo_title} = this.state;
    const {associated_photos} = this.props;
    var photo_buttons = [];

    photo_title === 'all'
      ? (photo_buttons = associated_photos)
      : (photo_buttons = associated_photos.filter(photo =>
          photo.title.toLowerCase().includes(photo_title.toLowerCase()),
        ));

    photo_buttons = photo_buttons
      .filter(photo => photo.title.toLowerCase())
      .sort((a, b) => {
        var title_a = a.title.toLowerCase();
        var title_b = b.title.toLowerCase();
        if (title_a < title_b) {
          return -1;
        }
        if (title_a > title_b) {
          return 1;
        }
        return 0;
      })
      .map(remaining_photo =>
        validOwner(this.props) ? (
          <ButtonGroup key={remaining_photo.id} className="photo-button-group">
            <Button id={remaining_photo.id} onClick={this.launchDetailView}>
              {remaining_photo.title}
            </Button>
            <Button
              className="remove-button"
              id={remaining_photo.id}
              onClick={this.deleteRelation}
            />
          </ButtonGroup>
        ) : (
          <ButtonGroup className="photo-button-group">
            <Button
              key={remaining_photo.id}
              id={remaining_photo.id}
              onClick={this.launchDetailView}>
              {remaining_photo.title}
            </Button>
          </ButtonGroup>
        ),
      );

    return (
      <div>
        <h4 className="sub-header">Search Associated Photos</h4>
        <input
          autoComplete="off"
          id="photo-name-textbox"
          name="photo_title"
          onChange={this.onChange}
          onSubmit={this.formSubmit}
          placeholder="search by title, or type 'all' to view all photos"
          type="text"
          value={photo_title}
        />
        {this.filterOutput(photo_buttons)}
      </div>
    );
  }
}

DeleteRelationDefaultTag.propTypes = {
  rudRelation: PropTypes.func.isRequired,
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
  relations: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  relations: state.tags.relations,
});

export default withRouter(
  connect(
    mapStateToProps,
    {rudRelation},
  )(DeleteRelationDefaultTag),
);
