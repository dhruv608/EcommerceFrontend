export interface Category {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  productCount:number;
}


export interface ProductContent {
id:number;
name:string;
description:string;
price:number;
stock:number;
isActive:boolean;
isFeatured:boolean;
images:string[];
category:Category;

}

export interface Product {
  content: ProductContent[];  
  totalPages: number;
  totalElements: number;
  number: number;   // current page
  size: number;
  first: boolean;
  last: boolean;
}

// Type for single product response
export type SingleProduct = ProductContent;

// sirf form ke liye type
export interface ProductForm {
  name: string;
  description: string;
  price: string;     // input se string aata hai
  stock: string;
  categoryId: string;
  isActive: boolean;
  isFeatured: boolean;
}


