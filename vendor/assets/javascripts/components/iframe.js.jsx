var EditoriumIframe = React.createClass({
  getDefaultProps() {
    return {
      overlayStyle: {
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        position: 'fixed',
        visibility: 'visible',
        border: 'none',
        zIndex: '1000000',
        background: 'white'
      }
    }
  },

  getInitialState() {
    // TODO Temproray workaround to force serviceURL to match the current host.
    const serviceURL = this.props.serviceURL.replace(/.*?:\/\//g, '//');

    return {
      serviceURL
    }
  },


  shouldComponentUpdate() {
    return false; // Never re-render the component, as it reloads the iframe.
  },

  render() {
    return (
      <div>
        <div style={this.props.overlayStyle}>
          Loading...
        </div>
        <iframe
          id={this.props.iframeId}
          src={this.state.serviceURL}
          frameBorder="0"
          style={this.props.overlayStyle}
        />
      </div>
    );
  }
});
