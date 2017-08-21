import { mkdirSyncP } from './../utility/utility';

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
            destination: (req, file, next) => {
                try {
                    mkdirSyncP(uploadDir);
                    if (fs.existsSync(uploadDir)){
                        next(null,uploadDir)
                    }else{
                        next(new Error('Directory cannot be created :'),uploadDir);
                    }
                } catch (error) {
                    next(new Error('Directory cannot be created :'),uploadDir);
                }
            },
            filename: (req, file, next) => {
                var fName = file.fieldname + '-' + Date.now() + Path.extname(file.originalname);
                next(null,fName)
            }
        }
    }

}
