import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from '../components/Modal';
import { clear } from '../actions/similar';

import { getLastFmSimilarArtists } from '../helpers/network';
import ArtistList from '../components/ArtistList';

class SimilarArtistsModal extends React.Component {
  constructor(props) {
    super(props);

    this.onRequestClose = this.onRequestClose.bind(this);

    this.state = {
      items: null,
      error: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { query } = this.props;
    if (prevProps.query !== query) {
      getLastFmSimilarArtists(query).then((response) => {
        this.setState({
          items: response.similarartists.artist,
        });
      });
    }
  }

  onRequestClose() {
    const { hide } = this.props;
    hide();
  }

  render() {
    const { query } = this.props;
    const {
      items,
      error,
    } = this.state;
    if (!query) {
      return null;
    }
    if (error) { // error boundary
      return null;
    }
    return (
      <Modal
        title={`Artists similar to ${query}`}
        onRequestClose={this.onRequestClose}
      >
        <div className="modal-body">
          {items === null ? 'Loading...' : <ArtistList>{items}</ArtistList>}
        </div>
      </Modal>
    );
  }
}

SimilarArtistsModal.propTypes = {
  query: PropTypes.string,
  hide: PropTypes.func.isRequired,
};

SimilarArtistsModal.defaultProps = {
  query: '',
};

function mapStateToProps(state) {
  return {
    query: state.similar,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    hide: () => dispatch(clear()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SimilarArtistsModal);
