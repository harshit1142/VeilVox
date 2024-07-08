
import React, { useState } from 'react';
import './create-post.css';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector, useDispatch } from 'react-redux';
import { removeUser } from '../Redux/UserRedux';
import { Spinner, useToast } from '@chakra-ui/react';

export default function CreatePost() {

   const history=useHistory();
   const dispatch = useDispatch();
    const selectUser = (state) => state.UserReducer.user;
    const user = useSelector(selectUser);
    const [loader,setLoader]=useState(false);
    const toast = useToast();
  const [create, setCreate] = useState({
    file: null,
    description: '',
    image:""
  });
  const [img,setImg]=useState("");
  // console.log(create);

  function handleChange(e) {
    if (e.target.name === 'file') {
      const file = e.target.files[0];
      setCreate({ ...create, "file": file });
    } else {
      setCreate({ ...create, [e.target.name]: e.target.value });

    }
  }


  async function handleSubmit(e) {
    e.preventDefault();
    setLoader(true);
    if (!create.file || create.description === '') {
      // alert('Invalid Response!! Please select an image and add a description.');
      toast({
        title: 'Please select an image and add a description.',
        status: 'warning',
        duration: 2000,
        isClosable: true,
    })
      setLoader(false);
      return;
    }
    sendFile();
    
  }

  async function sendFile() {
    const formData = new FormData();
    formData.append('file', create.file);

    try {
      const response = await fetch('https://veilvox.onrender.com/uploads/', {
        method: 'POST',
        body: formData
      });

      const res = await response.json().then(response =>{
   
        setImg(response.data);
        localStorage.setItem('image',(response.data));
        // console.log(response.data);
        sendPost();
      }).catch(error=>{
        // alert('Error: ' + error);
        toast({
          title: 'Error: ' + error,
          status: 'error',
          duration: 2000,
          isClosable: true,
      })
      setLoader(false);
      });
     
    } catch (error) {
      console.error('Error:', error);
      // alert('Error occurred while uploading the file');
      toast({
        title: 'Error occurred while uploading the file',
        status: 'error',
        duration: 2000,
        isClosable: true,
    })
    setLoader(false);
    }
  }
      async function sendPost() {
        const url=(localStorage.getItem('image'));
        const response = await fetch(`https://veilvox.onrender.com/post/${user.userId}`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({

                name:user.name,
                caption:create.description,
                imageURL:url,

            })
        })
        localStorage.removeItem('image');
        const res = await response.json();
        if (res.status === 201) {

            // alert("Posted!!")
            toast({
              title: "Posted successfully",
              status: 'success',
              duration: 3000,
              isClosable: true,
              position: 'bottom-right'
          })
            setLoader(false);
            history.push("/feeds");

        } else {
            // alert("Error Occured" + res.message);
            toast({
              title: "Error Occured" + res.message,
              status: 'error',
              duration: 2000,
              isClosable: true,
          })
          setLoader(false);
        }
    }

    function logout(){
        // alert("Logout Successfully!!");
        dispatch(removeUser());
        history.push("/");
    }


  return (
    

    <div className='top'>
      {/* <---------------------Navbar--------------------> */}
      <nav>
          <div className="container">
            <Link to="/feeds">
              <h2 className="logo">
                  VeilVox
              </h2>
            </Link>
              <div className="create">
                  {/* <!-- <label className="btn btn-primary" for="create-post">Create</label> --> */}
                  <button  onClick={logout} className="btn btn-primary">Logout</button>
              </div>
          </div>
      </nav>

      

      <div id='container'>
        <h2>Create Post</h2>
        <label htmlFor='upload' className='upload-label'>
          Choose Image
        </label>
        <input
          type='file'
          id='upload'
          name='file'
          onChange={handleChange}
          accept='image/*'
        />
        {create.file && (
          <div id='imagePreview'>
            <div id='previewImage'>{create.file.name}</div>
          </div>
        )}
        <textarea
          id='description'
          placeholder='Add description'
          onChange={handleChange}
          name='description'
          value={create.description}
        ></textarea>
        {loader ?  (<button id='uploadBtn' disabled>
          <Spinner />
        </button>) : (<button id='uploadBtn' onClick={handleSubmit}>
          Post
        </button>)}
       
      </div>
    </div>
  );
}