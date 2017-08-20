
import * as Path from 'path';
import * as multer from 'multer'
import * as fs from 'fs'

export const imageFilter = function (req, file, callBack) {
    // accept image only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callBack(new Error('Only image files are allowed!'), false);
    }
    callBack(null, true);
};

export class FileUploader {

    private storageConfig:StorageConfig;
    public multer: multer.Instance;
    constructor(private uploadDir: string) {
        this.storageConfig = new StorageConfig(uploadDir) ;
        this.multer = multer({
            storage: multer.diskStorage(this.storageConfig.diskStorageOptions),
            fileFilter: imageFilter
        });
    }
}
export default FileUploader;

export class StorageConfig  {
    public diskStorageOptions : multer.DiskStorageOptions;
    constructor(private uploadDir: string) { 
        this.diskStorageOptions = {
            destination: (req, file, cb) => {
                var stat = null;
                try {
                    stat = fs.statSync(uploadDir);
                } catch (err) {
                    fs.mkdirSync(uploadDir);
                }
                if (stat && !stat.isDirectory()) {
                    throw new Error('Directory cannot be created because an inode of a different type exists at "' + this.uploadDir + '"');
                }
                cb(null, uploadDir);
            },
            filename: (req, file, nextFunc) => {
                nextFunc(null, file.fieldname + '-' + Date.now() + Path.extname(file.originalname))
            }
        }
    }
}
