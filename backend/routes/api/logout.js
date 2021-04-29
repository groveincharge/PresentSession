const express = require('express');
const router = express.Router();
//const {authmiddleware} = require('./../auth');

router.get('/', (req, res, next) => {
    console.log('Inside GET req.logout() callback\n');
    console.log(`req.session ${JSON.stringify(req.session)}\n`);
	  console.log(`req.isAuthenticated from GET /api/logout router ${req.isAuthenticated()}\n`);
    console.log(`req.session.id: ${JSON.stringify(req.session.id)}\n`);
    console.log(`req.user: ${JSON.stringify(req.user)}\n`);
    console.log(req);
    
    if (req.isAuthenticated()){
        res.json({message: 'you have successfully logged out!'})
      return req.logout();
     } 
     else
       if (!req.isAuthenticated()){
        res.json({message: 'you must be logged in!'})
      //return req.logout();
     } 
     next()
   });

module.exports = router;