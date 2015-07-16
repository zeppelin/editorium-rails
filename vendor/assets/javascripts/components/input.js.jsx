var EditoriumInput = React.createClass({

  getInitialState() {
    return {
      isEditorOpened: false
    }
  },

  componentDidMount() {
    window.addEventListener('message', this.didReceiveMessage);
  },

  componentWillUnmount() {
    window.removeEventListener('message', this.didReceiveMessage);
  },

  render() {
    // TODO better strip tags?
    const componentId = this.getComponentId();

    return (
      <div className="editorium-input">

        <input type="hidden"
          id={componentId}
          name={`${this.props.objectName}[${this.props.method}]`}
          value={this.props.value}
        />

        <button onClick={this.openEditor} type="button">Open Editor</button>

        {
          this.state.isEditorOpened &&

          <EditoriumIframe
            componentId={componentId}
            data={this.props.value}
            serviceURL={this.props.serviceURL}
            previewEndpoint={this.props.previewEndpoint}
          />
        }
      </div>
    );
  },

  openEditor() {
    this.setState({
      isEditorOpened: true
    });
  },

  didReceiveMessage(event) {
    if (event.data.id !== this.getComponentId()) {
      return;
    }

    if (event.data.command === 'close') {
      this.setState({
        isEditorOpened: false
      });
    } else if (event.data.command === 'update') {
      this.setProps({
        value: event.data.source // TODO Rename
      });
    }
  },

  getComponentId() {
    return `${this.props.objectName}_${this.props.method}`;
  }
});
