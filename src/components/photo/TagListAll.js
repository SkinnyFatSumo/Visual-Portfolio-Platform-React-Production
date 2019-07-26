// React
// Core React, Router, and Redux modules
import React, {Component, render} from 'react';
import {Router, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

// React Components
import AddTag from './AddTag';
import FindTagByName from './FindTagByName';
import TagHasPhotos from './TagHasPhotos';
import TagHasNoPhotos from './TagHasNoPhotos';
import Loading from '../support/Loading';
import {rudRelation, rudTag} from '../../actions/tagActions';

// Helpers
import PropTypes from 'prop-types';
import {groupObjectsByProperty, validOwner} from '../support/helpers';

// React Bootstrap
import {ButtonToolbar, Form} from 'react-bootstrap';

// CSS
import '../../css/photo/taglistall.css';

// ------------------------------------------------------------------------- //
//                 LIST OF ALL TAGS AND RESPECTIVE THEIR PHOTOS              //
// ------------------------------------------------------------------------- //

class TagListAll extends Component {
  constructor(props) {
    super(props);
    this.state = {activeTag: null};
  }

  componentDidMount() {
    let state = this.props.location.state;
    if (
      state !== undefined &&
      state.target_tag !== undefined &&
      state.target_tag !== '' &&
      state.target_tag !== this.state.activeTag
    ) {
      this.setState({activeTag: state.target_tag});
    }
  }

  setActiveTag = e => {
    e.preventDefault();
    this.setState({activeTag: e.target.name});
  };

  unsetActiveTag = e => {
    e.preventDefault();
    this.setState({activeTag: null});
  };

  destroyTag = e => {
    e.preventDefault();
    this.props.rudTag(e.target.id, 'DELETE', this.props.match.params.username);
  };

  // RESTRUCTURE DATA FOR DISTRIBUTING PHOTOS BASED ON TAGS
  assignData = () => {
    var photos_object = {};
    this.props.all_photos.forEach(photo => {
      photos_object[photo.id] = photo;
    });

    // Group photo objects into new object who's keys are all the different
    // tags in relations, and who's values are the relations with said tag
    const grouped_by_tag = groupObjectsByProperty(this.props.relations, 'tag');
    var tag_array_with_photos = [];
    var tag_array_no_photos = this.props.all_tags.slice();

    for (const [key, value] of Object.entries(grouped_by_tag)) {
      // For each key/tag, store its photo objects with their owner id and
      // relation id
      var related_photos = [];
      value.forEach(relation_photo => {
        related_photos.push({
          photo_info: photos_object[relation_photo.photo],
          relation_id: relation_photo.id,
          owner: relation_photo.owner,
        });
      });

      // Sort the photos alphabetically by title name
      if (related_photos.length > 1) {
        related_photos.sort((a, b) => {
          var title_a = a.photo_info.title.toLowerCase();
          var title_b = b.photo_info.title.toLowerCase();
          if (title_a < title_b) return -1;
          if (title_a > title_b) return 1;
          return 0;
        });
      }

      // Store the photo info array along with the tagname and tag id into
      // a new array
      tag_array_with_photos.push({
        tagname: value[0].tagname,
        tag_id: value[0].tag,
        photos: related_photos,
      });
    }

    // Create array of unused tags (ones with no photos associated)
    //
    // TODO: THIS ISN'T VERY EFFICIENT: DOUBLE NESTED LOOP
    //
    for (let i = 0; i < tag_array_with_photos.length; i++) {
      tag_array_no_photos = tag_array_no_photos.filter(
        tag => tag.tagname !== tag_array_with_photos[i].tagname,
      );
    }

    // Sort alphabetically by tagname
    tag_array_with_photos.sort((a, b) => {
      if (a.tagname.toLowerCase() < b.tagname.toLowerCase()) return -1;
      if (a.tagname.toLowerCase() > b.tagname.toLowerCase()) return 1;
      return 0;
    });

    // CONVERT TO JSX LISTS
    const per_tag_with_photos = tag_array_with_photos.map(tag => (
      <TagHasPhotos
        activeTag={this.state.activeTag}
        all_photos={this.props.all_photos}
        destroyTag={this.destroyTag}
        id={tag.tagname + '-dropdown'}
        isAuthenticated={this.props.isAuthenticated}
        key={tag.tagname}
        photos={tag.photos}
        relations={this.props.relations}
        setActiveTag={this.setActiveTag}
        tag_id={tag.tag_id}
        tagname={tag.tagname}
        unsetActiveTag={this.unsetActiveTag}
        user={this.props.user}
      />
    ));

    const per_tag_no_photos = tag_array_no_photos.map(tag => (
      <TagHasNoPhotos
        activeTag={this.state.activeTag}
        all_photos={this.props.all_photos}
        destroyTag={this.destroyTag}
        isAuthenticated={this.props.isAuthenticated}
        key={tag.tagname}
        relations={this.props.relations}
        setActiveTag={this.setActiveTag}
        tag_id={tag.id}
        tagname={tag.tagname}
        unsetActiveTag={this.unsetActiveTag}
        user={this.props.user}
      />
    ));

    return (
      <div className="tag-container" id="tags-area">
        <div className="tag-container" id="tags-with-photos-container">
          <h4 id="tags-with-photos-header" className="header">
            {validOwner(this.props)
              ? 'Tags With Associated Photos'
              : 'All Tags'}
          </h4>
          <div id="tags-with-photos-body" className="body">
            {per_tag_with_photos}
          </div>
        </div>
        {per_tag_no_photos.length > 0 && validOwner(this.props) ? (
          <div className="tag-container" id="tags-no-photos-container">
            <h4 id="tags-without-photos-header" className="header">
              Tags Without Associated Photos
            </h4>

            <div id="tags-without-photos-body" className="body">
              {per_tag_no_photos}
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  render() {
    const {
      all_photos,
      all_photos_loaded,
      all_tags,
      all_tags_loaded,
    } = this.props;
    if (all_photos_loaded && all_tags_loaded) {
      if (all_tags.length === 0 && !validOwner(this.props)) {
        return (
          <div className="centering-container">
            <div className="general-outer-container">
              <h5 id="no-content">Sorry, looks like this user has no tags.</h5>
            </div>
          </div>
        );
      } else {
        return (
          <div className="centering-container">
            <div id="tag-view-content-container" className="content-container">
              <div className="toolbar-container">
                <ButtonToolbar className="tags-and-photo-toolbar">
                  {validOwner(this.props) ? <AddTag /> : null}
                  <FindTagByName setActiveTag={this.setActiveTag} />
                </ButtonToolbar>
              </div>
              <div id="all-tags-content-container">
                <Form id="all-tags-body-form">{this.assignData()}</Form>
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

TagListAll.propTypes = {
  // PHOTOS
  all_photos: PropTypes.array.isRequired,
  all_photos_loaded: PropTypes.bool.isRequired,

  // TAGS
  all_tags: PropTypes.array.isRequired,
  all_tags_loaded: PropTypes.bool.isRequired,

  // RELATIONS
  relations: PropTypes.array.isRequired,
  relations_loaded: PropTypes.bool.isRequired,
  rudRelation: PropTypes.func.isRequired,
  rudTag: PropTypes.func.isRequired,

  // USER
  user: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  all_photos: state.photos.all_photos,
  all_photos_loaded: state.photos.all_photos_loaded,

  all_tags: state.tags.all_tags,
  all_tags_loaded: state.tags.all_tags_loaded,

  tags: state.tags.tags,

  relations: state.tags.relations,
  relations_loaded: state.tags.relations_loaded,

  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});

export default withRouter(
  connect(
    mapStateToProps,
    {rudRelation, rudTag},
  )(TagListAll),
);
