const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

function checkExcelFileType(file, cb) {
  const filetypes = /xlsx|xls/;
  const mimetypes = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
  ];
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.includes(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Error: Only Excel files are allowed"));
  }
}

function checkImageFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|gif/;
  const mimetypes = ["image/jpeg", "image/png", "image/gif"];
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.includes(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Error: Faqat rasm fayllariga ruxsat beriladi"));
  }
}

const uploadExcel = multer({
  storage,
  limits: { fileSize: 10000000000 },
  fileFilter: function (req, file, cb) {
    checkExcelFileType(file, cb);
  },
});

const uploadImage = multer({
  storage,
  limits: { fileSize: 10000000000 },
  fileFilter: function (req, file, cb) {
    checkImageFileType(file, cb);
  },
});

module.exports = { uploadExcel, uploadImage };
