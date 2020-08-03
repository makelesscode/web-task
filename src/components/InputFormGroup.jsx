import React from 'react';
import PropTypes from 'prop-types';

function InputFormGroup(props) {
  const { name, children } = props;
  return (
    <div className="form-group">
      <strong className="d-block">{name}</strong>
      {children}
    </div>
  );
}

InputFormGroup.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default InputFormGroup;
