import { connect } from 'react-redux';
import AudioList from '../components/AudioList';

function mapStateToProps(state) {
    return {
        children: state.list,
    }
}

export default connect(mapStateToProps)(AudioList);