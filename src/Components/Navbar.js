import React, { useEffect, useState } from 'react'
import '../Pages/Feed/Feed.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { removeUser } from '../Redux/UserRedux';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { UserCard } from './ChatComponents/UserCard';
import { useToast } from '@chakra-ui/react';


export default function Navbar() {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const selectUser = (state) => state.UserReducer.user;
    const toast = useToast();
    const user = useSelector(selectUser)   
    const dispatch = useDispatch();
    const history=useHistory();

    useEffect(() => {
        setSearchResult([]);

    }, [])

    function logout(){
        // alert("Logout Successfully!!");
        dispatch(removeUser());
        history.push("/");
    }

    const handleSearch = async (query) => {
        setSearch(query)
        if(!query){
            return;
        }
        try{
            const response = await fetch(`http://localhost:4000/auth/${user.userId}`,{
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    search: query
                })
            }) 
            const res = await response.json();
            const data = res.users;
            setSearchResult(data);
            

        } catch(err){
            toast({
                title: "Error occured",
                description: "Failed to load the results",
                status: 'error',
                duration: 2000,
                isClosable: true,
                position:"top"
            })
        }

    }

    const handleSelect = (user) => {
        setSearchResult([]);

        history.push(`/profile/${user.name}`)
    }

  return (
    <div className="navbar-container">
    <nav>
      <div className="container">
        <Link to="/feeds">
          <h2 className="logo">
            VeilVox
          </h2>
        </Link>
        <div className="search-bar-wrapper">
          <div className="search-bar">
            <i className="uil uil-search"></i>
            <input
              type="search"
              placeholder="Search for Users"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          {search && (
            <div className="search-results">
              {searchResult?.slice(0, 7).map(user => (
                <UserCard
                  key={user._id}
                  user={user}
                  handleFunction={() => handleSelect(user)}
                />
              ))}
            </div>
          )}
        </div>
        <div className="create">
          <button onClick={logout} className="btn btn-primary">Logout</button>
        </div>
      </div>
    </nav>
  </div>
  )
}
