import React, {Component} from 'react';
import {
  Button,
  ButtonGroup,
  Form,
  Collapse,
  Col,
  ButtonToolbar,
} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';

import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux';

// Actions
import {postRelation, rudRelation} from '../../actions/tagActions';

import {validOwner} from '../support/helpers';

class AddRelationDefaultPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      add_tagname: '',
      del_tagname: '',
      isOpen: false,
    };
    this.onChange = this.onChange.bind(this);
    this.addRelation = this.addRelation.bind(this);
    this.delRelation = this.delRelation.bind(this);
    this.launchTagView = this.launchTagView.bind(this);
    this.filterOutput = this.filterOutput.bind(this);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  prepTags = (tags, option_type, tagname) => {
    const prepped_tags = tags
      .filter(tag => tag.tagname.toLowerCase().includes(tagname.toLowerCase()))
      .sort((a, b) => {
        var tagname_a = a.tagname.toLowerCase();
        var tagname_b = b.tagname.toLowerCase();
        if (tagname_a < tagname_b) {
          return -1;
        }
        if (tagname_a > tagname_b) {
          return 1;
        }
        return 0;
      })
      .map(remaining_tag => (
        <ButtonGroup key={remaining_tag.id} className="photo-button-group">
          <Button
            id={remaining_tag.id}
            name={remaining_tag.tagname}
            onClick={this.launchTagView}>
            {remaining_tag.tagname.toUpperCase()}
          </Button>
          <Button
            className={option_type}
            id={remaining_tag.id}
            name={remaining_tag.tagname}
            onClick={
              option_type === 'add-button' ? this.addRelation : this.delRelation
            }
          />
        </ButtonGroup>
      ));
    return prepped_tags;
  };

  addRelation(e) {
    e.preventDefault();
    const relation = {
      photo: this.props.photo_id,
      tag: parseInt(e.target.id),
      owner: this.props.user.id,
      tagname: this.props.tagname,
    };
    this.props.postRelation(relation);
    this.setState({add_tagname: ''});
  }

  delRelation(e) {
    e.preventDefault();
    this.props.rudRelation(e.target.id, 'DELETE', 'destroy');
  }

  launchTagView(e) {
    e.preventDefault();
    const tagname = e.target.name;
    this.props.history.push(
      '/user/' + this.props.match.params.username + '/tags#' + e.target.name,
      {target_tag: tagname},
    );
  }

  filterOutput(tag_buttons) {
    if (tag_buttons.length > 0) {
      return tag_buttons;
    } else {
      return <h6 style={{marginTop: '13px'}}>no matches</h6>;
    }
  }

  render() {
    const {relations, all_tags, photo_id} = this.props;
    const {add_tagname, del_tagname, isOpen} = this.state;

    const pre_related_tags = relations.filter(
      relation => relation.photo === photo_id,
    );
    var unrelated_tags = all_tags.slice();
    var related_tags = [];

    pre_related_tags.forEach(pre_rel_tag => {
      unrelated_tags = unrelated_tags.filter(
        un_tag => un_tag.id !== pre_rel_tag.tag,
      );
      related_tags.push({
        tagname: all_tags.find(tag => tag.id === pre_rel_tag.tag).tagname,
        // THIS ID IS THE RELATION'S ID, NOT THE TAG'S ID
        id: pre_rel_tag.id,
      });
    });

    // for every relation, append the tag associated with it

    console.log('related_tags', related_tags);

    const unrelated_tag_buttons = this.prepTags(
      unrelated_tags,
      'add-button',
      add_tagname,
    );
    const related_tag_buttons = this.prepTags(
      related_tags,
      'remove-button',
      del_tagname,
    );

    return (
      <Form className="photo-or-tag-add-form">
        {all_tags.length === 0 ? (
          <Form.Row>
            <h5>User has no tags</h5>
          </Form.Row>
        ) : (
          <div>
            <Form.Label>Associated Tags</Form.Label>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Control
                  className="search-box"
                  autoComplete="off"
                  type="text"
                  name="add_tagname"
                  placeholder="add"
                  onChange={this.onChange}
                  required
                  value={add_tagname}
                />
                <Form.Row id="add-tag-row">
                  {this.filterOutput(unrelated_tag_buttons)}
                </Form.Row>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Control
                  className="search-box"
                  autoComplete="off"
                  type="text"
                  name="del_tagname"
                  placeholder="remove"
                  onChange={this.onChange}
                  required
                  value={del_tagname}
                />
                <Form.Row id="delete-tag-row">
                  {this.filterOutput(related_tag_buttons)}
                </Form.Row>
              </Form.Group>
            </Form.Row>
          </div>
        )}
      </Form>
    );
  }
}
AddRelationDefaultPhoto.propTypes = {
  // TAGS
  tags: PropTypes.array.isRequired,
  tags_loaded: PropTypes.bool.isRequired,
  all_tags: PropTypes.array.isRequired,
  all_tags_loaded: PropTypes.bool.isRequired,

  // RELATIONS
  relations: PropTypes.array.isRequired,
  relations_loaded: PropTypes.bool.isRequired,
  rudRelation: PropTypes.func.isRequired,

  // USER
  user: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  all_photos: state.photos.all_photos,
  all_photos_loaded: state.photos.all_photos_loaded,

  tags: state.tags.tags,
  tags_loaded: state.all_tags_loaded,
  all_tags: state.tags.all_tags,
  all_tags_loaded: state.all_tags_loaded,

  relations: state.tags.relations,
  relations_loaded: state.tags.relations_loaded,
  postRelation: PropTypes.func.isRequired,

  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});

export default withRouter(
  connect(
    mapStateToProps,
    {postRelation, rudRelation},
  )(AddRelationDefaultPhoto),
);
