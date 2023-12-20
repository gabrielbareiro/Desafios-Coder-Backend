import fs, { readFileSync } from "fs";

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
      const dataFile = JSON.parse(
        await fs.promises.readFile(this.path, "utf-8")
      );
      if (
        dataFile.some((e) => e.email === user.email) !== true &&
        user.name !== "" &&
        user.photo !== ""
      ) {
        const data = dataFile
          ? [...dataFile, { ...user, id: dataFile.length + 1 }]
          : [{ ...user, id: dataFile.length + 1 }];
        const writeData = await fs.promises.writeFile(
          this.path,
          JSON.stringify(data, null, 2)
        );
        console.log(`Usuario agregado con el id: ${dataFile.length + 1}`);
      } else {
        const log = dataFile.some((e) => e.email === user.email)
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
      const dataFile = JSON.parse(
        await fs.promises.readFile(this.path, "utf-8")
      );
      if (dataFile.length) {
        return console.log(dataFile);
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
      const dataFile = JSON.parse(
        await fs.promises.readFile(this.path, "utf-8")
      );
      const user = dataFile.find((user) => user.id === id);
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

// users.create({
//   name: "nombre",
//   photo: "ruta de la foto",
//   email: "email de prueba",
// });

//users.read();

//users.readOne(1);
