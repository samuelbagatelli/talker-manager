const talkValidation = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) { return res.status(400).json({ message: 'O campo "talk" é obrigatório' }); }
  next();
};

const watchedAtValidation = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  const matchRegex = regex.test(watchedAt);
  if (!watchedAt) { 
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' }); 
  }
  if (!matchRegex) {
    return res.status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const rateValidation = (req, res, next) => {
  const { rate } = req.body.talk;
  if (rate < 1 || rate > 5) {
    return res.status(400)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!rate) return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  next();
};

module.exports = {
  talkValidation,
  watchedAtValidation,
  rateValidation,
};