const express = require('express');
const handleUpload = require('../Controller/uploadController');
const uploadRoutes = express.Router();

const fs = require('fs')
const multer  = require('multer');

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

uploadRoutes.post('/', upload.single('file'), handleUpload);


module.exports = uploadRoutes;