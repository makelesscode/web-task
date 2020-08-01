import React from 'react';
import AudioListContainer from '../../containers/AudioListContainer';

class Page extends React.Component {
    render() {
        return (<div className="container">
            <h2>My Music</h2>
            <AudioListContainer />
        </div>);
    }
}

export default Page;