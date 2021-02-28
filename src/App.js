import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";

import Search from './pages/Search'
import Results from './pages/Results'

function App() {
  const history = useHistory()

  return (
    <div className="App bg-gray-600">
      <h2 className="text-3xl pt-20"><a href="/">Search Reddit</a></h2>
      <Router>
        <Switch>
          <Route path="/results">
            <Results />
          </Route>
          <Route path="/">
            <Search />
          </Route>
        </Switch>
      </Router>
      <div className="flex justify-around w-2/5 mb-20">
        <h2 className="text-sm hover:text-gray-300"><a href="https://www.buymeacoffee.com/pmatarodrigues">Buy me a beer</a></h2>
        <h2 className="text-sm hover:text-gray-300"><a href="https://github.com/pmatarodrigues/reddit-search">Github</a></h2>
      </div>

    </div>
  );
}

export default App;
