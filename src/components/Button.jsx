import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

function Button(props) {
  const {
    component: Component,
    children,
    className,
    onClick,
    type,
    outline,
    size,
  } = props;
  return (
    <Component
      className={cx(
        'btn',
        `btn-${(outline ? 'outline-' : '') + type}`,
        size && `btn-${size}`,
        className,
      )}
      onClick={onClick}
    >
      {children}
    </Component>
  );
}

Button.propTypes = {
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'dark',
    'light',
  ]),
  outline: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'lg']),
};

Button.defaultProps = {
  component: 'button',
  className: '',
  type: 'secondary',
  onClick: null,
  outline: false,
  size: null,
};

export default Button;
