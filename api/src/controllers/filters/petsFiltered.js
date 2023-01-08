const Pet = require("../../models/Pet");

// const petsFiltered = async ({ type, size, gender, age }) => {
//   let petsFiltered = await Pet.find({
//     ,
//     gender: gender || null,
//   });=

// if (type && size && gender && age) {
//   petsFiltered = [...petsFiltered, ...(await Pet.find({ type }))];
// }else if(type && size && gender)

//   console.log(petsFiltered);
//   // const petsSet = [...new Set(petsFiltered.map((p) => p.id))];
//   // const pets = await Pet.find({ _id: petsSet, hidden: false });
//   return petsFiltered;
// };

const petsFiltered = async (typesFilters) => {
  let petsFiltered = [];
  for (const key in typesFilters) {
    if (typesFilters[key] !== undefined) {
      console.log(typesFilters[key]);
      petsFiltered = [
        ...petsFiltered,
        ...(await Pet.find({
          gender: "macho",
          age: null,
          size: "mediano",
        })),
      ];
    }
  }
  console.log(petsFiltered);
  const petsSet = [...new Set(petsFiltered.map((p) => p.id))];
  const pets = await Pet.find({ _id: petsSet, hidden: false });
  return pets;
};

module.exports = petsFiltered;
