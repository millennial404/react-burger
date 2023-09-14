export type productsPropTypes = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  uuid?: string;
  count: number;
};

export type burgerObjectPropTypes = {
  bun: Array<productsPropTypes>;
  components: Array<productsPropTypes>;
};

export type TOrder ={
  _id: string;
  ingredients: string[];
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
};