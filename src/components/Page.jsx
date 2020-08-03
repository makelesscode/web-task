import React from 'react';
import AudioListContainer from '../containers/AudioListContainer';
import ConnectedTooltip from '../containers/ConnectedTooltip';
import UploaderModal from '../containers/UploaderModal';
import SimilarArtistsModal from '../containers/SimilarArtistsModal';
import Navbar from './Navbar';

function Page() {
  return (
    <>
      <Navbar />
      <AudioListContainer />
      <ConnectedTooltip />
      <UploaderModal />
      <SimilarArtistsModal />
    </>
  );
}

export default Page;
