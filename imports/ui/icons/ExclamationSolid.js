import React from 'react';
import PropTypes from 'prop-types';

class ExclamationSolid extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <svg width={this.props.width} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill={this.props.fill} d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zM9 5v6h2V5H9zm0 8v2h2v-2H9z"/></svg>
    )
  }
}

ExclamationSolid.defaultProps = {
  width: '50',
  fill: '#000'
}

ExclamationSolid.propTypes = {
  width: PropTypes.string,
  fill: PropTypes.string
}

export default ExclamationSolid;