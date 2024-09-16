const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');
const upload = require('../middleware/multer');

router.get('/', controller.defaultCon);
router.get('/view', controller.viewMovie);
router.get('/addMovie', controller.addMovie);
router.post('/addData', upload.single('fileUp'), controller.addData);
router.get('/editMovie/:id', controller.editMovie);
router.post('/updateMovie/:id', upload.single('fileUp'), controller.updateMovie);
router.get('/deleteMovie/:id', controller.deleteMovie);

module.exports = router;