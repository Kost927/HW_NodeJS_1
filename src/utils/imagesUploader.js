const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `user-${req.user.id}-${uuidv4()}.${ext}`);
    },
});

const multerFilter = (req, file, cb) => {
    
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new Error("Not an image! Please upload only images", false));
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});

module.exports = upload;