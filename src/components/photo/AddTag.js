import React, {Component} from 'react';
import {Button, Form, Collapse, Col} from 'react-bootstrap';
import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux';

// Actions
import {postTag} from '../../actions/tagActions';

class AddTag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      tagname: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    const tag = {
      tagname: this.state.tagname,
      owner: this.props.user.id,
    };
    this.props.postTag(tag);
    this.setState({tagname: ''});
  }

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  handleClickOutside = e => {
    if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
      this.setState({isOpen: false});
    }
  };

  toggleOpen = () => {this.setState({isOpen: !this.state.isOpen});}

  render() {
    const {isOpen, tagname} = this.state;
    return (
      <div ref={this.setWrapperRef} className="tag-add-box">
        <Button
          id="add-tag-toggle-button"
          onClick={this.toggleOpen}
          aria-controls="collapse-add-tag-box"
          aria-expanded={isOpen}>
          {isOpen ? 'Close' : 'Add Tag'}
        </Button>
        <Collapse in={isOpen}>
          <div className="absolute-collapse-box">
            <Form
              className="photo-or-tag-add-form"
              id="add-tag"
              onSubmit={this.onSubmit}>
              <Form.Control
                style={{textAlign: "center"}}
                autoComplete="off"
                type="text"
                name="tagname"
                placeholder="sample tag"
                onChange={this.onChange}
                required
                value={tagname}
              />
              <Button type="submit" block>
                Create Tag
              </Button>
            </Form>
          </div>
        </Collapse>
      </div>
    );
  }
}

AddTag.propTypes = {
  postTag: PropTypes.func.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(
  mapStateToProps,
  {postTag},
)(AddTag);
