//data en formato JSON
let data = `{
    "mares": [
      {
        "id": "0",
        "nombre": "Mar Argentino",
        "continente": "America"
      },
      {
        "id": "1",
        "nombre": "Mar Celta",
        "continente": "Europa"
      },
      {
        "id": "2",
        "nombre": "Mar Negro",
        "continente": "Europa"
      },
      {
        "id": "3",
        "nombre": "Mar Rojo",
        "continente": "Asia"
      }
    ]
}`
//convertimos la data en formato JSON a un objeto JS para poder acceder a sus propiedades
let dataParseada = JSON.parse(data);

//obtenemos las claves del objeto persona
let clavesMares = Object.keys(dataParseada.mares[0]);

