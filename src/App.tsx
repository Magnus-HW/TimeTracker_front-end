import './styles/App.css';

import React,{ useState, useEffect, useCallback} from 'react'

import Month from './components/Month';

import { useStateValue } from './state/state';

const App = () : JSX.Element=> {

  const [state, dispatch] = useStateValue()
  console.log('app state', state);
  

  return (
    <div className='App'>
      <div className="Calendar">
        <Month />
      </div>
    </div>
  )
}


export default App;
