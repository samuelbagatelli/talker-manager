const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const ageValidation = require('../middlewares/age');
const nameValidation = require('../middlewares/name');
const { talkValidation, watchedAtValidation, rateValidation } = require('../middlewares/talk');
const tokenValidation = require('../middlewares/token');

const pathname = path.resolve(__dirname, '../talker.json');

router.get('/', (_req, res) => {
  const results = fs.readFileSync(pathname);
  res.status(200).json(JSON.parse(results));
});

router.get('/:id', (req, res) => {
  const response = JSON.parse(fs.readFileSync(pathname));
  const results = response.find((elem) => elem.id === Number(req.params.id));
  if (results) {
    res.status(200).json(results);
  }
  res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

router.post('/',
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  rateValidation,
  watchedAtValidation,
  (req, res) => {
    const response = JSON.parse(fs.readFileSync(pathname));
    const newTalker = {
      id: response.length + 1,
      ...req.body,
    };
    if (req.body) fs.writeFileSync(pathname, JSON.stringify([...response, newTalker]));
    res.status(201).json(newTalker);
});

router.put('/:id',
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  rateValidation,
  watchedAtValidation,
  (req, res) => {
    const id = Number(req.params.id);
    const response = JSON.parse(fs.readFileSync(pathname));
    const attTalker = {
      id,
      ...req.body,
    };
    const indexOfId = response.findIndex((elem) => elem.id === id);
    console.log(indexOfId);
    response.splice(indexOfId, 1, attTalker);
    console.log(response);
    fs.writeFileSync(pathname, JSON.stringify(response));
    res.status(200).json(attTalker);
});

module.exports = router;