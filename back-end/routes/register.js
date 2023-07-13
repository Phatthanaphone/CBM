const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const db = require('../database/dbRegister');

  
router.post('/register', async function (req,res) {
     try {
            const {name,email, password } = req.body
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(password, salt);
            console.log(hashPassword)
            console.log(req.body)
         let result = []
         result = await db.post(name,email,hashPassword)
         res.json(result)
         
     }
     catch(error) {
          console.log(error)
          res.status(400).send({message:error.message})
     }
});

module.exports = router;