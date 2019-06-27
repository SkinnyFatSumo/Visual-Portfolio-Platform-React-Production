import React from 'react';
import {Button} from 'react-bootstrap';
import {Card} from 'react-bootstrap';

// ------------------------------------------------------------------------- //
//                               BUTTONS MENU                                //
// ------------------------------------------------------------------------- //

const DisplayButtons = props => {
  var handleClick;
  var active;
  props.active ? (handleClick = props.handleClick) : (handleClick = null);

  return (
    <Button onClick={handleClick} size="lg" className={active}>
      {props.name.toUpperCase()}
    </Button>
  );
};

export default DisplayButtons;
