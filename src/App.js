
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
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './Redux/UserRedux';
import Feed from './Pages/Feed/Feed';
import Post from './Pages/Post/Post';

function App() {
  const dispatch = useDispatch();
 useEffect(()=>{
    if(localStorage.getItem("user")){
      dispatch(setUser(JSON.parse(localStorage.getItem("user"))))
    }
 },[dispatch])

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/main" component={Main} />
          <Route path="/feeds" component={Feed} />
          <Route path="/feed/:id" component={Post} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
