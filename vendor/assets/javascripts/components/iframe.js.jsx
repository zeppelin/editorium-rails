class EditoriumIframe extends React.Component {
  static defaultProps = {
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

  constructor(props) {
    super(props);

    const serviceURL = this.props.serviceURL.replace(/.*?:\/\//g, '//');
    this.state = {
      serviceURL
    };
  }

  shouldComponentUpdate() {
    return false; // Never re-render the component, as it reloads the iframe.
  }

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
};
