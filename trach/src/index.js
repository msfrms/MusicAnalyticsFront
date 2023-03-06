import * as serviceWorker from './serviceWorker'
import ChartPageComponent from './components/pages/chart/ChartPageComponent'
import TrackPageComponent from './components/pages/track/TrackPageComponent'
import AlbumPageComponent from './components/pages/track/AlbumPageComponent'
import ArtistPageComponent from './components/pages/artist/ArtistPageComponent'
import ReportPageComponent from './components/pages/report/ReportPageComponent'
import store, { persistor } from './app/store'
import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { syncHistoryWithStore } from 'react-router-redux'

import { PersistGate } from 'redux-persist/integration/react'

import { createBrowserHistory } from 'history'

export const history = syncHistoryWithStore(createBrowserHistory(), store)

function TrachRouter() {
  return (
    <Switch>
      <Route exact path="/" component={ChartPageComponent} />
      <Route path="/chart" component={ChartPageComponent} />
      <Route path="/track/:id" component={TrackPageComponent} />
      <Route path="/album/:id" component={AlbumPageComponent} />
      <Route path="/artist/:id" component={ArtistPageComponent} />
      <Route path="/report" component={ReportPageComponent} />
    </Switch>
  );
}

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={history}>
        <TrachRouter />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
