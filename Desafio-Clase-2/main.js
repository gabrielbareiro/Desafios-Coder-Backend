class ProductManager {
  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
  static products = [];

  //___________________ Genero in ID incremental ___________________

  idNumber = () => ProductManager.products.length + 1;

  //___________________ Agrego un producto ___________________
  addProducts(product) {
    if (
      product.title !== "" &&
      product.description !== "" &&
      product.price > 0 &&
      product.code > 0 &&
      product.stock >= 0
    ) {
      if (
        ProductManager.products.some((num) => num.code === product.code) !==
        true
      ) {
        product.id = this.idNumber();
        ProductManager.products.push(product);
        console.log(
          `Producto ${product.title} agregado con exito con el id: ${product.id}`
        );
      } else {
        console.log(`Este producto ya existe`);
      }
    } else {
      console.log("Todos los campos son obligatorio");
    }
  }
  //___________________ Devuelvo todos los productos guardados ___________________

  getProducts = () => {
    const allPoducts = ProductManager.products;
    return console.log({ allPoducts });
  };

  //___________________ Devuelvo un producto por su id ___________________

  getProductById(id) {
    const product = ProductManager.products.find(
      (product) => product.id === id
    );
    if (product) {
      return { product };
    } else {
      console.log("El id no existe");
    }
  }
}

let productos = new ProductManager();

productos.addProducts({
  title: "pitusas",
  description: "dulces",
  price: 170,
  thumbnail: "https://www.mialmacenamigo.com.ar/wp-content/uploads/0041-1.jpg",
  code: 787,
  stock: 2,
});

productos.addProducts({
  title: "manaos",
  description: "gaseosas",
  price: 450,
  thumbnail:
    "https://http2.mlstatic.com/D_NQ_NP_716200-MLA43739181284_102020-O.jpg",
  code: 187,
  stock: 9,
});

productos.addProducts({
  title: "banana",
  description: "fruta",
  price: 550,
  thumbnail: "https://www.cucinare.tv/wp-content/uploads/2020/08/Bananas1.jpg",
  code: 1827,
  stock: 88,
});

productos.getProductById(2);

productos.getProducts();
