const Pet = require("../../models/Pet");

const petsFiltered = async (typesFilters) => {
  let petsFiltered = [];
  for (const key in typesFilters) {
    if (typesFilters[key] !== undefined) {
      const pets = await Pet.find({
        [key]: typesFilters[key],
      });
      petsFiltered = pets;
    }
  }
  const petsSet = [...new Set(petsFiltered.map((p) => p.id))];
  const pets = await Pet.find({ _id: petsSet });
  return pets;
};

module.exports = petsFiltered;
