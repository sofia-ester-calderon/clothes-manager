const TOPS = "Tops";
const BOTTOMS = "Bottoms";
const UNDERWEAR = "Underwear";
const SHOES = "Shoes";
const ACCESSORIES = "Accessories";

export const Categories = [TOPS, BOTTOMS, UNDERWEAR, SHOES, ACCESSORIES];

const TypeSweater = { id: 1, name: "Sweater", category: TOPS };
const TypeTShirt = { id: 2, name: "T-Shirt", category: TOPS };
const TypeJeans = { id: 3, name: "Jeans", category: BOTTOMS };
const TypeSkirt = { id: 4, name: "Leggings", category: BOTTOMS };
const TypeBra = { id: 5, name: "Bra", category: UNDERWEAR };
const TypeSocks = { id: 6, name: "Socks", category: UNDERWEAR };
const TypeBoots = { id: 7, name: "Boots", category: SHOES };
const TypeSneakers = { id: 8, name: "Sneakers", category: SHOES };
const TypeEarrings = { id: 9, name: "Earrings", category: ACCESSORIES };
const TypeScarf = { id: 10, name: "Scarf", category: ACCESSORIES };

export const Types = [
  TypeSweater,
  TypeTShirt,
  TypeJeans,
  TypeSkirt,
  TypeBra,
  TypeSocks,
  TypeBoots,
  TypeSneakers,
  TypeEarrings,
  TypeScarf,
];

export const Colors = [
  { name: "Red", rgb: "#ff1100" },
  { name: "Green", rgb: "#00a80b" },
  { name: "Blue", rgb: "#0019bf" },
  { name: "Yellow", rgb: "#edea13" },
  { name: "White", rgb: "#ffffff" },
  { name: "Black", rgb: "#000000" },
];

export const Occasion = ["Sport", "Formal", "Everyday"];

export const emptyClothing = {
  id: Math.floor(Math.random() * 1000),
  category: "",
  type: "",
  colors: [],
  rating: 1,
  occasion: "",
};

export const clothesData = [
  {
    id: 1,
    category: TOPS,
    type: "Sweater",
    colors: ["Red"],
    rating: 5,
    occasion: "Everyday",
  },
  {
    id: 2,
    category: TOPS,
    type: "T-Shirt",
    colors: ["Red", "Green", "Blue", "Black"],
    rating: 4,
    occasion: "Sport",
  },
  {
    id: 3,
    category: BOTTOMS,
    type: "Jeans",
    colors: ["Blue"],
    rating: 2,
    occasion: "Everyday",
  },
  {
    id: 4,
    category: BOTTOMS,
    type: "Leggings",
    colors: ["Black"],
    rating: 1,
    occasion: "Sport",
  },
  {
    id: 5,
    category: UNDERWEAR,
    type: "Bra",
    colors: ["Yellow", "Green"],
    rating: 3,
    occasion: "Sport",
  },
  {
    id: 6,
    category: UNDERWEAR,
    type: "Socks",
    colors: ["Black"],
    rating: 5,
    occasion: "Formal",
  },
  {
    id: 7,
    category: SHOES,
    type: "Boots",
    colors: ["Blue", "Green"],
    rating: 2,
    occasion: "Formal",
  },
  {
    id: 8,
    category: SHOES,
    type: "Sneakers",
    colors: ["White", "Red"],
    rating: 4,
    occasion: "Sport",
  },
  {
    id: 9,
    category: ACCESSORIES,
    type: "Earrings",
    colors: ["Yellow"],
    rating: 3,
    occasion: "Formal",
  },
  {
    id: 10,
    category: ACCESSORIES,
    type: "Scarf",
    colors: ["Black", "Red"],
    rating: 4,
    occasion: "Everyday",
  },
];
