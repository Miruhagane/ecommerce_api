const express = require("express");
const app = express();
const cors = require("cors");
const products = require("./products.json");

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
  response.send("<h1> hola mundo </h1>");
});

app.get("/api/products", (request, response) => {
  response.json(products);
});

app.get("/api/products/:id", (request, response) => {
  const productid = Number(request.params.id);
  const product = products.find((product) => product.ID === productid);
  response.send(product);
});

app.post("/api/checkout", (request, response) => { 
  const body = request.body;
  let totalprice = 0;
  body.forEach(item => {
    if (item.category_type === 1 || item.category_type === 2) { 
      if (item.category_type === 1) {
        let total;
        if (item.quantity === 1) { 
          total = item.quantity * item.Prices;
        }
        if (item.quantity === 2) { 
          total = item.quantity * item.Prices;
          item.quantity = item.quantity + 1;
        }
        if (item.quantity === 3) { 
          total = (item.quantity * item.Prices) - item.Prices;
        }
        if (item.quantity > 3) { 
          total = item.quantity * item.Prices;
          let raiz = Math.floor(Math.sqrt(item.quantity));
          let descuento = item.Prices * raiz;
          total = total - descuento;
        }
        totalprice = totalprice + total;
      }
      if (item.category_type === 2) {
        if (item.quantity >= 3) {
          let finalprice = item.Prices / 4;
          finalprice = item.Prices - finalprice;
          finalprice = item.quantity * finalprice
          totalprice = totalprice + finalprice;
        }
        else { 
          let total;
      total = item.quantity * item.Prices;
      totalprice = totalprice + total;
        }
        
      }
    }
    if (item.category_type === 3) {
      let total;
      total = item.quantity * item.Prices;
      totalprice = totalprice + total;
    }
   
  });
  body.push({"finalprice" :totalprice })
  response.send(body)
})

app.listen(8080, () => {
  console.log("En servicio");
}); //the server object listens on port 8080
