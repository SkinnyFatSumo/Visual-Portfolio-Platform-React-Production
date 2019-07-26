import React, {Component} from 'react';
import {Button, ButtonToolbar, Col, Collapse, Row} from 'react-bootstrap';
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

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  handleClickOutside = e => {
    if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
      this.setState({isOpen: false});
    }
  };

  toggleOpen = () => {
    this.setState({isOpen: !this.state.isOpen});
  };

  render() {
    // CONTROL TOGGLE STATE OF THE TAG BOX
    const {isOpen} = this.state;

    // CREATE LISTS TO STORE ACTIVE VS. INACTIVE TAG BUTTONS
    var active = [];
    var inactive = [];

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
    const a_l = active.length;
    const i_l = inactive.length;

    return (
      <div ref={this.setWrapperRef}>
        <Button
          id="tag-select-box-button"
          onClick={this.toggleOpen}
          aria-controls="collapse-tags-container"
          aria-expanded={isOpen}>
          {isOpen ? 'Hide Tags' : 'Filter By Tag'}
        </Button>
        <Collapse in={isOpen}>
          <div className="absolute-collapse-box">
            <div className="tag-select-container">
              <Row>
                {i_l === 0 && a_l === 0 ? (
                  <Col>
                    <h6 style={{textAlign: 'center', marginBottom: "-1px"}}>No Tags to Display</h6>
                  </Col>
                ) : null}
                {i_l === 0 ? null : (
                  <Col xs={12} sm={a_l === 0 ? 12 : 6}>
                    <div
                      className="collapse-tags-box"
                      id="collapse-tags-inactive">
                      <h6 className="tag-select-header">Inactive</h6>
                      <ButtonToolbar
                        className="tag-filter-toolbar"
                        id="inactive-tags">
                        {inactive}
                      </ButtonToolbar>
                    </div>
                  </Col>
                )}
                {a_l === 0 ? null : (
                  <Col xs={12} sm={i_l === 0 ? 12 : 6}>
                    <div
                      className="collapse-tags-box"
                      id="collapse-tags-active">
                      <h6 className="tag-select-header">Active</h6>
                      <ButtonToolbar
                        className="tag-filter-toolbar"
                        id="active-tags">
                        {active}
                      </ButtonToolbar>
                    </div>
                  </Col>
                )}
              </Row>
            </div>
          </div>
        </Collapse>
      </div>
    );
  }
}

export default withRouter(TagSelectBox);
