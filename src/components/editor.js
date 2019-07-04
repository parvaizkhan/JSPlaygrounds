import React, { useContext } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/mode/jsx/jsx';
import { updateCode } from '../actions';

import { StoreContext } from '../App'

require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/javascript/javascript.js');

const Editor = () => {

    const store = useContext(StoreContext)

    const { code } = store.getState();

    const onCodeChange = (editor, data, code) => {
        store.dispatch(updateCode(code));
    }

    return (
        <div>
            <CodeMirror
                value={code}
                options={{ lineNumbers: true, mode: 'jsx', tabSize: 2 }}
                onBeforeChange={onCodeChange}
            />
        </div>
    );
}

export default Editor;