import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 
import Dashboard from './pages/Dashboard';
import Main from './pages/main';
import ViewThread from './pages/ViewThread';

function App() {

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Main/>
          </Route>

          <Route exact path="/dashboard">
            <Dashboard/>
          </Route>

          <Route exact path="/thread/:threadid">
            <ViewThread/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
