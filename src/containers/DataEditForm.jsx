import React from 'react';
import PropTypes from 'prop-types';
import InputFormGroup from '../components/InputFormGroup';
import InputField from '../components/InputField';
import { getSecondsFromDuration } from '../helpers/duration';

class DataEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.values = {};
    this.requiredFields = [];
  }

  getChangeHandler(name, valueRequired, enhancer = null) {
    const { onValidationFail, onValidationSuccess } = this.props;
    if (valueRequired) {
      this.requiredFields.push(name);
    }
    return (newValue) => {
      this.values[name] = enhancer !== null ? enhancer(newValue) : newValue;
      if (!newValue && valueRequired) {
        onValidationFail();
      } else if (this.checkRequiredValues()) {
        onValidationSuccess(this.values);
      }
    };
  }

  checkRequiredValues() {
    for (let i = 0; i < this.requiredFields.length; i += 1) {
      const name = this.requiredFields[i];
      if (!this.values[name]) {
        return false;
      }
    }
    return true;
  }

  render() {
    const { disabled } = this.props;
    const year = new Date().getFullYear();
    return (
      <>
        <InputFormGroup name="Artist">
          <InputField disabled={disabled} onChange={this.getChangeHandler('artist', true)} />
        </InputFormGroup>
        <InputFormGroup name="Song name">
          <InputField disabled={disabled} onChange={this.getChangeHandler('title', true)} />
        </InputFormGroup>
        <InputFormGroup name="Duration">
          <InputField
            type="time"
            step="1"
            disabled={disabled}
            onChange={this.getChangeHandler('duration', false, getSecondsFromDuration)}
          />
        </InputFormGroup>
        <InputFormGroup name="Album">
          <InputField disabled={disabled} onChange={this.getChangeHandler('album_name')} />
        </InputFormGroup>
        <InputFormGroup name="Release year">
          <InputField
            type="number"
            disabled={disabled}
            onChange={this.getChangeHandler('release_year')}
            min={1}
            max={year}
          />
        </InputFormGroup>
      </>
    );
  }
}

DataEditForm.propTypes = {
  onValidationSuccess: PropTypes.func.isRequired,
  onValidationFail: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default DataEditForm;
