import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 
import Header from './components/Header';
import Bots from './pages/Bots';
import Dashboard from './pages/Dashboard';
import Main from './pages/main';
import About from './pages/About';
import Commands from './pages/Commands';
import ViewThread from './pages/ViewThread';
import Usage from './pages/Usage';

function App() {

  return (
    <Router>
      <Header/>
      <div>
        <Switch>
          <Route exact path="/">
            <Main/>
          </Route>

          <Route exact path="/dashboard">
            <Dashboard/>
          </Route>

          <Route exact path = "/about">
            <About/>
          </Route>

          <Route exact path = "/how_to_use">
            <Usage/>
          </Route>

          <Route exact path = "/commands">
            <Commands/>
          </Route>

          <Route exact path="/thread/:threadid">
            <ViewThread/>
          </Route>

          <Route exact path="/bots">
            <Bots/>
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
