export interface IAdress {
  country: string;
  city: string;
  street: string;
  house: string;
}

export interface IShippingFields {
  email: string;
  name: string;
  adress: IAdress;
}

export interface IOption {
  value: string;
  label: string;
}
