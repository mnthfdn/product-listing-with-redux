// src/store/reducers/productReducer.js

import { ADD_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT } from '../actions/productActions';

const initialState = {
  products: [{
    id: 1,
    name: 'Örnek Ürün',
    image: 'https://example.com/image.jpg',
    price: 100,
    sizes: ['M','L'],
    color:"Mavi",
    stock:true,
    
  }]
};



const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload]
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload)
      };
    case EDIT_PRODUCT:
      return {
        ...state,
        products: state.products.map(product => 
          product.id === action.payload.productId ? action.payload.updatedProduct : product
        )
      };
    default:
      return state;
  }
};

export default productReducer;
