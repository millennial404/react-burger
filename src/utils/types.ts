
export type productsPropTypes =  {
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
  }

export type burgerObjectPropTypes = {
    bun: Array<productsPropTypes>;
    components: Array<productsPropTypes>;
}