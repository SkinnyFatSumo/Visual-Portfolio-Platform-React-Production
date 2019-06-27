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
      tagname: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
  }

  render() {
    const {isOpen, toggleOpen} = this.props;
    const {title} = this.state;
    return (
      <div className="tag-add-box">
        <Button
          id="add-tag-toggle-button"
          onClick={toggleOpen}
          aria-controls="collapse-add-tag-box"
          aria-expanded={isOpen}>
          {isOpen ? 'Close' : 'Add Tag'}
        </Button>
        <Collapse in={isOpen}>
          <div className="absolute-collapse-box">
            <Form className="photo-or-tag-add-form" id="add-tag" onSubmit={this.onSubmit}>
              <Form.Control
                autoComplete="off"
                type="text"
                name="tagname"
                placeholder="sample tag"
                onChange={this.onChange}
                required
                value={title}
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
