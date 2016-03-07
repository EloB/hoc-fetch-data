import React, { Component } from 'react';
import cancelable from '../../utils/cancelable';

function noop() {}

export default (load = noop) => ComposedComponent => class extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      status: 'idle',
      error: null,
    };
  }

  componentWillMount() {
    this._preload(this.props, this.state);
  }

  componentWillUnmount() {
    if (this.subscribeLoad) {
      this.subscribeLoad.cancel();
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    this._preload(nextProps, nextState);
  }

  _preload(nextProps, nextState) {
    if (this.subscribeLoad) {
      this.subscribeLoad.cancel();
    }

    this.setState({
      status: 'loading',
      error: null,
    });

    this.subscribeLoad = cancelable(Promise.all([load(nextProps, nextState)]));

    this.subscribeLoad.promise
      .then(() => this.setState({ status: 'loaded', error: null }))
      .catch(error => {
        if (!error.isCancelled) {
          this.setState({ status: 'failed', error });
        }
      });
  }

  render() {
    if (this.state.status === 'failed') {
      if (this.state.error instanceof Error) {
        return (
          <div>
            <h1>Error loading page</h1>
              {process.env.NODE_ENV === 'development' && this.state.error &&
                <pre>{this.state.error.toString()}</pre>
              }
          </div>
        );
      }

      if (typeof this.state.error === 'string') {
        return <h1>{this.state.error}</h1>;
      }

      return (
        <div>
          {this.state.error}
        </div>
      );
    }

    if (this.state.status === 'loading') {
      return <div>Spinner</div>;
    }

    return (
      <ComposedComponent {...this.props} />
    );
  }
};
