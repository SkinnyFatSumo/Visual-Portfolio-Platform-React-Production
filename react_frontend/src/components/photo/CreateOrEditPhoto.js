import React, {Component, Fragment} from 'react';
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
      isOpen: false,
      title: '',
      photo_source: '',
      thumbnail_source: '',
      thumbnail_width: '',
      thumbnail_height: '',
      owner: '',
      id: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const {photo, action} = this.props;
    if (action === 'edit' || action === 'info') {
      this.setState({
        title: photo.title,
        photo_source: photo.photo_source,
        thumbnail_source: photo.thumbnail_source,
        thumbnail_width: photo.thumbnail_width,
        thumbnail_height: photo.thumbnail_height,
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
        thumbnail_source: photo.thumbnail_source,
        thumbnail_width: photo.thumbnail_width,
        thumbnail_height: photo.thumbnail_height,
        id: photo.id,
      });
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    const {postPhoto, user, action} = this.props;
    console.log('ACTION TYPE', this.props.action);
    const photo = {
      title: this.state.title,
      photo_source: this.state.photo_source,
      thumbnail_source: this.state.thumbnail_source,
      thumbnail_width: this.state.thumbnail_width,
      thumbnail_height: this.state.thumbnail_height,
      owner: this.props.user.id,
    };
    if (action === 'create') {
      this.props.postPhoto(photo);
    } else if (action === 'edit') {
      this.props.rudPhoto(this.state.id, 'PUT', photo);
      console.log('submit update');
    } else if (action === 'info') {
      console.log('info');
    }
  }

  render() {
    const {
      title,
      photo_source,
      thumbnail_source,
      thumbnail_width,
      thumbnail_height,
      id
    } = this.state;
    const {action, toggleOpen, isOpen, disabled} = this.props;
    var openName;
    var closeName;
    var photo_button_id;

    if (action === 'info') {
      photo_button_id = 'edit-photo-toggle-button';
      openName = 'Show Details';
      closeName = 'Hide Details';
    } else if (action === 'edit') {
      photo_button_id = 'edit-photo-toggle-button';
      openName = 'Edit Details';
      closeName = 'Hide Details';
    } else if (action === 'create') {
      photo_button_id = 'add-photo-toggle-button';
      openName = 'Add Photo';
      closeName = 'Done Adding';
    }
    return (
      <div>
        <Button
          id={photo_button_id}
          onClick={toggleOpen}
          aria-controls="collapse-photo-box"
          aria-expanded={isOpen}>
          {isOpen ? closeName : openName}
        </Button>
        <Collapse in={isOpen}>
          <div className="absolute-collapse-box">
            <Form className="photo-or-tag-add-form" onSubmit={this.onSubmit}>
              <fieldset disabled={disabled}>
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      placeholder="an excellent title"
                      onChange={this.onChange}
                      required
                      value={title}
                    />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>Full Resolution URL</Form.Label>
                    <Form.Control
                      type="url"
                      name="photo_source"
                      placeholder="https://www.somehost.com/fullresurl"
                      onChange={this.onChange}
                      value={photo_source}
                      required
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Thumbnail URL</Form.Label>
                    <Form.Control
                      type="url"
                      name="thumbnail_source"
                      placeholder="https://www.somehost.com/thumbnailurl"
                      onChange={this.onChange}
                      value={thumbnail_source}
                      required
                    />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>Thumbnail Width</Form.Label>
                    <Form.Control
                      type="number"
                      name="thumbnail_width"
                      placeholder="integer"
                      onChange={this.onChange}
                      min="0"
                      step="1"
                      value={thumbnail_width}
                      required
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Thumbnail Height</Form.Label>
                    <Form.Control
                      type="number"
                      name="thumbnail_height"
                      placeholder="integer"
                      onChange={this.onChange}
                      min="0"
                      step="1"
                      value={thumbnail_height}
                      required
                    />
                  </Form.Group>
                </Form.Row>
                {action === 'info' ? null : (
                  <Form.Row id="submit-photo-button-container">
                    <Form.Group as={Col}>
                      <Button id="submit-photo-button" type="submit">
                        Upload Photo
                      </Button>
                    </Form.Group>
                  </Form.Row>
                )}
              </fieldset>
            </Form>
          </div>
        </Collapse>
      </div>
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

export default connect(
  mapStateToProps,
  {postPhoto, rudPhoto},
)(CreateOrEditPhoto);
