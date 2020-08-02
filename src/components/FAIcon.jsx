/**
 * Filebox dashboard frontend

 */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

function FontAwesomeIcon(props) {
  const {
    icon, prefix, className, spin,
  } = props;
  return (
    <i
      className={cx(
        prefix,
        `fa-${icon}`,
        className,
        spin && 'fa-spin',
      )}
      aria-hidden="true"
    />
  );
}

FontAwesomeIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  className: PropTypes.string,
  prefix: PropTypes.string,
  spin: PropTypes.bool,
};
FontAwesomeIcon.defaultProps = {
  className: '',
  spin: false,
  prefix: 'fas',
};

export default FontAwesomeIcon;
