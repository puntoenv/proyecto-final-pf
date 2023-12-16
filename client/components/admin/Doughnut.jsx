import React, { useEffect } from "react";
import { adminPets } from "../../stores/actions";
import { useDispatch, useSelector } from "react-redux";
import PetsType from "./Charts/PetsType";
const Doughtnut = () => {
  const dispatch = useDispatch();
  const pets = useSelector((state) => state.mascotas.adminPets);

  useEffect(() => {
    dispatch(adminPets());
  }, [dispatch]);

  const bird = [];

  const turtle = [];
  const rabbit = [];
  const cat = [];
  const dog = [];
  const fish = [];
  const hamster = [];
  for (let i = 0; i < pets.length; i++) {
    if (pets[i]?.type === "ave") {
      bird.push(pets[i].type);
    }
    if (pets[i]?.type === "conejo") {
      rabbit.push(pets[i].type);
    }
    if (pets[i]?.type === "gato") {
      cat.push(pets[i].type);
    }
    if (pets[i]?.type === "pez") {
      fish.push(pets[i].type);
    }
    if (pets[i]?.type === "hamster") {
      hamster.push(pets[i].type);
    }
    if (pets[i]?.type === "perro") {
      dog.push(pets[i].type);
    }
    if (pets[i]?.type === "tortuga") {
      turtle.push(pets[i].type);
    }
  }

  const birdType = bird.length;
  const turtleType = turtle.length;
  const rabbitType = rabbit.length;
  const catType = cat.length;
  const dogType = dog.length;
  const fishType = fish.length;
  const hamsterType = hamster.length;

  const pieChartData = [
    { x: "Perros", y: dogType, text: dogType },
    { x: "Gatos", y: catType, text: catType},
    { x: "Aves", y: birdType, text: birdType },
    { x: "Conejos", y: rabbitType, text: rabbitType },
    { x: "Peces", y: fishType, text: fishType  },
    { x: "Hamsters", y: hamsterType, text: hamsterType },
    { x: "Tortugas", y: turtleType, text: turtleType },
  ];
  return (
    <div>
      <PetsType data={pieChartData} legendVisiblity />
    </div>
  );
};

export default Doughtnut;
