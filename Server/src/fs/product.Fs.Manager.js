import fs from "fs";
import crypto from "crypto";

class ProductManager {
  init() {
    try {
      const file = fs.existsSync(this.path);
      if (file) {
        this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      } else {
        fs.writeFileSync(this.path, JSON.stringify([], null, 2));
        console.log("este es el else de init");
      }
    } catch (error) {
      throw error;
    }
  }
  constructor(path) {
    this.path = path;
    this.products = [];
    this.init();
  }

  //___________________ Agrego un producto al archivo ___________________

  async create(product) {
    try {
      const id = crypto.randomBytes(12).toString("hex");
      const data = [...this.products, { ...product, id: id }];
      const writeData = await fs.promises.writeFile(
        this.path,
        JSON.stringify(data, null, 2)
      );
      console.log(`Producto agregado con el id: ${id}`);
      return id;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  //___________________ Devuelvo todos los productos agregados ___________________

  async read() {
    try {
      this.products;
      if (this.products) {
        return this.products;
      } else {
        console.log("No hay productos");
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  //___________________ Devuelvo un producto por su id ___________________

  async readOne(pid) {
    try {
      const product = this.products.find((p) => (p.id = pid));
      if (product) {
        return product;
      } else {
        console.log(`No se encontro el producto con el id ${pid}`);
        return null;
      }
    } catch (error) {
      console.log(error);
      throw error;
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
      throw error;
    }
  }

  //___________________ Actualizo un producto por su id ___________________

  async update(id, data) {
    try {
      const index = this.products.findIndex((p) => p.id === id);
      if (index !== -1) {
        this.products[index] = { ...this.products[index], ...data };
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(this.products, null, 2)
        );
        console.log("Producto actualizado con exito");
      } else {
        console.log("no se encontro el producto con ese ID");
        return null;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
const products = new ProductManager("./src/fs/files/products.json");

export default products;
