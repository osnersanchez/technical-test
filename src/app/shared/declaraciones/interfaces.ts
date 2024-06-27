export interface ProductData {
  id: string;
  name: string;
  price: number;
  stock: number;
  description?: string;
  rating?: number;
  priceBeforeDiscount?: number;
  category: 'vegetal' | 'fruta';
  imgUrl?: string;
}

export interface PersonalInfo {
  name: string;
  lastName: string;
}

export interface ContactInfo {
  cellphone: string;
  direction?: string;
  email: string;
}

export interface RegistrationForm {
  personalInfo: PersonalInfo;
  contactInfo: ContactInfo;
  password: string;
}

export interface ProductCart {
  id?: string;
  quantity?: number;
  product: ProductData;
}

export interface UserData {
  id: string;
  name: string;
  lastName: string;
  uuid: string;
  token: string;
}
