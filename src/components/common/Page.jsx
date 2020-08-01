import React from 'react';
import AudioListContainer from '../../containers/AudioListContainer';
import TooltipConnected from '../../containers/ConnectedTooltip';

function Page() {
  return (
    <>
      <AudioListContainer />
      <TooltipConnected />
    </>
  );
}

export default Page;
