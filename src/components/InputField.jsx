import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class InputField extends React.Component {
  constructor(props) {
    super(props);
    const { value } = this.props;
    this.onChange = this.onChange.bind(this);
    this.state = {
      value,
    };
  }

  onChange(evt) {
    const { onChange } = this.props;
    this.setState({
      value: evt.target.value,
    });
    onChange(evt.target.value);
  }

  render() {
    const { type, className, ...restProps } = this.props;
    const { value } = this.state;
    return (
      // eslint-disable-next-line
      <input {...restProps} className={cx('form-control', className)} type={type} value={value} onChange={this.onChange} />
    );
  }
}

InputField.propTypes = {
  onChange: PropTypes.func.isRequired,
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
