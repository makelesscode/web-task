import React from 'react';
import AudioListContainer from '../../containers/AudioListContainer';
import ConnectedTooltip from '../../containers/ConnectedTooltip';
import ConnectedUploaderModal from '../../containers/ConnectedUploaderModal';
import Navbar from '../Navbar';

function Page() {
  return (
    <>
      <Navbar />
      <AudioListContainer />
      <ConnectedTooltip />
      <ConnectedUploaderModal />
    </>
  );
}

export default Page;
