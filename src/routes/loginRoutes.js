const router = require('express').Router();
const crypto = require('crypto');

const generateToken = () => crypto.randomBytes(8).toString('hex');

router.post('/', (req, res) => {
  const emailValidation = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!req.body.email) res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!emailValidation.test(req.body.email)) { 
    res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
  }
  if (!req.body.password) res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (req.body.password.length >= 6) {
    res.status(200).json({ token: generateToken() });
  } else {
    res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
});

module.exports = router;
