import React from 'react';
import AudioListContainer from '../../containers/AudioListContainer';
import TooltipConnected from '../../containers/ConnectedTooltip';
import Navbar from '../Navbar';

function Page() {
  return (
    <>
      <Navbar />
      <AudioListContainer />
      <TooltipConnected />
    </>
  );
}

export default Page;
