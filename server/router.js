const Authentication = require('./controllers/authentication')
require('./services/passport')
const passport = require('passport')

const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', { session: false })

module.exports = function(app) {
  //login and authentication
  app.post('/auth/signup', Authentication.signup),
  app.post('/auth/signin', 
  requireSignin, 
  Authentication.signin)
  app.get('/auth/current_user', requireAuth, Authentication.currentUser)

  //adding new user to database
  app.post('')
}
