const express = require('express');
const router = express.Router();
const multer= require('../Midelware/multerFichier')
const bookCtrl = require('../Controller/book');
const auth = require('../Midelware/auth');
const checker = require('../Midelware/checker');
router.get('/', bookCtrl.getAllBook);
router.get('/bestrating', bookCtrl.getMostRatingBooks);
router.get('/:id', bookCtrl.getOneBook);
router.post('/:id/rating',auth, checker, bookCtrl.modifyRating);
router.post('/',auth, checker, multer, bookCtrl.createBook);
router.put('/:id',auth,checker, multer, bookCtrl.modifyBook);
router.delete('/:id',auth, bookCtrl.deleteBook);

module.exports = router;