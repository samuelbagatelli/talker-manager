const router = require('express').Router();
const crypto = require('crypto');
// const fs = require('fs');
// const path = require('path');

// const pathname = path.resolve(__dirname, '../talker.json');

const generateToken = () => crypto.randomBytes(8).toString('hex');

router.post('/', (req, res) => {
  const emailValidation = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (emailValidation.test(req.body.email)) res.status(200).json({ token: generateToken() });
});

module.exports = router;
