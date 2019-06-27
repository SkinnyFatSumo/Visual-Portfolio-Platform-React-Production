// Core React, Router, and Redux modules
import React, {Component, render} from 'react';
import {Router, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

// Redux Actions
import {setPhotos} from '../../actions/photoActions';
import {fetchRelations, setTags, fetchTags} from '../../actions/tagActions';

// React Components
import Gallery from 'react-photo-gallery';

// Helpers
import PropTypes from 'prop-types';
import {
  groupByProperty,
  stringOfTags,
  tagStringFromURL,
} from '../support/helpers';

// ------------------------------------------------------------------------- //
//                               PHOTO GRID                                  //
// ------------------------------------------------------------------------- //

function columns(containerWidth) {
  let columns = 1;
  if (containerWidth >= 400) columns = 2;
  if (containerWidth >= 600) columns = 3;
  if (containerWidth >= 800) columns = 4;
  return columns;
}

class PhotoGrid extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (event, object) => {
    event.preventDefault();
    //  PUSH TO GALLERY VIEW
    console.log('object', object);
    this.props.history.push(
      '/user/' +
        this.props.match.params.username +
        '/detail/' +
        object.photo.key,
    );
  };

  render() {
    const {photos_loaded, tags_loaded, photos} = this.props;

    if (photos_loaded && tags_loaded && photos.length > 0) {
      const photo_list = photos.map(photo => ({
        src: photo.thumbnail_source,
        width: photo.thumbnail_width,
        height: photo.thumbnail_height,
        key: photo.id,
      }));
      const photos_length = photos.length;
      photo_list.forEach(photo => {
        console.log(
          'DIMENSIONS: ',
          photo.src.offsetWidth,
          photo.src.offsetHeight,
        );
      });
      console.log('photos length:', photos_length);

      return (
        <div id="grid-border">
          <div id="grid-container">
            <Gallery
              photos={photo_list}
              direction={photos_length <= 4 ? 'row' : 'column'}
              columns={columns}
              onClick={this.handleClick}
            />
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

PhotoGrid.propTypes = {
  // PHOTOS
  photos: PropTypes.array.isRequired,
  photos_loaded: PropTypes.bool.isRequired,

  // TAGS
  tags: PropTypes.array.isRequired,
  tags_loaded: PropTypes.bool.isRequired,

  // RELATIONS
  relations: PropTypes.array.isRequired,
  relations_loaded: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  photos: state.photos.photos,
  photos_loaded: state.photos.photos_loaded,

  tags: state.tags.tags,
  tags_loaded: state.tags.tags_loaded,

  relations: state.tags.relations,
  relations_loaded: state.tags.relations_loaded,
});

export default withRouter(
  connect(
    mapStateToProps,
    {},
  )(PhotoGrid),
);
