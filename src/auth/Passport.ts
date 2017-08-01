import * as Passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { jWtSecret} from './../utility/utility'
import UserCredential from './../models/userCredential'

export class PassportAuth {
    constructor() {
        var strategy = new Strategy(
            { secretOrKey: jWtSecret, jwtFromRequest: ExtractJwt.fromAuthHeader() }, // pass secretOrKey: "MyS3cr3tK3Y" from config file
            (jwt_payload, done) => {
                UserCredential.findOne({ userId: jwt_payload.userId }, (err, credential) => {
                    if (credential) {
                        return done(null, { userId: credential.userId });
                    } else {
                        return done(new Error("User not found"), null);
                    }
                });
            });
        Passport.use(strategy);
    }

    public initialize() {
        return Passport.initialize();
    }
    public authenticate() {
        return Passport.authenticate("jwt", { session: false }); //pass {session: false}  from config file
    }
}
export default new PassportAuth();