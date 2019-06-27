// Core React, Router, and Redux modules
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

// React Components
import AddRelationDefaultPhoto from './AddRelationDefaultPhoto';
import Carousel from 'react-bootstrap/Carousel';
import {Button, ButtonGroup, ButtonToolbar, Collapse} from 'react-bootstrap';
import CreateOrEditPhoto from './CreateOrEditPhoto';

// Actions
import {rudPhoto} from '../../actions/photoActions';
// Helpers
import PropTypes from 'prop-types';
import {validOwner} from '../support/helpers';
// CSS
import '../../css/photo/contentroot.css';
// ------------------------------------------------------------------------- //
//                             PHOTO GALLERY                                 //
// ------------------------------------------------------------------------- //

class PhotoGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagActive: false,
      photoActive: false,
      index: 0,
      direction: null,
      mapping: null,
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.handlePhotoVsTag = this.handlePhotoVsTag.bind(this);
  }

  deletePhoto = event => {
    event.preventDefault();
    console.log('deletePhoto called');
    this.props.rudPhoto(event.target.id, 'DELETE');
  };

  handleSelect = (selectedIndex, e) => {
    console.log('index from handle', this.state.index);
    console.log('photos', this.props.photos);
    this.setState({
      index: selectedIndex,
      direction: e.direction,
    });
  };

  handlePhotoVsTag = event => {
    if (event.target.id === 'edit-photo-toggle-button') {
      if (this.state.tagActive) {
        this.setState({tagActive: false});
      }
      this.setState({photoActive: !this.state.photoActive});
    } else if (event.target.id === 'edit-tag-toggle-button') {
      if (this.state.photoActive) {
        this.setState({photoActive: false});
      }
      this.setState({tagActive: !this.state.tagActive});
    }
  };

  launchDetailView = event => {
    event.preventDefault();
    //  PUSH TO GALLERY VIEW
    this.props.history.push(
      '/user/' +
        this.props.match.params.username +
        '/detail/' +
        event.target.id,
    );
  };

  mapTagButtons = (tags, photo_id, destroyRelation) => {
    console.log('tag_id', tag_id);
    var titles_list = photos.map(photo =>
      this.props.user !== null &&
      this.props.user.username === this.props.match.params.username &&
      this.props.isAuthenticated ? (
        <ButtonGroup className="photo-button-group" key={photo.id}>
          <Button
            className="photo-button-name"
            id={photo.id}
            onClick={this.launchDetailView}>
            {photo.title}
          </Button>
          <Button
            className="remove-button"
            data-photo_id={photo.id}
            data-tag_id={tag_id}
            onClick={destroyRelation}
          />
        </ButtonGroup>
      ) : (
        <ButtonGroup className="photo-button-group">
          <Button key={photo.id} id={photo.id} onClick={this.launchDetailView}>
            {photo.title}
          </Button>
        </ButtonGroup>
      ),
    );
    return titles_list;
  };

  componentDidUpdate(prevProps) {
    const {photos} = this.props;
    const {index} = this.state;
    if (
      photos.length !== prevProps.photos.length &&
      photos[index] === undefined
    ) {
      this.setState({index: 0});
    }
  }

  render() {
    const {index, direction, isOpen, tagActive, photoActive} = this.state;
    var action, disabled;
    validOwner(this.props)
      ? (action = 'edit')
      : ((action = 'info'), (disabled = 'disabled'));
    console.log('INDEX', index);
    console.log('iasdf', this.props.photos[index]);
    if (this.props.photos[index] !== undefined) {
      return (
        <div className="centering-container">
          <div className="general-outer-container" id="gallery-page">
            <div id="outer-carousel">
              <Carousel
                activeIndex={index}
                direction={direction}
                onSelect={this.handleSelect}
                controls={true}
                indicators={true}
                interval={null}>
                {this.props.photos.map(photo => (
                  <Carousel.Item key={photo.id}>
                    <img
                      src={photo.thumbnail_source}
                      href={photo.thumbnail_source}
                    />
                    <Carousel.Caption>
                      <h6 id="carousel-caption">{photo.title}</h6>
                    </Carousel.Caption>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
            <div className="toolbar-container">
              <ButtonToolbar className="tags-and-photo-toolbar">
                <Button
                  onClick={this.launchDetailView}
                  id={this.props.photos[index].id}>
                  View Full Res
                </Button>
                <CreateOrEditPhoto
                  action={action}
                  isOpen={photoActive}
                  toggleOpen={this.handlePhotoVsTag}
                  photo={this.props.photos[index]}
                  disabled={disabled}
                />
                {action === 'edit' ? (
                  <AddRelationDefaultPhoto
                    isOpen={tagActive}
                    toggleOpen={this.handlePhotoVsTag}
                    photo_id={this.props.photos[index].id}
                  />
                ) : null}
                {action === 'edit' ? (
                  <Button
                    onClick={this.deletePhoto}
                    id={this.props.photos[index].id}
                    className="danger-button">
                    Delete Photo
                  </Button>
                ) : null}
              </ButtonToolbar>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="centering-container">
          <div className="general-outer-container">
            <h5 id="no-content">Either this user has no photos, or they failed to load.</h5>
          </div>
        </div>
      );
    }
  }
}

PhotoGallery.propTypes = {
  // PHOTOS
  photos: PropTypes.array.isRequired,
  photos_loaded: PropTypes.bool.isRequired,
  photos_loading: PropTypes.bool.isRequired,
  rudPhoto: PropTypes.func.isRequired,

  // TAGS
  tags: PropTypes.array.isRequired,
  tags_loaded: PropTypes.bool.isRequired,
  tags_loading: PropTypes.bool.isRequired,

  // RELATIONS
  relations: PropTypes.array.isRequired,
  relations_loaded: PropTypes.bool.isRequired,

  // USER
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  // rudRelation: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  photos: state.photos.photos,
  photos_loaded: state.photos.photos_loaded,
  photos_loading: state.photos.photos_loading,

  tags: state.tags.tags,
  tags_loaded: state.tags.tags_loaded,
  tags_loading: state.tags.tags_loading,

  relations: state.tags.relations,
  relations_loaded: state.tags.relations_loaded,

  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});

export default withRouter(
  connect(
    mapStateToProps,
    {rudPhoto},
  )(PhotoGallery),
);
