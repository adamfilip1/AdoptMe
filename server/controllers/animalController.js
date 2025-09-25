import animals from '../data/zvirata.json' assert { type: 'json' };

export const getAllAnimals = (req, res) => {
  res.json(animals);
};

export const getAnimalById = (req, res) => {
  const animal = animals.find(a => a.id === req.params.id);
  if (!animal) {
    return res.status(404).json({ code: 'animalDoesNotExist', message: 'Zvíře nebylo nalezeno' });
  }
  res.json(animal);
};
