import React from "react";

class PreviewFieldComponent extends React.Component {
  constructor(props) {
    super(props);
    this.preview = React.createRef();
  }

  renderContentWithEffectHighlight() {
    this.preview.innerHTML = `<code class="prettyprint">${this.props.text}</code>`;
    PR.prettyPrint();
  }

  componentDidUpdate() {
    this.renderContentWithEffectHighlight();
  }

  componentDidMount() {
    this.preview = this.preview.current;
    this.renderContentWithEffectHighlight();
  }

  render() {
    return <pre id="preview" ref={this.preview}></pre>;
  }
}

export default PreviewFieldComponent;
