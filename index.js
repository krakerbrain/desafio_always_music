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
// Se crea validación para el primer elemento argv[0] que será el encargado de invocar la función

const argumentos = process.argv.slice(2);

if (argumentos[0] == "nuevo") {
  const nombre = argumentos[1];
  const rut = argumentos[2];
  const curso = argumentos[3];
  const nivel = argumentos[4];
  ingresar(nombre, rut, curso, nivel);
} else if (argumentos[0] == "consulta") {
  const rut = argumentos[1];
  console.log(rut);
  consultar(rut);
} else if (argumentos[0] == "todos") {
  consultaTotal();
} else if (argumentos[0] == "modificar") {
  const tabla = argumentos[1];
  const dato = argumentos[2];
  const actualizar = argumentos[3];
  const rut = argumentos[4];
  modificar(tabla, dato, actualizar, rut);
  console.log(tabla, dato, actualizar, rut);
} else if ((argumentos[0] = "eliminar")) {
  const tabla = argumentos[1];
  const dato = argumentos[2];
  const valor = argumentos[3];
  eliminar(tabla, dato, valor);
}

//2. Crear una función asíncrona para registrar un nuevo estudiante en la base de datos.

async function ingresar(nombre, rut, curso, nivel) {
  const res = await client.query(`INSERT INTO estudiante (nombre, rut, curso, nivel) VALUES ('${nombre}', '${rut}', '${curso}','${nivel}')`);
  console.log(res);
  console.log("Registro agregado con exito");
  client.end();
}

//3. Crear una función asíncrona para obtener por consola el registro de un estudiante
//por medio de su rut.

async function consultar(rut) {
  const res = await client.query(`SELECT * FROM estudiante WHERE rut = '${rut}'`);
  console.log(res.rows);
  client.end();
}

//4. Crear una función asíncrona para obtener por consola todos los estudiantes
// registrados.

async function consultaTotal() {
  const res = await client.query(`SELECT * FROM estudiante`);
  console.log(res.rows);
  client.end();
}

// 5. Crear una función asíncrona para actualizar los datos de un estudiante en la base de
// datos.

async function modificar(tabla, dato, actualizar, rut) {
  const res = await client.query(`UPDATE ${tabla} SET ${dato} = '${actualizar}' WHERE rut = '${rut}' RETURNING *`);
  console.log("Registro modificado", res.rows[0]);
  console.log(`Se han modificado ${res.rowCount} registros`);
  client.end();
}

// 6. Crear una función asíncrona para eliminar el registro de un estudiante de la base de
// datos

async function eliminar(tabla, dato, valor) {
  const res = await client.query(`DELETE FROM ${tabla} WHERE ${dato} = '${valor}'`);
  console.log(`Se han eliminado ${res.rowCount} registros`);
  client.end();
}
