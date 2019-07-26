import React, {Component} from 'react';
import {Button, ButtonToolbar, Form, Collapse, Col} from 'react-bootstrap';
import PropTypes from 'prop-types';

function DeleteButton(props) {
  if (props.confirm) {
    return (
      <Button>
        <ButtonToolbar>
          <Button
            onClick={(e) => {
              props.deletePhoto();
              props.toggleConfirm();
            }}>
            Y 
          </Button>
          <Button onClick={props.toggleConfirm}>No</Button>
        </ButtonToolbar>
      </Button>
    );
  } else {
    return <Button onClick={props.toggleConfirm}>Delete Photo</Button>;
  }
}

export default DeleteButton;
