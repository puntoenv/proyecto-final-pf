const axios = require("axios");

const petsFilter = async () => {
  const response = await axios.get(
    `https://localhost:3001/pets/filter?size=pequeño`
  );

  return response;
};

console.log(petsFilter());
