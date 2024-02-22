# Desafio-Clase-10

Estoy usando la version v18.15.0 de node.js, para el desarrollo uso el script: "node --watch ./src/app.js"

El servidor corre con el script:

```bash
npm run dev
```

#### Todos los end points fueron probados

#### Endpoints probados para productos en tiempo real:

##### Socket + Handlebars: agrego un producto.

title = "Longos - Assorted Sandwich",
photo = "http://dummyimage.com/250x250.png/5fa2dd/ffffff",
price = 656,
stock = 414

```http
localhost:8080/products/form
```

##### Socket + Handlebars: devuelvo todos los productos añadidos hasta el momento

```http
localhost:8080/products/real
```

##### Handlebars: muestro un formulario de registro

```http
localhost:8080/register
```
