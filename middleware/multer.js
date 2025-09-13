const multer = require('multer');
const path = require('path')
const uploadDir = path.join(__dirname, '..', 'uploads');
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // const extension = file.mimetype.split('/')[1]
    const filename = `${Date.now() + '-' + file.originalname}`;
    cb(null, filename);
  },
});

// const upload = multer({dest:`${__dirname}/uploads`})
const upload = multer({
  storage: multerStorage,
});

module.exports = {upload}