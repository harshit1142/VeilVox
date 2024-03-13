
import './App.css';
import Home from './Pages/Home/Home'
import PageNotFound from './Pages/404/PageNotFound'
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import {
  BrowserRouter,
  Switch,
  Route
  
} from "react-router-dom";
import Main from './Pages/Main/Main';

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/main" component={Main} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
