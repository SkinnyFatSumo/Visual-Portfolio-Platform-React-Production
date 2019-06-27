// React
import React from 'react';

// React Router
import {withRouter} from 'react-router-dom';

// Components
import DisplayButtons from './DisplayButtons';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

// ------------------------------------------------------------------------- //
//         PRESENT DISPLAY NAVIGATION BUTTONS, CONDITIONALLY ACTIVE          //
// ------------------------------------------------------------------------- //

export function ButtonsOrDiscover(props) {
  return (
    <ButtonToolbar>
      <DisplayButtons
        handleClick={props.launchGallery}
        name="Gallery"
        active={props.active}
      />
      <DisplayButtons
        handleClick={props.launchGrid}
        name="Grid"
        active={props.active}
      />
      <DisplayButtons
        handleClick={props.launchTags}
        name="Tags"
        active={props.active}
      />
    </ButtonToolbar>
  );
}

export default withRouter(ButtonsOrDiscover);
