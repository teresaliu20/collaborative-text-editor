import React from 'react';
import MyEditor from '../components/Editor';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Editor, EditorState, convertToRaw, convertFromRaw } from 'draft-js';


class DocumentPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          title: '',
        }
    }
    componentWillMount() {
      axios.get('http://localhost:3000/document/' + this.props.match.params.id)
      .then(resp => {
        console.log(this.props.match.params.id);
        this.setState({
          title: resp.data.title
        });
      })
      .catch(err => {
        console.log("ERROR: Cannot retrieve document using axios request ", err);
      });
    }

    saveDocument(newState) {
      axios.post('http://localhost:3000/saveDocument', {
        text: newState,
        id: this.props.match.params.id,
        newRevision: JSON.stringify(newState)
      })
      .then(resp => {
        if (resp.status === 200) {
          console.log('success');
        }
        console.log(resp);
      })
      .catch(err => {
        console.log("ERROR: Cannot retrieve document using axios request ", err);
      });
    }

    render() {
        return (
            <div className="editor-page">
                <h2>{this.state.title}</h2>
                <MyEditor id={this.props.match.params.id} editorState={this.state.editorState} saveDocument={this.saveDocument.bind(this)} history={this.props.history}/>
                <button className="blue-button" onClick={() => this.props.history.push('/documentlist')}>Back To Documents</button>
            </div>
        )
    }
}

export default DocumentPage;
