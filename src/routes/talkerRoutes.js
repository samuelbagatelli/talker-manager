const router = require('express').Router();
const fs = require('fs');
const path = require('path');

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

module.exports = router;