export class Driver {
  id: number;
  name: string;
  surname: string;
  profilePicture: string;
  telephoneNumber: string;
  email: string;
  address: string;
  password: string;
}

export class NoIdDriver {
  name: string;
  surname: string;
  profilePicture: string;
  telephoneNumber: string;
  email: string;
  address: string;
  password: string;

  constructor(driver: Driver) {
    this.name = driver.name;
    this.surname = driver.surname;
    this.profilePicture = driver.profilePicture;
    this.email = driver.telephoneNumber;
    this.address = driver.address;
    this.password = driver.password;
  }
}
