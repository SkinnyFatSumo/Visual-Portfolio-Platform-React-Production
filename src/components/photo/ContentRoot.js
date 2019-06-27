// React
import React, {Component, Fragment} from 'react';

// React Router
import {withRouter} from 'react-router-dom';

// Redux
import {connect} from 'react-redux';

// Actions
import {setPhotos, fetchAllPhotos} from '../../actions/photoActions';
import {fetchRelations, fetchTags, setTags} from '../../actions/tagActions';

// Photo/Tag Components
import CreateOrEditPhoto from './CreateOrEditPhoto';
import DisplayButtons from './DisplayButtons';
import TagSelectBox from './TagSelectBox';

// Other Components
import DiscoverUsers from '../users/DiscoverUsers';

// Helpers
import {stringOfTags, validOwner} from '../support/helpers';

// PropTypes
import PropTypes from 'prop-types';

// React Bootstrap
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import '../../css/photo/contentroot.css';

// ------------------------------------------------------------------------- //
//                 ROOT COMPONENT FOR ALL --PHOTO-- MATERIAL                 //
// ------------------------------------------------------------------------- //

class ContentRoot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // options are: photo, gallery, grid, tag
      activeDisplay: null,
      viewed_user: null,
      viewTagsActive: false,
      createOrEditPhotoActive: false,
    };
    /*
    this.launchProfileView = this.launchProfileView.bind(this);
    this.launchGalleryView = this.launchGalleryView.bind(this);
    this.launchGridView = this.launchGridView.bind(this);
    this.launchTagsView = this.launchTagsView.bind(this);
    this.handleTagClick = this.handleTagClick.bind(this);
    this.handlePhotoVsTags = this.handlePhotoVsTags.bind(this);
    */ 
  }

  // ------------------
  // Component Mounting
  // ------------------

  isSameViewedUser(username, viewed_user) {
    return username === viewed_user;
  }

  newUserExists(username, users) {
    return users.some(user => user.username === username);
  }

  initializeUserContent() {
    const {username} = this.props.match.params;
    const {
      fetchAllPhotos,
      fetchRelations,
      fetchTags,
      history,
      users,
    } = this.props;
    const {viewed_user} = this.state;
    if (!this.isSameViewedUser(username, viewed_user)) {
      if (!this.newUserExists(username, users)) {
        history.push('/bad-url/user-does-not-exist');
      } else {
        this.setState({viewed_user: username});
        fetchRelations(username);
        fetchTags(username);
        fetchAllPhotos(username);
        // this.props.fetchUserInfo
        return true;
      }
    }
    return false;
  }

  validateDisplay(display, activeDisplay) {
    if (display !== activeDisplay) {
      ['profile', 'gallery', 'grid', 'tags', 'detail'].includes(display)
        ? this.setState({activeDisplay: display})
        : this.props.history.push('/bad-url/invalid-display-type');
    }
  }

  // ------------------
  // COMPONENT MOUNTING
  // ------------------

  componentDidMount() {
    const {allUsersLoaded} = this.props;
    const {display} = this.props.match.params;
    const {activeDisplay} = this.state;

    this.validateDisplay(display, activeDisplay);
    if (allUsersLoaded) this.initializeUserContent();
  }

  // ------------------
  // Component Updating
  // ------------------

  componentDidUpdate(prevProps) {
    // STORE ALL VARIABLES NEEDED FROM URL PARAMS AND PROPS
    const {username, display, urltags} = this.props.match.params;
    const {activeDisplay, viewed_user} = this.state;
    const {
      all_photos_loaded,
      all_photos_loading,
      allUsersLoaded,
      history,
      photos_loaded,
      photos_loading,
      photos,
      relations,
      relations_loaded,
      relations_loading,
      setPhotos,
      setTags,
      tags,
      tags_loaded,
      tags_loading,
      users,
    } = this.props;

    // INSURE DISPLAY TYPE IS VALID - SET STATE OR REDIRECT
    this.validateDisplay(display, activeDisplay);

    // INSURE INITIAL LOADING OF USER BEFORE MORE SPECIFIC CHECKS
    if (allUsersLoaded) {
      var activating_new_user = this.initializeUserContent();
      // CATCH UPDATES OF TAGS, PHOTOS, AND RELATIONS FROM DISPATCHES
      // AND UPDATE ACCORDINGLY
      if (allUsersLoaded && !activating_new_user) {
        if (!tags_loaded && !tags_loading) {
          this.props.fetchTags(username);
        }
        if (!all_photos_loaded && !all_photos_loading) {
          this.props.fetchAllPhotos(username);
        }
        if (!relations_loaded && !relations_loading) {
          this.props.fetchRelations(username);
        }
      }
    }
    // LOAD ACTIVE PHOTOS ONCE ALL TAGS AND ALL PHOTOS ARE LOADED
    if (tags_loaded && all_photos_loaded && !photos_loaded && !photos_loading) {
      // IF NO URL TAGS, LOAD ALL USER'S PHOTOS
      if (urltags === undefined || display === 'detail') {
        setPhotos(username, '');
        // OTHERWISE SET TAGS BASED ON TAGS IN URL
      } else {
        var tagnames = urltags.split(',');
        tagnames.forEach(tagname => setTags(tagname, tags));
        setPhotos(username, urltags);
      }
    }
  }

  // --------------
  // Event Handlers
  // --------------

  handlePhotoVsTags = event => {
    if (event.target.id === 'add-photo-toggle-button') {
      if (this.state.viewTagsActive) {
        this.setState({viewTagsActive: false});
      }
      this.setState({
        createOrEditPhotoActive: !this.state.createOrEditPhotoActive,
      });
    } else if (event.target.id === 'tag-select-box-button') {
      if (this.state.createOrEditPhotoActive) {
        this.setState({createOrEditPhotoActive: false});
      }
      this.setState({viewTagsActive: !this.state.viewTagsActive});
    }
  };

  handleTagClick = event => {
    event.preventDefault();
    const {username, display} = this.props.match.params;
    const {history, tags, setTags, setPhotos} = this.props;
    // SET TAGS BASED ON THE TAG CLICKED
    setTags(event.target.id, tags);
    // GET NEW TAG STRING BASED ON UPDATED LIST OF ACTIVE TAGS
    const string_for_url = stringOfTags(tags);
    // THEN GET PHOTOS BASED ON UPDATED TAG URL
    setPhotos(username, string_for_url);
    // PUSH TO NEW URL WITH UPDATED TAGS
    console.log('handle tag click username is', username);
    history.push('/user/' + username + '/' + display + '/' + string_for_url);
  };

  // --------------
  // VIEW LAUNCHERS
  // --------------

  launchGalleryView = () => {
    //  PUSH TO GALLERY VIEW
    this.props.history.push(
      '/user/' +
        this.props.match.params.username +
        '/gallery/' +
        stringOfTags(this.props.tags),
    );
  };

  launchGridView = () => {
    // PUSH TO GRID VIEW
    this.props.history.push(
      '/user/' +
        this.props.match.params.username +
        '/grid/' +
        stringOfTags(this.props.tags),
    );
  };

  launchTagsView = () => {
    // PUSH TO TAGS VIEW
    this.props.history.push(
      '/user/' + this.props.match.params.username + '/tags',
    );
  };

  launchProfileView = () => {
    // PUSH TO PROFILE VIEW
    this.props.history.push(
      '/user/' + this.props.match.params.username + '/profile/',
    );
  };

  // -------------------
  // Component Rendering
  // -------------------

  render() {
    // STORE DISPLAY TYPE, BECAUSE WE WILL ONLY SHOW TAG SELECT BOX FOR
    // GRID AND GALLERY VIEWS
    const {display} = this.props.match.params;
    const {createOrEditPhotoActive, isOpen} = this.state;
    const {
      all_photos,
      all_photos_loaded,
      allUsersLoaded,
      photos,
      photos_loaded,
      relations,
      tags,
    } = this.props;

    // ONLY ACTIVATE NAVIGATION BUTTONS IF PHOTOS ARE LOADED
    var active;
    photos_loaded ? (active = true) : (active = false);

    return (
      <div id="main-toolbars-container">
        <div className="toolbar-container">
          <ButtonToolbar className="display-options-toolbar">
            <DisplayButtons
              handleClick={this.launchProfileView}
              name="Profile"
              active={active}
            />
            <DisplayButtons
              handleClick={this.launchGalleryView}
              name="Gallery"
              active={active}
            />
            <DisplayButtons
              handleClick={this.launchGridView}
              name="&nbsp; Grid &nbsp;"
              active={active}
            />
            <DisplayButtons
              handleClick={this.launchTagsView}
              name="&nbsp; Tags &nbsp;"
              active={active}
            />
          </ButtonToolbar>
        </div>
        <br />
        {display === 'grid' || display === 'gallery' ? (
          <div className="toolbar-container">
            <ButtonToolbar className="tags-and-photo-toolbar">
              <TagSelectBox
                photos={this.props.photos}
                relations={this.props.relations}
                tags={this.props.tags}
                onTagClick={this.handleTagClick}
                isOpen={this.state.viewTagsActive}
                toggleOpen={this.handlePhotoVsTags}
              />
              {validOwner(this.props) ? (
                <CreateOrEditPhoto
                  isOpen={this.state.createOrEditPhotoActive}
                  toggleOpen={this.handlePhotoVsTags}
                  action="create"
                />
              ) : null}
            </ButtonToolbar>
          </div>
        ) : null}
      </div>
    );
  }
}

ContentRoot.propTypes = {
  // PHOTOS
  photos: PropTypes.array.isRequired,
  all_photos: PropTypes.array.isRequired,
  photos_loaded: PropTypes.bool.isRequired,
  photos_loading: PropTypes.bool.isRequired,
  all_photos_loaded: PropTypes.bool.isRequired,
  all_photos_loading: PropTypes.bool.isRequired,
  setPhotos: PropTypes.func.isRequired,
  fetchAllPhotos: PropTypes.func.isRequired,

  // TAGS
  tags: PropTypes.array.isRequired,
  tags_loaded: PropTypes.bool.isRequired,
  tags_loading: PropTypes.bool.isRequired,
  setTags: PropTypes.func.isRequired,
  fetchTags: PropTypes.func.isRequired,

  // RELATIONS
  relations: PropTypes.array.isRequired,
  relations_loaded: PropTypes.bool.isRequired,
  relations_loading: PropTypes.bool.isRequired,
  fetchRelations: PropTypes.func.isRequired,

  // USERS
  users: PropTypes.array,
  allUsersLoaded: PropTypes.bool.isRequired,

  // AUTHENTICATED USER
  user: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  photos: state.photos.photos,
  all_photos: state.photos.all_photos,
  photos_loaded: state.photos.photos_loaded,
  photos_loading: state.photos.photos_loading,
  all_photos_loaded: state.photos.all_photos_loaded,
  all_photos_loading: state.photos.all_photos_loading,

  tags: state.tags.tags,
  tags_loaded: state.tags.tags_loaded,
  tags_loading: state.tags.tags_loading,

  relations: state.tags.relations,
  relations_loaded: state.tags.relations_loaded,
  relations_loading: state.tags.relations_loading,

  users: state.users.users,
  allUsersLoaded: state.users.allUsersLoaded,

  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      setPhotos,
      setTags,
      fetchTags,
      fetchRelations,
      fetchAllPhotos,
    },
  )(ContentRoot),
);
