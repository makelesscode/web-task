import React from 'react';
import AudioListContainer from '../../containers/AudioListContainer';
import TooltipConnected from '../../containers/ConnectedTooltip';

function Page() {
  return (
    <>
      <div className="container">
        <h2>My Music</h2>
        <AudioListContainer />
      </div>
      <TooltipConnected />
    </>
  );
}

export default Page;
