export interface ICollection {
  name: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  image: string;
}

export interface IProduct {
  name: string;
  Collection: {
    name: string;
  };

  createdAt: string;
  updatedAt: string;
  id: string;
  price: number;
  stock: number;
}

export interface ICreateProduct {
  name: string;
  collectionId: string;
  price: string;
  description: string;
  features: string[];
  case: string;
  strap: string;
  warranty: string;
  dialColor: string;
  waterResistance: string;
  movement: string;
  crystal: string;
  diameter: string;
  length: string;
  thickness: string;
}

export interface IUpdateProduct {
  name: string;
  collectionId: string;
  price: string;
  description: string;
  case: string;
  strap: string;
  warranty: string;
  dialColor: string;
  waterResistance: string;
  movement: string;
  crystal: string;
  diameter: string;
  length: string;
  thickness: string;
}
