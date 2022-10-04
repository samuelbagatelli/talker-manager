const router = require('express').Router();
const fs = require('fs');
const path = require('path');

router.get('/', (_req, res) => {
  const pathname = path.resolve(__dirname, '../talker.json');
  const results = fs.readFileSync(pathname);
  res.status(200).json(JSON.parse(results));
});

module.exports = router;