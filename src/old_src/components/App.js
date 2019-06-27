// React
import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';

// React Router
import {Router, Route, Switch} from 'react-router-dom';

// React Redux
import {Provider} from 'react-redux';
import store from '../Store';

// Redux Actions
import {authenticateUser} from '../actions/authActions';
import {fetchAllUsers} from '../actions/userActions';

// React Alerts
import {Provider as AlertProvider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

// COMPONENTS //
// Photo
import ContentRoot from './photo/ContentRoot';
import MyTags from './photo/TagListAll';
import PhotoDetail from './photo/PhotoDetail';
import PhotoGallery from './photo/PhotoGallery';
import PhotoGrid from './photo/PhotoGrid';
import TagListAll from './photo/TagListAll';

// User
import DiscoverUsers from './users/DiscoverUsers';
import Login from './users/Login';
import Navigation from './users/Navigation';
import Profile from './users/Profile';
import Register from './users/Register';

// Support
import Alerts from './support/Alerts';
import ErrorPage from './support/ErrorPage';

// OTHER
import {createBrowserHistory} from 'history';
import '../css/app.css';

// Track and control browser history
const history = createBrowserHistory();

// Root App for building out components (keep index.js pure)
class App extends Component {
  constructor(props) {
    super(props);
    this.State = {};
  }

  componentDidMount() {
    store.dispatch(authenticateUser());
    store.dispatch(fetchAllUsers());
  }

  /*
  <AlertProvider template={AlertTemplate} {...alertOptions}>
  </AlertProvider>
  */

  render() {
    return (
      <div id="body">
        <Provider store={store}>
          <Router history={history}>
            <div>
              <Route path="/" component={Navigation} />
              <Route exact path="/" component={Login} />
              <Route path="/register/" component={Register} />
              <Route path="/login/" component={Login} />
              <Route
                path="/user/:username/:display/:urltags?"
                component={ContentRoot}
              />
              <Route path="/user/:username/profile/" component={Profile} />
              <Route
                path="/user/:username/gallery/:urltags?"
                component={PhotoGallery}
              />
              <Route
                path="/user/:username/grid/:urltags?"
                component={PhotoGrid}
              />
              <Route path="/user/:username/tags/" component={TagListAll} />
              <Route
                path="/user/:username/detail/:id"
                component={PhotoDetail}
              />
              <Route path="/bad-url/:reason?" component={DiscoverUsers} />
            </div>
          </Router>
        </Provider>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
