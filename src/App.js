
import './App.css';
import Home from './Pages/Home/Home'
import Auth from './Pages/Auth/Auth'
import PageNotFound from './Pages/404/PageNotFound'

import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/auth" component={Auth} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
