const Pet = require("../../../db/models");

const petsFiltered = async (typesFilters) => {
  let petsFiltered = [];

  for (const key in typesFilters) {
    const pets = await Pet.find({ key: typesFilters[key] });
    petsFiltered.concat(pets);
  }
  return petsFiltered;
};

module.exports = petsFiltered;
