const express = require('express');
const { ensureAuthenticated } = require('./../../ensureAuthenticated');
const passport = require('passport');
const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('Inside GET req.logout() callback\n');
    console.log(`req.session ${JSON.stringify(req.session)}\n`);
	  console.log(`req.isAuthenticated from GET /api/logout router ${req.isAuthenticated()}\n`);
    console.log(`req.session.id: ${JSON.stringify(req.session.id)}\n`);
    console.log(`req.session.user: ${JSON.stringify(req.session.user)}\n`);
    console.log(`req.user: ${JSON.stringify(req.user)}\n`);
    console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}\n`);
    
    if (req.isAuthenticated()){
        res.json({
          loggedOut: true
        })
      return req.logout();
     } 
     else
       if (!req.isAuthenticated()){
        res.json({
        loggedOut: true
        })
     } 
     next()
   });

module.exports = router;