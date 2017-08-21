import  * as jwt from 'jwt-simple'
import * as fs from 'fs'
import * as path from 'path';

export const jWtSecret = "MyS3cr3tK3Y";

export const jwtEncode  = function (data:any) {
    return jwt.encode(data, jWtSecret);
};
export const jwtDecode  = function (data:any) {
     return jwt.decode(data, jWtSecret);
};

export const getToken  = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};


export const mkdirSyncP = function(location) {
  let normalizedPath = path.normalize(location);
  let parsedPathObj = path.parse(normalizedPath);
  let curDir = parsedPathObj.root;
  let folders = parsedPathObj.dir.split(path.sep);
  folders.push(parsedPathObj.base);
  for(let part of folders) {
      curDir = path.join(curDir, part);
      if (!fs.existsSync(curDir)) {
          fs.mkdirSync(curDir);
      }
  }
}
