import React, { Component } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/mode/jsx/jsx';
import * as actions from '../actions';
import { connect } from 'react-redux';

require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/javascript/javascript.js');

class Editor extends Component {
    onCodeChange = (editor, data, code) => {
        this.props.updateCode(code);
    }

    render() {
        return (
            <div>
                <CodeMirror
                    value={this.props.code}
                    options={{ lineNumbers: true, mode: 'jsx', tabSize: 2 }}
                    onBeforeChange={this.onCodeChange}
                />
            </div>
        );
    }
}

function mapStateToProps({ code }) {
    return { code };
}

export default connect(mapStateToProps, actions)(Editor);
