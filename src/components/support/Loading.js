import React, {Component} from 'react';
import {BounceLoader as Loader} from 'halogenium';

function Loading(props) {
  return (
    <div style={{textAlign: 'center'}}>
      <div style={{textAlign: 'center'}}>
        <Loader
          style={{display: 'inline-block', margin: '50px -10px 0px 0px'}}
          loading={true}
          color="rgba(219, 219, 219, 1)"
          size="30px"
          margin="4px"
        />
        <Loader
          style={{display: 'inline-block', margin: '50px 0px 0px 0px'}}
          loading={true}
          color="white"
          size="30px"
          margin="4px"
        />
        <Loader
          style={{display: 'inline-block', margin: '50px 0px 0px -10px'}}
          loading={true}
          color="rgba(219, 219, 219, 1)"
          size="30px"
          margin="4px"
        />
      </div>
      <h6 style={{display: 'inline-block', color: '#d9d9d9'}}>loading...</h6>
    </div>
  );
}

export default Loading;
