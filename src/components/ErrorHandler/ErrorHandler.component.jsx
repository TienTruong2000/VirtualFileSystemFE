import React from 'react';
class ErrorHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch() {
    //window.location.href = ``;
  }

  render() {
    if (this.state.hasError) {
      //can not handle error in here
    }
    return this.props.children;
  }
}

export default ErrorHandler;