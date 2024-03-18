import React, { useState } from 'react'
import './create-post.css'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function CreatePost() {
    const history = useHistory();
    const selectUser = (state) => state.UserReducer.user;
    const user = useSelector(selectUser);
   const [create,setCreate]=useState({
    file:"",
    description:""
   })
   const [img,setImg]=useState([]);

   function handleChange(e){
  
     if(e.target.name==="file"){
         const filed = (e.target.files);
         setImg(filed)
        //  const reader = new FileReader();
        //  console.log(e.target.files[0]);

        //  reader.onload = function (event) {
        //      const fileContent = event.target.result;
        //     //  console.log('File content:', event.target.result);
        //      setImg(fileContent)
        //  };

        //  reader.readAsDataURL(file);
     }else{
         setCreate({ ...create, [e.target.name]: e.target.value })
     }
   
   }




   async function handleSubmit(e){
       e.preventDefault();
    if(!img || create.description===""){
           alert('Invalid Response !!');
            return;
   }
   console.log(img);
   console.log(create.description);
//    sendFile();
sendPost();
      

}
    async function sendFile() {
    
       const form=new FormData();
       form.append('description',create.description)
       form.append('file',img[0])
       console.log(form);
       console.log(img[0]);
        const response = await fetch(`http://localhost:4000/uploads/`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: img[0]
            
        })
        const res = await response.json();
        if (res.status === 201) {
            alert("Posted")  
            
        } else {
            alert("Error Occured" + res.message);
        }
    }

    async function sendPost() {
       
        const response = await fetch(`http://localhost:4000/post/${user.userId}`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                caption:create.description,
                name:user.name
            })
        })
        const res = await response.json();
        if (res.status === 201) {
          alert("Posted !!")
            history.push("/feeds") 

        } else {
            alert("Error Occured" + res.message);
        }
    }

  return (
    <div className='top'>
      <div id="container">
          <h2>Create Post</h2>
          <label for="upload" class="upload-label">Choose Image</label>
              <input type="file" id="upload" name='file'  onChange={handleChange} accept="image/*" />
              {img.length>0
                  ? <>
              
                  <div id="imagePreview">
                      <div id="previewImage" >{img[0].name}</div>
                  </div>
                  </>
              :""}
              <textarea id="description" placeholder="Add description" onChange={handleChange} name='description' ></textarea>
              <button id="uploadBtn" onClick={handleSubmit}>Post</button>
      </div>
      </div>
  )
}
