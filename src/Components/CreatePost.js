import React, { useState } from 'react'
import './create-post.css'

export default function CreatePost() {

   const [create,setCreate]=useState({
    file:"",
    description:""
   })
   const [img,setImg]=useState([]);

   function handleChange(e){
  
     if(e.target.name==="file"){
         const filed = Array.from(e.target.files[0]);
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
   sendFile();
      

}
    async function sendFile() {
    
       const form=new FormData();
       form.append('description',create.description)
       form.append('file',img)
      
        const response = await fetch(`http://localhost:4000/uploads/`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: img
            
        })
        const res = await response.json();
        if (res.status === 201) {
            alert("done")   
        } else {
            alert("Error Occured" + res.message);
        }
    }

    async function sendPost(e) {
        e.preventDefault();
        const response = await fetch(`http://localhost:4000/uploads`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                file: create.file
            })
        })
        const res = await response.json();
        if (res.status === 201) {
            setImg(res.data);
            console.log(img);
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
