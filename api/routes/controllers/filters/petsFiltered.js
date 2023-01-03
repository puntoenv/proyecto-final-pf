const Pet = require("../../../models/Pet.js");

const petsFiltered = async (typesFilters) => {
  let petsFiltered = [];

  for (const key in typesFilters) {
    if (typesFilters[key] !== undefined) {
      console.log(typesFilters[key]);
      const pets = await Pet.find({ key: typesFilters[key] });

      const petsSet = new Set(pets.map((p) => p._id));
      const data = Array.from(petsSet);
      console.log(data);
      petsFiltered = [...petsFiltered, ...data];
    }
  }
  return petsFiltered;
};

module.exports = petsFiltered;
