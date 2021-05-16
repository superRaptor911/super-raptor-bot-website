import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 
import Main from './pages/main';

function App() {

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Main/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
