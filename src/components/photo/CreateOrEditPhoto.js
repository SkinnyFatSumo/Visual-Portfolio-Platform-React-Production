import React, {Component} from 'react';
import {Button, Form, Collapse, Col} from 'react-bootstrap';
import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux';

// Actions
import {rudPhoto, postPhoto} from '../../actions/photoActions';

class CreateOrEditPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
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
    console.log(e.target.files[0]);
  }

  onSubmit(e) {
    e.preventDefault();
    const {postPhoto, user, action, rudPhoto} = this.props;
    var formData = new FormData();
    formData.append('title', this.state.title);
    formData.append('photo_source', this.state.photo_source);
    formData.append('owner', user.id);
    if (action === 'create') {
      postPhoto(formData);
    } else if (action === 'edit') {
      rudPhoto(this.state.id, 'PUT', formData);
    }
  }

  render() {
    const {title, photo_source} = this.state;
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
                      name="title"
                      onChange={this.onTitleChange}
                      placeholder="title"
                      required
                      type="text"
                      value={title}
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Full Resolution URL</Form.Label>
                    <Form.Control
                      name="photo_source"
                      onChange={this.onPhotoChange}
                      required
                      type="file"
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
