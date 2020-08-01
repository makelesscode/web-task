import { connect } from 'react-redux';
import Tooltip from '../components/Tooltip';

function mapStateToProps(state) {
  const { coordX, coordY, content } = state.tooltip;
  return {
    coordX,
    coordY,
    content,
  };
}

export default connect(mapStateToProps)(Tooltip);
