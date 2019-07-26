// Core React, Router, and Redux modules
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

// React Components
import AbsoluteCollapseBox from './AbsoluteCollapseBox';
import AddRelationDefaultPhoto from './AddRelationDefaultPhoto';
import DeleteButton from './DeleteButton';
import CreateOrEditPhoto from './CreateOrEditPhoto';
import Loading from '../support/Loading';

import Carousel from 'react-bootstrap/Carousel';
import {Button, ButtonGroup, ButtonToolbar, Collapse} from 'react-bootstrap';

// Actions
import {rudPhoto} from '../../actions/photoActions'; // Helpers
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
    let check_index = parseInt(localStorage.getItem('gallery_index'), 10);
    if (isNaN(check_index)) check_index = 0;

    this.state = {
      index: check_index,
      direction: null,
      mapping: null,
      photoOpen: false,
      tagOpen: false,
    };

    this.handleSelect = this.handleSelect.bind(this);
  }

  deletePhoto = event => {
    event.preventDefault();
    this.props.rudPhoto(event.target.id, 'DELETE');
  };

  handleSelect = (selectedIndex, e) => {
    this.setState({
      index: selectedIndex,
      direction: e.direction,
    });
    localStorage.setItem('gallery_index', parseInt(selectedIndex, 10));
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

  componentDidUpdate(prevProps) {
    const {photos} = this.props;
    const {index} = this.state;
    if (photos[index] === undefined && index !== 0) {
      this.setState({index: 0});
    }
  }

  render() {
    const {index, direction} = this.state;
    var action, disabled;
    if (validOwner(this.props)) action = 'edit';
    else {
      action = 'info';
      disabled = 'disabled';
    }

    var width = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0,
    );

    if (this.props.photos_loaded) {
      if (this.props.photos.length === 0) {
        return (
          <div className="centering-container">
            <div className="general-outer-container">
              <h5 id="no-content">Sorry, this user has no photos.</h5>
            </div>
          </div>
        );
      } else {
        return (
          <div className="centering-container">
            <div className="general-outer-container" id="gallery-page">
              <div id="outer-carousel">
                <Carousel
                  activeIndex={index}
                  direction={direction}
                  onSelect={this.handleSelect}
                  controls={true}
                  indicators={
                    false
                    //indicators={width > 450 ? true : false}
                  }
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
                <ButtonToolbar
                  className="tags-and-photo-toolbar"
                  id="gallery-toolbar">
                  <Button
                    onClick={this.launchDetailView}
                    id={this.props.photos[index].id}>
                    View
                  </Button>
                  <AbsoluteCollapseBox action={action}>
                    {action === 'edit' && this.props.tags.length > 0 ? (
                      <AddRelationDefaultPhoto
                        photo_id={this.props.photos[index].id}
                      />
                    ) : null}
                    <CreateOrEditPhoto
                      action={action}
                      photo={this.props.photos[index]}
                      disabled={disabled}
                    />
                  </AbsoluteCollapseBox>
                  {action === 'edit' ? (
                    <Button
                      onClick={this.deletePhoto}
                      id={this.props.photos[index].id}
                      className="danger-button">
                      Delete
                    </Button>
                  ) : null}
                </ButtonToolbar>
              </div>
            </div>
          </div>
        );
      }
    } else {
      return <Loading />;
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
