import React, { PureComponent } from 'react';
import './style.scss';

class Loader extends PureComponent {
  render() {
    return <div><span className="loader"></span></div>;
  }
}

export default Loader;