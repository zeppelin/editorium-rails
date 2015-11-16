var EditoriumInput = React.createClass({

  getInitialState() {
    const componentId = `${this.props.objectName}_${this.props.method}`;
    const iframeId = `${componentId}-iframe`;

    return {
      componentId,
      iframeId,
      isEditorOpened: false
    };
  },

  initChannel() {
    const iframe = document.getElementById(this.state.iframeId);
    const channel = Channel.build({
      // debugOutput: true,
      window: iframe.contentWindow,
      origin: '*',
      scope: 'editorium'
    });

    channel.bind('close', ()=> {
      this.closeEditor();
    });

    channel.bind('update', (_trans, data)=> {
      this.setProps({
        value: data
      });
    });

    channel.bind('load', (_trans, data)=> {
      return this.props.value;
    });
  },

  render() {
    return (
      <div className="editorium-input">

        <input type="hidden"
          id={this.state.componentId}
          name={`${this.props.objectName}[${this.props.method}]`}
          value={this.props.value}
        />

        <button onClick={this.openEditor} type="button">Open Editor</button>

        {
          this.state.isEditorOpened &&

          <EditoriumIframe
            iframeId={this.state.iframeId}
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

    setTimeout(()=> { // Guess this needs to happen after child render?
      this.initChannel();
    }, 0);
  },

  closeEditor() {
    this.setState({
      isEditorOpened: false
    });
  }
});
