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
      if(this.sectionLength(data) == 0) data = '';
      console.log(data);
      this.setProps({
        value: data
      });
    });

    channel.bind('load', (_trans, data)=> {
      return this.props.value;
    });
  },

  sectionLength(data) {
    data = data || this.props.value;
    return data && data.length > 0 ? JSON.parse(data)['sections'][1].length : 0;
  },

  render() {
    switch(this.sectionLength()) {
    case 0:
        caption = 'Create';
        break;
    case 1:
        caption = 'Edit 1 card';
        break;
    default:
       caption = `Edit ${this.sectionLength()} cards`;
    }
    return (
      <div className="editorium-input">

        <input type="hidden"
          id={this.state.componentId}
          name={`${this.props.objectName}[${this.props.method}]`}
          value={this.props.value}
        />

        <button onClick={this.openEditor} type="button">{caption}</button>

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
