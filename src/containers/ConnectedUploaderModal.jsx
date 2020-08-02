import { connect } from 'react-redux';
import { hide } from '../actions/uploader';
import UploaderModal from './UploaderModal';

function mapStateToProps(state) {
  return {
    visible: state.uploader.visible,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    hide: () => dispatch(hide()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UploaderModal);
