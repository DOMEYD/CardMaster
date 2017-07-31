import React, { PureComponent } from 'react';
import './style.scss';

class Loader extends PureComponent {
  render() {
    return (<div className="loader-wrapper">
      <span className="loader" />
    </div>);
  }
}

export default Loader;
