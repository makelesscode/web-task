import React from 'react';
import PropTypes from 'prop-types';

function ArtistListItem(props) {
  const { name, url, image } = props;
  return (
    <a href={url} className="list-group-item list-group-item-action">
      <img src={image} alt="" />
      <span className="ml-2">{name}</span>
    </a>
  );
}

ArtistListItem.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  image: PropTypes.arrayOf(PropTypes.shape({
    '#text': PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
  })).isRequired,
};

export default ArtistListItem;
