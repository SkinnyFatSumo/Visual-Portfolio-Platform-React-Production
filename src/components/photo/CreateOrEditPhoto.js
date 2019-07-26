import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Button, Form, Collapse, Col} from 'react-bootstrap';
import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux';

// Actions
import {rudPhoto, postPhoto} from '../../actions/photoActions';

// Helpers
import {validOwner} from '../support/helpers';

class CreateOrEditPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      photo_source: null,
      owner: '',
      id: '',
    };
    this.onPhotoChange = this.onPhotoChange.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const {photo, action} = this.props;
    if (action === 'edit' || action === 'info') {
      this.setState({
        title: photo.title,
        photo_source: photo.photo_source,
        id: photo.id,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const {photo, action} = this.props;
    if (prevProps.photo !== photo && (action === 'edit' || action === 'info')) {
      this.setState({
        title: photo.title,
        photo_source: photo.photo_source,
        id: photo.id,
      });
    }
  }

  onTitleChange(e) {
    this.setState({title: e.target.value});
  }

  onPhotoChange(e) {
    this.setState({
      photo_source: e.target.files[0],
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const {postPhoto, user, action, rudPhoto} = this.props;
    // form
    var formData = new FormData();
    formData.append('title', this.state.title);
    formData.append('photo_source', this.state.photo_source);
    formData.append('owner', user.id);
    // post, update, or delete
    if (action === 'create') {
      postPhoto(formData);
    } else if (action === 'edit') {
      rudPhoto(this.state.id, 'PUT', formData);
    }
  }

  render() {
    const {photo_source, title} = this.state;
    const {action, disabled} = this.props;
    var openName;
    var closeName;
    var photo_button_id;

    return (
      <Form className="photo-or-tag-add-form" onSubmit={this.onSubmit}>
        <fieldset disabled={disabled}>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Title</Form.Label>
              <Form.Control
                className="photo-upload"
                name="title"
                onChange={this.onTitleChange}
                placeholder="title"
                type="text"
                value={title}
              />
            </Form.Group>
            {validOwner(this.props) ? (
              <Form.Group as={Col}>
                <Form.Label>Photo</Form.Label>
                <Form.Control
                  className="photo-upload"
                  name="photo_source"
                  onChange={this.onPhotoChange}
                  type="file"
                />
              </Form.Group>
            ) : null}
          </Form.Row>
          {action === 'info' ? null : (
            <Form.Row id="submit-photo-button-container">
              <Form.Group as={Col}>
                <Button id="submit-photo-button" type="submit">
                  {action === 'create' ? 'Upload' : 'Update'}
                </Button>
              </Form.Group>
            </Form.Row>
          )}
        </fieldset>
      </Form>
    );
  }
}

CreateOrEditPhoto.propTypes = {
  postPhoto: PropTypes.func.isRequired,
  rudPhoto: PropTypes.func.isRequired,
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
    {postPhoto, rudPhoto},
  )(CreateOrEditPhoto),
);
