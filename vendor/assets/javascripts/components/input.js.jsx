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
    const previewText = this.props.renderedValue.replace(/<(?:.|\n)*?>/gm, '');
    const componentId = this.getComponentId();

    return (
      <div className="editorium-input">

        <input type="hidden"
          id={componentId}
          name={`${this.props.objectName}[${this.props.method}]`}
          value={this.props.renderedValue}
        />

        <input type="hidden"
          id={`${componentId}_source`}
          name={`${this.props.objectName}[${this.props.method}_source]`}
          value={this.props.sourceValue}
        />

        <div className="editorium-input-preview-text">{previewText}</div>

        <button onClick={this.openEditor} type="button">Open Editor</button>

        {
          this.state.isEditorOpened &&

          <EditoriumIframe
            componentId={componentId}
            data={this.props.sourceValue}
            serviceURL={this.props.serviceURL}
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
        renderedValue: event.data.rendered,
        sourceValue: event.data.source
      });
    }
  },

  getComponentId() {
    return `${this.props.objectName}_${this.props.method}`;
  }
});
