const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/Assets/imgs/Gallery");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg');
    },
});

const upload = multer({ storage: storage });

module.exports = {
    upload,
};
