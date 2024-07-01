
import React, { useState } from 'react';
import './create-post.css';

import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useToast } from '@chakra-ui/react';

export default function CreatePost() {

   const history=useHistory();
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
    if (!create.file || create.description === '') {
      // alert('Invalid Response!! Please select an image and add a description.');
      toast({
        title: 'Please select an image and add a description.',
        status: 'warning',
        duration: 2000,
        isClosable: true,
    })
      return;
    }
    setLoader(true);
    sendFile();
    setLoader(false);
    
  }

  async function sendFile() {
    const formData = new FormData();
    formData.append('file', create.file);

    try {
      const response = await fetch('http://localhost:4000/uploads/', {
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
    }
  }
      async function sendPost() {
        const url=(localStorage.getItem('image'));
        const response = await fetch(`http://localhost:4000/post/${user.userId}`, {
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
            history.push("/feeds");

        } else {
            // alert("Error Occured" + res.message);
            toast({
              title: "Error Occured" + res.message,
              status: 'error',
              duration: 2000,
              isClosable: true,
          })
        }
    }

  return (
    <div className='top'>
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
        {loader ?  <button id='uploadBtn' disabled>
          Posting....
        </button>: <button id='uploadBtn' onClick={handleSubmit}>
          Post
        </button>}
       
      </div>
    </div>
  );
}