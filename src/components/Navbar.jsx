import React from 'react';
import FAIcon from './FAIcon';
import store from '../helpers/store';
import { show } from '../actions/uploader';

function openUploader() {
  store.dispatch(show());
}

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <div className="container">
        <span className="navbar-brand" href="#">
          <FAIcon icon="music" />
          {' '}
          Music App
        </span>
        <button className="navbar-toggler" type="button" aria-label="Toggle navigation">
          <FAIcon icon="bars" />
        </button>
        <div className="collapse navbar-collapse">
          <div className="ml-auto">
            <button className="btn btn-outline-light my-2 my-sm-0" type="button" onClick={openUploader}>Upload</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
