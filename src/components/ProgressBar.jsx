import React from 'react';
import PropTypes from 'prop-types';

function ProgressBar(props) {
  const { total, now } = props;
  const percent = (now / total) * 100;
  return (
    <div className="progress">
      <div
        className="progress-bar"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

ProgressBar.propTypes = {
  total: PropTypes.number.isRequired,
  now: PropTypes.number.isRequired,
};

export default ProgressBar;
