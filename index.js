//1. Realizar la conexión con PostgreSQL con la clase Client
const { Client } = require("pg");

const config = {
  user: "mario",
  password: "1234",
  database: "alwaysmusic",
  host: "localhost",
  port: "5432",
};

const client = new Client(config);
client.connect();

// Se usa la propiedad argv para pasar argumentos por la linea de comandos para ejecutar
// las funciones.

const argumentos = process.argv.slice(2);

let consulta = argumentos[0];
let nombre = argumentos[1];
let rut = argumentos[2];
let curso = argumentos[3];
let nivel = argumentos[4];

//2. Crear una función asíncrona para registrar un nuevo estudiante en la base de datos.

if (consulta == "nuevo") {
  async function ingresar(nombre, rut, curso, nivel) {
    const res = await client.query(`INSERT INTO estudiante (nombre, rut, curso, nivel) VALUES ('${nombre}', '${rut}', '${curso}','${nivel}')`);
    console.log(res);
    console.log("Registro agregado con exito");
    client.end();
  }
  ingresar(nombre, rut, curso, nivel);
}

//3. Crear una función asíncrona para obtener por consola el registro de un estudiante
//por medio de su rut.

if (consulta == "consulta") {
  async function consultar(rut) {
    const res = await client.query(`SELECT * FROM estudiante WHERE rut = '${rut}'`);
    console.log(res.rows);
    client.end();
  }
  consultar(rut);
}

//4. Crear una función asíncrona para obtener por consola todos los estudiantes
// registrados.
if (consulta == "todos") {
  async function consultaTotal() {
    const res = await client.query(`SELECT * FROM estudiante`);
    console.log(res.rows);
    client.end();
  }
  consultaTotal();
}

// 5. Crear una función asíncrona para actualizar los datos de un estudiante en la base de
// datos.
if (consulta == "modificar") {
  let tabla = argumentos[1];
  let dato = argumentos[2];
  let actualizar = argumentos[3];
  let rut = argumentos[4];
  modificar(tabla, dato, actualizar, rut);

  async function modificar(tabla, dato, actualizar, rut) {
    const res = await client.query(`UPDATE ${tabla} SET ${dato} = '${actualizar}' WHERE rut = '${rut}' RETURNING *`);
    console.log("Registro modificado", res.rows[0]);
    console.log(`Se han modificado ${res.rowCount} registros`);
    client.end();
  }
}

// 6. Crear una función asíncrona para eliminar el registro de un estudiante de la base de
// datos

if (consulta == "eliminar") {
  let tabla = argumentos[1];
  let dato = argumentos[2];
  let valor = argumentos[3];
  eliminar(tabla, dato, valor);
  async function eliminar(tabla, dato, valor) {
    const res = await client.query(`DELETE FROM ${tabla} WHERE ${dato} = '${valor}'`);
    console.log(`Se han eliminado ${res.rowCount} registros`);
    client.end();
  }
}
