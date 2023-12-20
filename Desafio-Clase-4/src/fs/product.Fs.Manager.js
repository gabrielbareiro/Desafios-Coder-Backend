import fs, { readFileSync } from "fs";

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
      const dataFile = JSON.parse(
        await fs.promises.readFile(this.path, "utf-8")
      );
      if (
        product.title !== "" &&
        product.photo !== "" &&
        product.price >= 0 &&
        product.stock >= 0
      ) {
        const data = dataFile
          ? [...dataFile, { ...product, id: dataFile.length + 1 }]
          : [{ ...product, id: dataFile.length + 1 }];
        const writeData = await fs.promises.writeFile(
          this.path,
          JSON.stringify(data, null, 2)
        );
        console.log(`Producto agregado con el id: ${dataFile.length + 1}`);
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
      const dataFile = JSON.parse(
        await fs.promises.readFile(this.path, "utf-8")
      );
      if (dataFile.length) {
        return console.log(dataFile);
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
      const dataFile = JSON.parse(
        await fs.promises.readFile(this.path, "utf-8")
      );
      const product = dataFile.find((product) => product.id === id);
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
//   title: "Producto Prueba",
//   photo: "Ruta de la foto",
//   price: 200,
//   stock: 25,
// });

//products.read();

products.readOne(1);
