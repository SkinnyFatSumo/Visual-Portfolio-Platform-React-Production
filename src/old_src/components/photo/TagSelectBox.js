import React, {Component} from 'react';
import {Button, ButtonToolbar, Collapse} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import {groupByProperty} from '../support/helpers';

// ------------------------------------------------------------------------- //
//                             PHOTO GALLERY                                 //
// ------------------------------------------------------------------------- //
class TagSelectBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }
  render() {
    // CONTROL TOGGLE STATE OF THE TAG BOX
    const {isOpen} = this.state;

    // CREATE LISTS TO STORE ACTIVE VS. INACTIVE TAG BUTTONS
    var active = [
      /*
      <Button
        key="inactive"
        className="filter-title"
        id="active-title"
        variant="dark"
        size="sm">
        ACTIVE: &nbsp; &nbsp;
      </Button>,
      */
    ];
    var inactive = [
      /*
      <Button
        key="active"
        className="filter-title"
        id="inactive-title"
        variant="secondary"
        size="sm">
        INACTIVE:
      </Button>,
      */
    ];

    // STORE IDS OF ALL CURRENT PHOTOS BEING DISPLAYED
    const photo_ids = this.props.photos.map(photo => photo.id);
    // STORE ALL TAGS CONTAINED WITHIN THOSE PHOTOS IN A SET
    var related_photo_tag_ids = new Set();
    this.props.relations.forEach(relation => {
      if (photo_ids.includes(relation.photo)) {
        related_photo_tag_ids.add(relation.tag);
      }
    });

    // SET BUTTONS ACCORDING TO ACTIVE OR INACTIVE
    // IF INACTIVE SET BUTTON AS DISABLED IF NO CURRENT PHOTOS CONTAIN ITS TAG
    this.props.tags.forEach(tag => {
      if (tag.isActive) {
        active.push(
          <Button
            key={tag.id}
            className="active-tag"
            variant="dark-outline"
            id={tag.tagname}
            onClick={this.props.onTagClick}
            size="sm">
            {tag.tagname.toUpperCase()}
          </Button>,
        );
      } else {
        var isDisabled;
        related_photo_tag_ids.has(tag.id)
          ? (isDisabled = false)
          : (isDisabled = true);
        inactive.push(
          <Button
            key={tag.id}
            className="inactive-tag"
            variant="secondary-outline"
            disabled={isDisabled}
            id={tag.tagname}
            onClick={this.props.onTagClick}
            size="sm">
            {tag.tagname.toUpperCase()}
          </Button>,
        );
      }
    });
    // onClick={() => this.setState({isOpen: !isOpen})}

    return (
      <div className="collapse-tags-all">
        <Button
          id="tag-select-box-button"
          onClick={this.props.toggleOpen}
          aria-controls="collapse-tags-container"
          aria-expanded={this.props.isOpen}>
          {this.props.isOpen ? 'Hide Tags' : 'Filter By Tag'}
        </Button>
        <Collapse in={this.props.isOpen}>
          <div className="absolute-collapse-box">
            <div className="tag-select-container">
              <div className="collapse-tags-box" id="collapse-tags-active">
                <h6 className="tag-select-header">Active</h6>
                <ButtonToolbar className="tag-filter-toolbar" id="active-tags">
                  {active}
                </ButtonToolbar>
              </div>
              <div className="collapse-tags-box" id="collapse-tags-inactive">
                <h6 className="tag-select-header">Inactive</h6>
                <ButtonToolbar
                  className="tag-filter-toolbar"
                  id="inactive-tags">
                  {inactive}
                </ButtonToolbar>
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    );
  }
}

export default withRouter(TagSelectBox);
