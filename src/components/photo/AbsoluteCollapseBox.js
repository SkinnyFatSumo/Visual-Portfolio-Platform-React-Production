import React, {Component} from 'react';
import {Button, Collapse} from 'react-bootstrap';
import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux';

// Actions
import {rudPhoto, postPhoto} from '../../actions/photoActions';

class AbsoluteCollapseBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.buttonBreakout = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = e => {
    if (
      this.buttonBreakout.current &&
      !this.buttonBreakout.current.contains(e.target)
    ) {
      this.setState({isOpen: false});
    }
  };

  toggleOpen = () => {
    this.setState({isOpen: !this.state.isOpen});
  };

  render() {
    const {isOpen} = this.state;
    const {action} = this.props;
    var openName, closeName, photo_button_id;

    if (action === 'info') {
      openName = 'Show Details';
      closeName = 'Hide Details';
      photo_button_id = 'edit-photo-toggle-button';
    } else if (action === 'edit') {
      openName = 'Edit';
      closeName = 'Finish';
      photo_button_id = 'edit-photo-toggle-button';
    } else if (action === 'create') {
      openName = 'Add Photo';
      closeName = 'Done Adding';
      photo_button_id = 'add-photo-toggle-button';
    }

    return (
      <div ref={this.buttonBreakout}>
        <Button
          id={photo_button_id}
          onClick={this.toggleOpen}
          aria-controls="absolute-collapse-box"
          aria-expanded={isOpen}>
          {isOpen ? closeName : openName}
        </Button>
        <Collapse in={isOpen}>
          <div className="absolute-collapse-box">{this.props.children}</div>
        </Collapse>
      </div>
    );
  }
}

export default AbsoluteCollapseBox;
