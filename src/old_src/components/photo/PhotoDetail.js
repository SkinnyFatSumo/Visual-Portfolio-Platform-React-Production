// Core React, Router, and Redux modules
import React, {Component, render} from 'react';
import {Router, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

// Redux Actions
import {fetchRelations} from '../../actions/tagActions';

// Helpers
import PropTypes from 'prop-types';

class PhotoDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {all_photos, all_photos_loaded} = this.props;
    const {id} = this.props.match.params;

    var img_src = undefined;
    var title;

    if (all_photos_loaded) img_src = all_photos.find(photo => photo.id == id);
    if (img_src !== undefined) {
      title = img_src.title.toUpperCase();
      img_src = img_src.photo_source;
    }

    return (
      <div className="centering-container">
        <div className="general-outer-container" id="photo-detail-page">
          {all_photos_loaded && img_src !== undefined ? (
            <div>
              <h5 id="detail-title">{title}</h5>
              <img className="detail-content" id="detail-image" src={img_src} />
            </div>
          ) : all_photos_loaded ? (
            <h5 className="detail-content">Photo No Longer Exists</h5>
          ) : (
            <h5 className="detail-content">Photos Still Loading</h5>
          )}
        </div>
      </div>
    );
  }
}

PhotoDetail.propTypes = {
  // PHOTOS
  all_photos: PropTypes.array.isRequired,
  all_photos_loaded: PropTypes.bool.isRequired,
  all_photos_loading: PropTypes.bool.isRequired,

  // TAGS
  all_tags: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  tags_loaded: PropTypes.bool.isRequired,
  tags_loading: PropTypes.bool.isRequired,

  // RELATIONS
  relations: PropTypes.array.isRequired,
  relations_loaded: PropTypes.bool.isRequired,
  relations_loading: PropTypes.bool.isRequired,
  fetchRelations: PropTypes.func.isRequired,

  // USERS
  users: PropTypes.array.isRequired,
  allUsersLoaded: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  all_photos: state.photos.all_photos,
  all_photos_loaded: state.photos.all_photos_loaded,
  all_photos_loading: state.photos.all_photos_loading,

  all_tags: state.tags.all_tags,
  tags: state.tags.tags,
  tags_loaded: state.tags.tags_loaded,
  tags_loading: state.tags.tags_loading,

  relations: state.tags.relations,
  relations_loaded: state.tags.relations_loaded,
  relations_loading: state.tags.relations_loading,

  users: state.users.users,
  allUsersLoaded: state.users.allUsersLoaded,
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      fetchRelations,
    },
  )(PhotoDetail),
);
