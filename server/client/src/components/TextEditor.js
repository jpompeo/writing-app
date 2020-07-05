import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';
import {Container, Row, Col} from 'react-bootstrap';

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = editorState => this.setState({editorState});
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
          <h1>Write</h1>
          <Editor editorState={this.state.editorState} onChange={this.onChange} />
          </Col>
        </Row>
      </Container>
      
    );
  }
}

export default TextEditor;