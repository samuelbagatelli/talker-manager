const talkValidation = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  next();
};

const watchedAtValidation = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  const matchRegex = regex.test(watchedAt);
  if (!watchedAt) res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  if (!matchRegex) {
    res.status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    console.log(watchedAt.match(regex));
    console.log('OK doesnt match');
  }
  next();
};

const rateValidation = (req, res, next) => {
  const { rate } = req.body.talk;
  if (!rate) res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  if (rate < 1 || rate > 5) {
    res.status(400)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' }); 
  }
  next();
};

module.exports = {
  talkValidation,
  watchedAtValidation,
  rateValidation,
};