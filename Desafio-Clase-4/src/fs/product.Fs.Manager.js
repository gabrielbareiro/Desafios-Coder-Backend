import fs, { readFileSync } from "fs";
import crypto from "crypto";

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.init();
  }
  init() {
    const file = fs.existsSync(this.path);
    if (file) {
      this.products = JSON.parse(readFileSync(this.path, "utf-8"));
    } else {
      fs.writeFileSync(this.path, JSON.stringify([], null, 2));
      console.log(this.products);
    }
  }

  //___________________ Agrego un producto al archivo ___________________

  async create(product) {
    try {
      if (
        product.title !== "" &&
        product.photo !== "" &&
        product.price >= 0 &&
        product.stock >= 0
      ) {
        const id = crypto.randomBytes(12).toString("hex");
        const data = [...this.products, { ...product, id: id }];
        const writeData = await fs.promises.writeFile(
          this.path,
          JSON.stringify(data, null, 2)
        );
        console.log(`Producto agregado con el id: ${id}`);
      } else {
        console.log("Todos los campos son obligatorios");
      }
    } catch (error) {
      return error.message;
    }
  }

  //___________________ Devuelvo todos los productos agregados ___________________

  async read() {
    try {
      if (this.products) {
        return console.log(this.products);
      } else {
        console.log("No hay productos");
      }
    } catch (error) {
      return error.message;
    }
  }

  //___________________ Devuelvo un producto por su id ___________________

  async readOne(id) {
    try {
      const product = this.products.find((product) => product.id === id);
      if (product) {
        return console.log(product);
      } else {
        console.log(`No se encontro el producto con el id ${id}`);
        return null;
      }
    } catch (error) {
      return error.message;
    }
  }
}

let products = new ProductManager("./src/fs/data/products.Fs.json");

// products.create({
//   title: "Producto Prueba1",
//   photo: "Ruta de la foto1",
//   price: 200,
//   stock: 25,
// });

//products.read();

products.readOne("aa8a043e85a6161f37a37b77");
