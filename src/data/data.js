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
  { id: "def_col_1", name: "Red", hash: "#ff1100" },
  { id: "def_col_2", name: "Green", hash: "#00a80b" },
  { id: "def_col_3", name: "Blue", hash: "#0019bf" },
  { id: "def_col_4", name: "Yellow", hash: "#edea13" },
  { id: "def_col_5", name: "White", hash: "#ffffff" },
  { id: "def_col_6", name: "Black", hash: "#000000" },
];

export const emptyColor = { name: "", hash: "" };

export const Occasion = ["Sport", "Formal", "Everyday"];

export const emptyClothing = {
  category: "",
  type: "",
  colors: [],
  rating: 1,
  occasion: "",
};
