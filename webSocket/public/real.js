console.log("socket");

const socket = io();

socket.on("products", (data) => {
  data = data
    .map(
      (each) => `
          <div class="card m-2" style="width: 250px">
            <img src="${each.photo}" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">${each.title}</h5>
              <p class="card-text">$${each.price}</p>
              <p class="card-text">Disponible: ${each.stock} unid</p>
              <a href="#" class="btn btn-dark">Comprar</a>
            </div>
          </div>`
    )
    .join("");
  console.log("se activo el primer on");
  document.querySelector("#products").innerHTML = data;
});
