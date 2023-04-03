const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webP': 'webP'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    console.log(file+' '+req.file)
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    console.log(req.file)
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  },
  // size: (req,file )=>{
  //   if(req.file.size>=2400000){

  //   }
  // }
});

module.exports = multer({storage: storage}).single('image');