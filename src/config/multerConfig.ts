
import * as Path from 'path';
import * as multer  from 'multer'
export const storageConfig = {
    destination:function(req, file, nextFunc){ nextFunc(null, './uploads') },
    filename:function(req, file, nextFunc){ 
        nextFunc(null, file.fieldname + '-' + Date.now() + Path.extname(file.originalname)) 
    }
}

export const imageFilter = function (req, file, callBack) {
    // accept image only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callBack(new Error('Only image files are allowed!'), false);
    }
    callBack(null, true);
};

const multerStorage = multer.diskStorage(storageConfig);

export const mulUpload = multer({
    storage:multerStorage,
    fileFilter: imageFilter
});
export default mulUpload;