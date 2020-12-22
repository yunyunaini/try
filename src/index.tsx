/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import {Route, Switch, HashRouter} from 'react-router-dom'
import Index from './page/index'

// const Index =() => import('./page/index')

const App: React.FC<{}> = () =>  {
  return (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Index}/>
    </Switch>
  </HashRouter>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

