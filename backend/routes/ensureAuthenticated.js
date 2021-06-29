    function ensureAuthenticated(req, res, next) {
	console.log('ensureAuthenticated callback')
	console.log(req.isAuthenticated())
	if(req.isAuthenticated()) {
	  next()
	} else {
	  res.redirect('/api/users/login')
	}
  }
  module.exports = ensureAuthenticated