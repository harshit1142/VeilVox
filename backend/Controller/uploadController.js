const fs = require('fs')
const multer  = require('multer');

// uploading locally first using multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/tmp/my-uploads')
    },

    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
const upload = multer({ storage: storage })

async function handleUpload(req, res){
    try {
        // const {file}=req.file.path;
        console.log(req.file);
        console.log(req.body);
        const imagePath = req.file[0].path;
        const uploadResult = await uploadImageToCloudinary(imagePath);

        // If upload to Cloudinary is successful, unlink the file
        fs.unlinkSync(imagePath);

        res.json({ status : 201, message: 'File uploaded successfully using multer and Cloudinary', data: uploadResult });
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