import fs from "fs";
import crypto from "crypto";

class OrderManager {
  constructor(path) {
    this.orders = [];
    this.path = path;
    this.init();
  }

  init() {
    const file = fs.existsSync(this.path);
    if (file) {
      this.orders = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    } else {
      fs.writeFileSync(this.path, JSON.stringify([], null, 2));
      console.log(this.orders);
    }
  }

  async create(data) {
    try {
      const {} = data;
      const id = crypto.randomBytes(12).toString("hex");
      const one = [...this.orders, { id: id, uid: data, products: [] }];
      await fs.promises.writeFile(this.path, JSON.stringify(one, null, 2));
      console.log(`order added with id: ${id}`);
      return;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async read() {
    try {
      if (this.orders) {
        return this.orders;
      } else {
        console.log("no hay ordenes");
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async readOne() {
    try {
      const order = this.orders.find((o) => o.id === id);
      if (order) {
        return order;
      } else {
        console.log(`No se encontro la orden con el id ${id}`);
        return null;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update(oid, pid, quantity, state) {
    try {
      const order = this.orders.find((order) => order.id === oid);
      if (!order) {
        console.log(`Order with ID ${oid} not found`);
        return;
      }

      let product = order.products.find((product) => product.id === productId);

      if (!product) {
        product = { id: pid, quantity, state };
        order.products.push(product);
        console.log(`Product with ID ${pid} added to order ${oid}`);
      } else {
        product.quantity = quantity;
        product.state = state;
        console.log(`Product with ID ${pid} updated in order ${oid}`);
      }

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.orders, null, 2)
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async destroy(oid) {
    try {
      const orderIndex = this.orders.findIndex((order) => order.id === oid);

      if (orderIndex === -1) {
        console.log(`Order with ID ${oid} not found`);
        return;
      }

      this.orders.splice(orderIndex, 1);

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.orders, null, 2)
      );
      console.log(`Order with ID ${oid} has been deleted`);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

const orders = new OrderManager("./src/fs/files/orders.json");
export default orders;
