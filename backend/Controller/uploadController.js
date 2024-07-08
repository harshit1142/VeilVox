const fs = require('fs')
const multer  = require('multer');


async function handleUpload(req, res){
    try {


        if(req.file){
            const imagePath = req.file.path;
            
            const uploadResult = await uploadImageToCloudinary(req.file.path);
        //    console.log(uploadResult.url);
            // If upload to Cloudinary is successful, unlink the file
            // fs.unlinkSync(imagePath);
    
            res.json({ status : 201,
                message: 'File uploaded successfully using multer and Cloudinary',
                data: uploadResult.url
            });
        }else{
            res.status(500).json({ error: 'Internal server error' });

        }
    } catch (error) {
        
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// uploading it to the cloud storage and getting the URL(cloudinary)
const cloudinary = require('cloudinary').v2;
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});


const uploadImageToCloudinary = async (imagePath) => {
    try {
        const byteArray = fs.readFileSync(imagePath);

        const uploadResult = await new Promise((resolve, reject) => {

            cloudinary.uploader.upload_stream((error, result) => {
                if (error) {
                    
                    reject(error);
                } else {
                   
                    resolve(result);
                }
            }).end(byteArray);
        });

        fs.unlinkSync(imagePath);

        return uploadResult;
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);

        throw error; 
    }
};

module.exports = handleUpload;