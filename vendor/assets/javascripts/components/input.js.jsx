class EditoriumInput extends React.Component {
  constructor(props) {
    super(props);

    const componentId = `${this.props.objectName}_${this.props.method}`;
    const iframeId = `${componentId}-iframe`;

    this.state = {
      componentId,
      iframeId,
      value: this.props.value,
      isEditorOpened: false
    };

    this.openEditor = this.openEditor.bind(this);
  }

  initChannel() {
    const iframe = document.getElementById(this.state.iframeId);
    const channel = Channel.build({
      // debugOutput: true,
      window: iframe.contentWindow,
      origin: '*',
      scope: 'editorium'
    });

    channel.bind('loadConfig', ()=> {
      return this.props.config;
    });

    channel.bind('close', ()=> {
      this.closeEditor();
    });

    channel.bind('update', (_trans, data)=> {
      if (this.sectionLength(data) == 0) data = '';
      this.setState({
        value: data
      });
    });

    channel.bind('load', (_trans, data)=> {
      return this.state.value;
    });
  }

  getFieldName() {
    name = this.props.objectName
    if(this.props.fieldName.length > 0) {
      name += '['+this.props.method+'_attributes]';
      name += '['+this.props.fieldName+']';
    }
    else{
      name += '['+this.props.method+']';
    }
    return name;
  }

  getIdName() {
    name = this.props.objectName
    if(this.props.fieldName.length > 0) {
      name += '['+this.props.method+'_attributes]';
      name += '[id]';
    }
    else{
      name += '[id]';
    }
    return name;
  }

  sectionLength(data) {
    data = data || this.state.value;
    return data && data.length > 0 ? JSON.parse(data)['sections'][1].length : 0;
  }

  render() {
    let caption;
    let sectionLength = this.sectionLength()
    switch (sectionLength) {
    case 0:
        caption = 'Create';
        break;
    case 1:
        caption = 'Edit 1 card';
        break;
    default:
        caption = `Edit ${sectionLength} cards`;
    }

    return (
      <div className="editorium-input">

        <input type="hidden"
          id={this.state.componentId}
          name={this.getFieldName()}
          value={this.state.value}
        />

        <input type="hidden"
          name={this.getIdName()}
          value={this.props.editoriumId}
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
  }

  openEditor() {
    this.setState({
      isEditorOpened: true
    });

    setTimeout(()=> { // Guess this needs to happen after child render?
      this.initChannel();
    }, 0);
  }

  closeEditor() {
    this.setState({
      isEditorOpened: false
    });
  }
};
