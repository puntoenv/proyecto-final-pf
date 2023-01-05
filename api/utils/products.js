const Product = require("../src/models/Product");

const products = [
  {
    name: "Remera Little Paws",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    price: 2000,
    image: "https://random.imagecdn.app/500/150",
    stock: 10,
    category: ["Productos Little Paws", "Los mas vendidos"],
    boughtBy: [],
  },
  {
    name: "Taza Little Paws",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    price: 1000,
    image: "https://random.imagecdn.app/500/150",
    stock: 10,
    category: ["Productos Little Paws", "Los mas vendidos"],
    boughtBy: [],
  },
  {
    name: "Gorra Little Paws",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    price: 1500,
    image: "https://random.imagecdn.app/500/150",
    stock: 10,
    category: ["Productos Little Paws", "Los mas vendidos"],
    boughtBy: [],
  },
  {
    name: "Collar para perros",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    price: 1200,
    image: "https://random.imagecdn.app/500/150",
    stock: 10,
    category: ["Accesorios para perros"],
    boughtBy: [],
  },
  {
    name: "Collar para gatos",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    price: 1200,
    image: "https://random.imagecdn.app/500/150",
    stock: 10,
    category: ["Accesorios para gatos"],
    boughtBy: [],
  },
  {
    name: "Peine cepillo deslanador para perros",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    price: 800,
    image: "https://random.imagecdn.app/500/150",
    stock: 10,
    category: ["Accesorios para perros"],
    boughtBy: [],
  },
  {
    name: "Jaula transportadora para mascotas",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    price: 3000,
    image: "https://random.imagecdn.app/500/150",
    stock: 10,
    category: ["Accesorios para perros", "Accesorios para gatos"],
    boughtBy: [],
  },
  {
    name: "Mochila transportadora para mascotas",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    price: 3000,
    image: "https://random.imagecdn.app/500/150",
    stock: 10,
    category: ["Accesorios para perros", "Accesorios para gatos"],
    boughtBy: [],
  },
  {
    name: "10 Pañales para mascotas",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    price: 1500,
    image: "https://random.imagecdn.app/500/150",
    stock: 10,
    category: ["Accesorios para perros", "Accesorios para gatos"],
    boughtBy: [],
  },
  {
    name: "Cama antidesgarro para mascotas",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    price: 3500,
    image: "https://random.imagecdn.app/500/150",
    stock: 10,
    category: ["Accesorios para perros", "Accesorios para gatos"],
    boughtBy: [],
  },
  {
    name: "Juguete para perros",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    price: 3500,
    image: "https://random.imagecdn.app/500/150",
    stock: 10,
    category: ["Accesorios para perros"],
    boughtBy: [],
  },
];

const collection = async() => {
  try {
    await Product.insertMany(products);
  } catch (error) {
    error: error.message;
  }
};

collection();



