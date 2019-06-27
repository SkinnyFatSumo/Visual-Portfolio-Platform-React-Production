import React, {Component} from 'react';
import {Button, ButtonGroup, Form, Collapse, Col} from 'react-bootstrap';
import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux';

// Actions
import {postRelation} from '../../actions/tagActions';

class RUDRelationDefaultTag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo_title: '',
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
    
    const photo_buttons = this.props.unassociated_photos
      .filter(photo =>
        photo.title
          .toLowerCase()
          .includes(this.state.photo_title.toLowerCase()),
      )
      .map(remaining_photo => (
        <ButtonGroup key={remaining_photo.id} className='new-tag-button-group'>
          <Button disabled>{remaining_photo.title.toUpperCase()}</Button>
          <Button>VIEW</Button>
          <Button>SELECT</Button>
        </ButtonGroup>
      ));
    
    return (
      <div className="relations-box">
        <div id="collapse-tag-box">
          <Form onSubmit={this.onSubmit}>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Control
                  type="text"
                  name="photo_title"
                  placeholder="search photo by title"
                  onChange={this.onChange}
                  required
                  value={this.state.photo_title}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <div>
                <h3>{photo_buttons}</h3>
              </div>
            </Form.Row>
          </Form>
        </div>
      </div>
    );
  }
}

AddRelationDefaultTag.propTypes = {
  postTag: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(
  mapStateToProps,
  {postRelation},
)(AddRelationDefaultTag);
