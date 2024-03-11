
import './App.css';
import Home from './Pages/Home/Home'
import PageNotFound from './Pages/404/PageNotFound'
import Login from './Pages/Auth/Login';

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
          <Route path="/login" component={Login} />
          <Route path="/register" component={Login} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
