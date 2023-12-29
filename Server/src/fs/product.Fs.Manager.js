import fs from "fs";
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
      this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
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
        return id;
      } else {
        console.log("Todos los campos son obligatorios");
      }
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  //___________________ Devuelvo todos los productos agregados ___________________

  async read() {
    try {
      if (this.products) {
        return this.products;
      } else {
        console.log("No hay productos");
      }
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  //___________________ Devuelvo un producto por su id ___________________

  async readOne(id) {
    try {
      const product = this.products.find((p) => p.id === id);
      if (product) {
        return product;
      } else {
        console.log(`No se encontro el producto con el id ${id}`);
        return null;
      }
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  //___________________ Elimino un producto por su id ___________________

  async destroy(id) {
    try {
      const product = this.products.find((p) => p.id === id);
      if (product) {
        this.products = this.products.filter((p) => p.id !== id);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(this.products, null, 2)
        );
        console.log("eliminado con exito");
        return product;
      } else {
        console.log("No hay un producto con ese id");
      }
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }
}

export default ProductManager;
