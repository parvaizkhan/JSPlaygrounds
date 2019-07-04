import React, { useReducer } from 'react'
import SplitPane from 'react-split-pane'
import Editor from './components/Editor'
import Viewer from './components/Viewer'

import codeReducer, { INITIAL_STATE } from './reducers/code_reducer';

export const StoreContext = React.createContext();

export default () => {

  const [code, dispatch] = useReducer(codeReducer, INITIAL_STATE)

  const store = {
    getState: () => ({ code }),
    dispatch
  }

  const width = window.innerHeight;

  return (
    <StoreContext.Provider value={store}>
      <SplitPane split="vertical" defaultSize={width}>
        <Editor />
        <Viewer />
      </SplitPane>
    </StoreContext.Provider>
  )
}
