import React from 'react';
import PropTypes from 'prop-types';
import ArtistListItem from './ArtistListItem';

function ArtistList({ children }) {
  if (children.length === 0) {
    return (<p className="lead">No artists found.</p>);
  }
  return (
    <div className="list-group">
      {children.map((child) => (
        <ArtistListItem
          name={child.name}
          url={child.url}
          image={child.image[0]['#text']}
          key={child.mbid}
        />
      ))}
    </div>
  );
}

ArtistList.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    image: PropTypes.arrayOf(PropTypes.shape({
      '#text': PropTypes.string.isRequired,
      size: PropTypes.string.isRequired,
    })),
    mbid: PropTypes.string.isRequired,
    hash: PropTypes.string.isRequired,
    style: PropTypes.string,
  })).isRequired,
};

export default ArtistList;
