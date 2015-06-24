var EditoriumIframe = React.createClass({
  shouldComponentUpdate() {
    return false; // Never re-render the component, as it reloads the iframe.
  },

  render() {
    const queryString = this.buildQueryString({
      id: this.props.componentId,
      data: this.props.data
    });

    return (
      <iframe src={`${this.props.serviceURL}?${queryString}`} frameBorder="0" style={{
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        position: 'absolute',
        visibility: 'visible',
        border: 'none',
        zIndex: '1000000'
      }} />
    );
  },

  buildQueryString(data) {
    return Object.keys(data).map(function(key) {
      return [key, data[key]].map(encodeURIComponent).join('=');
    }).join('&');
  }
});
