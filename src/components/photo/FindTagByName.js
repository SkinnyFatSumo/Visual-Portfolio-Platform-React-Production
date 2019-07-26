import React, {Component} from 'react';
import {Button, Form, Collapse, Col} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux';

// Hash Link
import {HashLink as Link} from 'react-router-hash-link';

// Actions
import {postRelation} from '../../actions/tagActions';

class FindTagByName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagname: '',
      isOpen: false,
    };

    this.onChange = this.onChange.bind(this);
    this.clearState = this.clearState.bind(this);
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

  preventSubmit = e=> e.preventDefault();

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  clearState = e => {
    e.preventDefault();
    this.setState({tagname: ''});
  };

  render() {
    // Get all tags that are in use
    var associated_tags = new Set();
    this.props.relations.forEach(relation =>
      associated_tags.add(relation.tagname),
    );
    console.log('arrayified', [...associated_tags]);
    const go_to_tag_buttons = [...associated_tags]
      .filter(tagname =>
        tagname.toLowerCase().includes(this.state.tagname.toLowerCase()),
      )
      .sort((a, b) => {
        var tagname_a = a.toLowerCase();
        var tagname_b = b.toLowerCase();
        if (tagname_a < tagname_b) {
          return -1;
        }
        if (tagname_a > tagname_b) {
          return 1;
        }
        return 0;
      })
      .map(remaining_tag => (
        <Link
          to={
            '/user/' +
            this.props.match.params.username +
            '/tags#' +
            remaining_tag +
            '-dropdown'
          }
          onClick={this.props.setActiveTag}
          name={remaining_tag}>
          <Button name={remaining_tag} id={remaining_tag}>
            {remaining_tag.toUpperCase()}
          </Button>
        </Link>
      ));

    return (
      <div ref={this.setWrapperRef}>
        <Button
          id="search-tag-toggle-button"
          onClick={this.toggleOpen}
          aria-controls="collapse-search-tag-box"
          aria-expanded={this.state.isOpen}>
          {this.props.isOpen ? 'Close' : 'Go to Tag'}
        </Button>
        <Collapse in={this.state.isOpen}>
          <div className="absolute-collapse-box">
            <Form
              onSubmit={this.preventSubmit}
              className="photo-or-tag-add-form"
              id="find-tag">
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Control
                    autoComplete="off"
                    type="text"
                    name="tagname"
                    placeholder="find a tag"
                    onChange={this.onChange}
                    required
                    value={this.state.tagname}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <div id="go-to-tag-container">
                  {go_to_tag_buttons.length > 0 ? (
                    go_to_tag_buttons
                  ) : (
                    <h6>no matches</h6>
                  )}
                </div>
              </Form.Row>
            </Form>
          </div>
        </Collapse>
      </div>
    );
  }
}

FindTagByName.propTypes = {
  postRelation: PropTypes.func.isRequired,
  relations: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  relations: state.tags.relations,
});

export default withRouter(
  connect(
    mapStateToProps,
    {postRelation},
  )(FindTagByName),
);
