import * as Passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import User from './../models/user'

export class PassportAuth {
    constructor() {
        var strategy = new Strategy(
            { secretOrKey: "MyS3cr3tK3Y", jwtFromRequest: ExtractJwt.fromAuthHeader() }, // pass secretOrKey: "MyS3cr3tK3Y" from config file
            (jwt_payload, done) => {
                User.findOne({ id: jwt_payload.id }, (err, user) => {
                    if (user) {
                        return done(null, { id: user.id });
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