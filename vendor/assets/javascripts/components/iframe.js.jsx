class EditoriumIframe extends React.Component {
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
    const overlayStyle = {
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      position: 'fixed',
      visibility: 'visible',
      border: 'none',
      zIndex: '1000000',
      background: 'white'
    };

    return (
      <div>
        <div style={overlayStyle}>
          Loading...
        </div>
        <iframe
          id={this.props.iframeId}
          src={this.state.serviceURL}
          frameBorder="0"
          style={overlayStyle}
        />
      </div>
    );
  }
};
