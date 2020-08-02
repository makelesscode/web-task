import React from 'react';
import PropTypes from 'prop-types';

class InputField extends React.Component {
  constructor(props) {
    super(props);
    const { value } = this.props;
    this.state = {
      value,
    };
  }

  onChange(evt) {
    this.setState({
      value: evt.target.value,
    });
  }

  render() {
    const { type, className } = this.props;
    const { value } = this.state;
    return (
      <input type={type} value={value} className={className} />
    );
  }
}

InputField.propTypes = {
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};

InputField.defaultProps = {
  type: 'text',
  value: '',
  className: 'form-control',
};

export default InputField;
