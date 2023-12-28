// import PropTypes from 'prop-types'
import { Component } from 'react';
import './loader.css';

export default class loader extends Component {
  //   static propTypes = {second: third}

  render() {
    return (
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
}
