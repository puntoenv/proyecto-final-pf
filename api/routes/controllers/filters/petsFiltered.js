const Pet = require("../../../db/models");

const filteredByType = async (type) => {
  const petsFiltered = await Pet.find({
    type,
  });

  return petsFiltered;
};

const filteredBySize = async (sizeCm) => {
  const petsFiltered = await Pet.find({
    sizeCm,
  });

  return petsFiltered;
};

const filteredByWeight = async (weightKg) => {
  const petsFiltered = await Pet.find({
    weightKg,
  });

  return petsFiltered;
};
const filteredByTemperament = async (temperament) => {
  const petsFiltered = await Pet.find({
    temperament,
  });

  return petsFiltered;
};

module.exports = {
  filteredByType,
  filteredBySize,
  filteredByWeight,
  filteredByTemperament,
};
