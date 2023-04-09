export interface IContact {
  id: string;
  name: string;
  email: string;
  phone: number;
}

export interface IAddContactForm {
  name: string;
  email: string;
  phone: number;
}

export interface IUserRegister {
  name: string;
  email: string;
  password: string;
  phone: number;
}

export interface IUserLogin {
  email: string;
  password: string;
}
