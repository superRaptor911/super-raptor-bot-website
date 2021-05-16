import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 
import Dashboard from './pages/Dashboard';
import Main from './pages/main';

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
        </Switch>
      </div>
    </Router>
  );
}

export default App;
