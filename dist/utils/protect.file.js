"use strict";

var multer = require('multer');
var path = require('path');
var storage = multer.diskStorage({
  destination: './public/uploads',
  filename: function filename(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
function checkExcelFileType(file, cb) {
  var filetypes = /xlsx|xls/;
  var mimetypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
  var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  var mimetype = mimetypes.includes(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Error: Only Excel files are allowed'));
  }
}
function checkImageFileType(file, cb) {
  var filetypes = /jpg|jpeg|png|gif/;
  var mimetypes = ['image/jpeg', 'image/png', 'image/gif'];
  var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  var mimetype = mimetypes.includes(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Error: Faqat rasm fayllariga ruxsat beriladi'));
  }
}
var uploadExcel = multer({
  storage: storage,
  limits: {
    fileSize: 10000000000
  },
  fileFilter: function fileFilter(req, file, cb) {
    checkExcelFileType(file, cb);
  }
});
var uploadImage = multer({
  storage: storage,
  limits: {
    fileSize: 10000000000
  },
  fileFilter: function fileFilter(req, file, cb) {
    checkImageFileType(file, cb);
  }
});
module.exports = {
  uploadExcel: uploadExcel,
  uploadImage: uploadImage
};