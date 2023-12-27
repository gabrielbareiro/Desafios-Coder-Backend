import fs, { readFileSync } from "fs";
import crypto from "crypto";

class UserManager {
  constructor(path) {
    this.path = path;
    this.users = [];
    this.init();
  }

  init() {
    const file = fs.existsSync(this.path);
    if (file) {
      this.users = JSON.parse(readFileSync(this.path, "utf-8"));
    } else {
      fs.writeFileSync(this.path, JSON.stringify([], null, 2));
      console.log(this.users);
    }
  }

  //___________________ Agrego un usuario al archivo ___________________

  async create(user) {
    try {
      if (
        this.users.some((e) => e.email === user.email) !== true &&
        user.name !== "" &&
        user.photo !== ""
      ) {
        const id = crypto.randomBytes(12).toString("hex");
        const data = [...this.users, { ...user, id: id }];
        const writeData = await fs.promises.writeFile(
          this.path,
          JSON.stringify(data, null, 2)
        );
        console.log(`Usuario agregado con el id: ${id}`);
      } else {
        const log = this.users.some((e) => e.email === user.email)
          ? console.log("Este email ya esta registrado")
          : console.log("Todos los campos son obligatorios");
      }
    } catch (error) {
      return error.message;
    }
  }

  //___________________ Devuelvo todos los usuarios agregados ___________________

  async read() {
    try {
      if (this.users) {
        return console.log(this.users);
      } else {
        console.log("No hay usuarios");
      }
    } catch (error) {
      return error.message;
    }
  }

  //___________________ Devuelvo un usuario por su id ___________________

  async readOne(id) {
    try {
      const user = this.users.find((user) => user.id === id);
      if (user) {
        return console.log(user);
      } else {
        console.log(`No se encontro el usuario con el id ${id}`);
      }
    } catch (error) {
      return error.message;
    }
  }
}

let users = new UserManager("./src/fs/data/users.Fs.json");

users.create({
  name: "nombre",
  photo: "ruta de la foto",
  email: "email de prueba2",
});

users.read();

users.readOne("4fa1a4442772f36aab2620f8");
