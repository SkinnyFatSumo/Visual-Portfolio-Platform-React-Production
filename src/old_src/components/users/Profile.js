import React, {Component} from 'react';

// React Router
import {withRouter} from 'react-router-dom';

/*
// Redux
import {connect} from 'react-redux';

// GET Requests for ALL photos/tags
import {setPhotos, fetchAllPhotos} from '../../actions/photoActions'; // async
import {
  fetchTags, // async
  setTags, // synchronous
  fetchRelations, // async
} from '../../actions/tagActions';

import PropTypes from 'prop-types';

import CreateOrEditPhoto from '../photo/CreateOrEditPhoto';
*/

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="centering-container">
        <div className="general-outer-container">
          <h5 style={{textAlign: 'center',  marginTop: '5px'}}>Under Construction</h5>
        </div>
      </div>
    );
  }
}

/*
Profile.propTypes = {
  // PHOTOS
  photos: PropTypes.array.isRequired,
  photos_loaded: PropTypes.bool.isRequired,
  all_photos_loaded: PropTypes.bool.isRequired,
  setPhotos: PropTypes.func.isRequired,
  fetchAllPhotos: PropTypes.func.isRequired,

  // TAGS
  tags: PropTypes.array.isRequired,
  tags_loaded: PropTypes.bool.isRequired,
  setTags: PropTypes.func.isRequired,
  fetchTags: PropTypes.func.isRequired,

  // RELATIONS
  relations: PropTypes.array.isRequired,
  relations_loaded: PropTypes.bool.isRequired,
  fetchRelations: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  photos: state.photos.photos,
  photos_loaded: state.photos.photos_loaded,
  all_photos_loaded: state.photos.all_photos_loaded,

  tags: state.tags.tags,
  tags_loaded: state.tags.tags_loaded,

  relations: state.tags.relations,
  relations_loaded: state.tags.relations_loaded,
});

export default withRouter(
  connect(
    mapStateToProps,
    {setPhotos, setTags, fetchTags, fetchRelations, fetchAllPhotos},
  )(Profile),
);
*/

export default withRouter(Profile);
