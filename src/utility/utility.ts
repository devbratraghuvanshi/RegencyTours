import  * as jwt from 'jwt-simple'

export var jWtSecret = "MyS3cr3tK3Y";

export var jwtEncode  = function (data:any) {
    return jwt.encode(data, jWtSecret);
};
export var jwtDecode  = function (data:any) {
     return jwt.decode(data, jWtSecret);
};

export var getToken  = function (headers) {
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
