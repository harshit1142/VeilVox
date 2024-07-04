
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
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './Redux/UserRedux';
import Feed from './Pages/Feed/Feed';
import CreatePost from './Components/CreatePost';
import './Pages/Post/Post.css';
import Chat from './Pages/Chat/Chat';

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
          <Route path="/feeds" component={Feed} />
          <Route path="/chat" component={Chat} />
          <Route path="/create/post" component={CreatePost} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
