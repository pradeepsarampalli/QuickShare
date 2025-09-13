const User = require('../model/userModel')
const path = require('path');
const UploadModel = require('../model/uploadModel')

const upload = async (req, res) => {
//if req object didnt contain any file ,no file was uploaded return it
  if (!req.file) {
    return res.status(400).json({
      status: 'Failed',
      message: 'No file Selected',
    });
  }
  try {
    //req.id was put by me in verifyToken middleware which i signed using user id 
    //so decoded it using verify anf set id on req object
    const user = await User.findById(req.id);
    //if no user logged out after token verification
    if (!user) {
      return res.status(400).json({
        status: 'Please login to uplaod!',
      });
    }
    //uplaoding file detailes to db
    const newFile = await UploadModel.create({
      filename: req.file.filename,
      filesize: req.file.size,
      uniqueCode: req.body.code,
    });
    //unique code from frontend
    const uniqueCode = req.body.code;
    await UploadModel.findOne({ uniqueCode });
    user.files.push(newFile);
    await user.save();
  } 
  catch (err) {
    console.log(err);
  }
  return res.status(200).json({
    status: 'ok',
    message: 'File hitted this route!',
  });
}

const retrieve = async (req, res) => {
  if (!req.body.code) {
    return res.status(400).json({
      status: 'Failed',
      message: 'No code is entered!',
    });
  }
  const uniqueCode = req.body.code;
  const file = await UploadModel.findOne({ uniqueCode: uniqueCode });
  // After getting the filename from the server
  return res.status(200).json({
    file,
  });
}

const download = (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '..', 'uploads', filename);
  console.log(__dirname)
  res.download(filePath, err => {
    if (err) {
      console.error('Download error:', err);
      res.status(500).send('File not found or error during download.');
    }
  });
}

module.exports ={upload,retrieve,download}