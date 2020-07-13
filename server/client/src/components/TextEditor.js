import React from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import "../css/TextEditor.css";

class TextEditor extends React.Component {
  constructor(props) {
    super(props);

    this.modules = {
      toolbar: [
        [{ 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'align': [] }],
        [{ 'color': [] }, { 'background': [] }],
        ['clean']
      ]
    };

    this.formats = [
      'font',
      'size',
      'bold', 'italic', 'underline',
      'list', 'bullet',
      'align',
      'color', 'background'
    ];

    this.state = {
      textContent: '',
      wordCount: 0
    }

    this.textChange = this.textChange.bind(this);
  }

  textChange = (content, delta, source, editor) => {
    this.setState({ textContent: content })
    console.log(editor.getHTML()); // HTML/rich text
    console.log(editor.getText()); // plain text
    console.log(editor.getLength()); // number of characters
    const currentText = editor.getText();
    // There are a couple issues with counting words
    // this way but we'll fix these later
    const countWords = (text) => {
      text = text.replace(/(^\s*)|(\s*$)/gi, "");
      text = text.replace(/[ ]{2,}/gi, " ");
      text = text.replace(/\n /, "\n");
      return text.split(' ').length;
    }

    const currentWordCount = countWords(currentText)
    if (currentWordCount !== this.state.wordCount) {

      this.setState({ wordCount: currentWordCount }, () => {
        console.log("WORD COUNT:", this.state.wordCount)
      })
    }
  }

  render() {
    return (
      <ReactQuill
        theme="snow"
        modules={this.modules}
        formats={this.formats}
        onChange={this.textChange}
        value={this.state.textContent} />
    )
  }
}


export default TextEditor;