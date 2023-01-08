import { setFilteredPets, getPets } from "../stores/actions";

export const handlerOnChange = (e, filter, setFilter, pets, dispatch) => {
  const { name, value } = e.target;
  //   console.log(pets);
  console.log(filter);
  setFilter({
    ...filter,
    [name]: value,
  });
  let filteredPets = pets.filter((pet) => pet[name] == value);
  if (!filteredPets.length) {
    dispatch(getPets());
  }
  dispatch(setFilteredPets(filteredPets));
};
