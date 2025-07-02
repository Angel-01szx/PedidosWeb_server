const express = require('express');
require('dotenv').config();
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

// Configuración de la app de Express
const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || '*' }));
app.use(bodyParser.json());
app.use(compression());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 900, // Máximo de solicitudes por IP
});
app.use(limiter);

// Conexión a la base de datos MySQL
const dbPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Función genérica para ejecutar consultas
const executeQuery = async (query, params = []) => {
  const connection = await dbPool.getConnection();
  try {
    const [results] = await connection.execute(query, params);
    return results;
  } finally {
    connection.release();
  }
};

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({ error: err.message || 'Error en el servidor' });
});

// Rutas

// Autenticación de usuario
app.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Usuario y contraseña son requeridos' });
  }

  try {
    const results = await executeQuery(
      'SELECT codper, ptventa, nivel FROM acceso WHERE usuario = ? AND coduser = ?',
      [username, password]
    );

    if (results.length > 0) {
      const { codper, ptventa, nivel } = results[0];
      res.status(200).json({ message: 'Autenticación exitosa', codper, ptventa, nivel });
    } else {
      res.status(401).json({ error: 'Credenciales incorrectas' });
    }
  } catch (err) {
    next(err);
  }
});

// Consulta de sedes
app.get('/sedes', async (req, res, next) => {
  try {
    const results = await executeQuery(
      'SELECT sede, descrip FROM sedes'
    );
    res.status(200).json(results);
  } catch (err) {
    next(err);
  }
});


// Guardar o actualizar cliente
app.post('/clientes/guardar/:nruc', async (req, res, next) => {
  const { nruc } = req.params;
  const { nomcli, direcc, telefono, email, distrito, ubigeo } = req.body;

  if (!nruc || !nomcli) {
    return res.status(400).json({ error: 'nruc y nomcli son requeridos' });
  }

  // Determinar idcli según la longitud de nruc
  let idcli = 0;
  if (nruc.length === 11) {
    idcli = 6;
  } else if (nruc.length === 8) {
    idcli = 1;
  }

  try {
    // Verificar si ya existe el cliente
    const existing = await executeQuery('SELECT COUNT(*) AS count FROM clientes WHERE nruc = ?', [nruc]);

    if (existing[0].count > 0) {
      // Actualizar cliente existente
      await executeQuery(
        `
        UPDATE clientes
        SET nomcli = ?, direcc = ?, telefono = ?, email = ?, distrito = ?, ubigeo = ?, idcli = ?
        WHERE nruc = ?
        `,
        [nomcli, direcc, telefono, email, distrito, ubigeo, idcli, nruc]
      );
      res.status(200).json({ message: 'Cliente actualizado correctamente' });
    } else {
      // Insertar nuevo cliente
      await executeQuery(
        `
        INSERT INTO clientes (nruc, nomcli, direcc, telefono, email, distrito, ubigeo, idcli)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [nruc, nomcli, direcc, telefono, email, distrito, ubigeo, idcli]
      );
      res.status(201).json({ message: 'Cliente creado correctamente' });
    }
  } catch (err) {
    next(err);
  }
});

//Vendedores
app.get('/personal', async (req, res, next) => {
  try {
    const query = `
      SELECT a.*, p.nombre 
      FROM acceso a
      INNER JOIN personal p ON a.codper = p.codper
      WHERE a.restriccion LIKE '%2%'
    `;
    const results = await executeQuery(query);
    res.json(results);
  } catch (err) {
    next(err);
  }
});

//Detalles del cliente
app.get('/dcliente/:codcli', async (req, res, next) => {
  const { codcli } = req.params;

  if (!codcli) {
    return res.status(400).json({ error: 'El parámetro codcli es requerido' });
  }

  try {
    const results = await executeQuery(
      'SELECT direcc, telefono, email, ubigeo, distrito FROM clientes WHERE codcli = ?',
      [codcli]
    );

    if (results.length === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    res.status(200).json(results[0]);
  } catch (err) {
    next(err);
  }
});


// Obtener último correlativo
app.get('/correlativo', async (req, res, next) => {
  const { serie } = req.query;

  if (!serie) {
    return res.status(400).json({ error: 'La serie es requerida' });
  }

  try {
    const results = await executeQuery(
      'SELECT MAX(CAST(ordped AS UNSIGNED)) AS max_ordped FROM pedidos WHERE sedarea = ?',
      [serie]
    );

    const lastCorrelativo = results[0]?.max_ordped || 0;
    const nuevoCorrelativo = (lastCorrelativo + 1).toString().padStart(6, '0');
    res.status(200).json({ correlativo: nuevoCorrelativo });
  } catch (err) {
    next(err);
  }
});

// Ruta para guardar un producto
app.post('/add-product', async (req, res, next) => {
  const { codprod, producto, parnumb } = req.body;

  // Validar que los campos requeridos estén presentes
  if (!codprod || !producto) {
    return res.status(400).json({ error: 'Los campos codprod y producto son requeridos' });
  }

  try {
    const query = 'INSERT INTO productos (codprod, producto, parnumb) VALUES (?, ?, ?)';
    const result = await executeQuery(query, [
      codprod,
      producto,
      parnumb || '-', // Si parnumb está vacío, insertar NULL
    ]);

    res.status(201).json({ message: 'Producto agregado exitosamente', result });
  } catch (err) {
    console.error('Error al guardar el producto:', err.message);
    next(err);
  }
});

// Obtener todas las líneas
app.get('/lineas', async (req, res, next) => {
  try {
    const results = await executeQuery('SELECT codlin, linea FROM lineas');
    res.status(200).json(results);
  } catch (err) {
    next(err);
  }
});

// Obtener sublíneas filtradas por línea (inicio de código)
app.get('/sublineas', async (req, res, next) => {
  const { linea } = req.query;

  if (!linea) {
    return res.status(400).json({ error: 'El parámetro "linea" es requerido' });
  }

  try {
    const query = `
      SELECT sublin, grupo
      FROM grupos
      WHERE sublin LIKE ?
    `;
    const results = await executeQuery(query, [`${linea}%`]);
    res.status(200).json(results);
  } catch (err) {
    next(err);
  }
});



// Ruta para obtener el próximo correlativo de codprod con prefijo dinámico
app.get('/codprod/:prefix', async (req, res) => {
  const { prefix } = req.params;

  if (!prefix || !/^\d+$/.test(prefix)) {
    return res.status(400).json({ error: 'Prefijo inválido o faltante.' });
  }

  try {
    const query = `
      SELECT codprod 
      FROM productos 
      WHERE codprod LIKE ? 
      ORDER BY codprod DESC 
      LIMIT 1
    `;
    const result = await executeQuery(query, [`${prefix}%`]);

    let nextCodProd;

    if (result.length > 0) {
      const lastCodProd = parseInt(result[0].codprod, 10);
      nextCodProd = (lastCodProd + 1).toString();
    } else {
      nextCodProd = `${prefix}0001`;
    }

    res.json({ nextCodProd });
  } catch (error) {
    console.error('Error al obtener el próximo codprod:', error.message);
    res.status(500).json({ error: 'Error al obtener el próximo codprod.' });
  }
});

// Obtener productos por código de barras
app.get('/codbarra', async (req, res, next) => {
  const { codigo } = req.query;

  if (!codigo) {
    return res.status(400).json({ error: 'El código de barra es requerido' });
  }

  try {
    const results = await executeQuery(
      'SELECT codprod, producto FROM productos WHERE parnumb = ?',
      [codigo]
    );

    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ error: 'Código no existe' });
    }
  } catch (err) {
    next(err);
  }
});

app.get('/ubigeo', async (req, res, next) => {
  try {
    const query = `
      SELECT ubigeo, departamento, provincia, distrito
      FROM ubigeo
    `;
    const results = await executeQuery(query);
    res.status(200).json(results);
  } catch (err) {
    next(err);
  }
});

// Obtener clientes
app.get('/clientes', async (req, res, next) => {
  try {
    const results = await executeQuery('SELECT nruc, nomcli, codcli FROM clientes');
    res.json(results);
  } catch (err) {
    next(err);
  }
});

app.post('/clientes', async (req, res, next) => {
  const { codcli } = req.body;
  if (!codcli) {
    return res.status(400).json({ error: 'El código de cliente (codcli) es requerido' });
  }

  try {
    const results = await executeQuery(
      'SELECT nruc, nomcli FROM clientes WHERE codcli = ?',
      [codcli]
    );

    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ error: 'Cliente no encontrado' });
    }
  } catch (err) {
    next(err);
  }
});

// Obtener productos
app.get('/productos', async (req, res, next) => {
  try {
    const results = await executeQuery(`SELECT codprod, producto, pventa FROM productos where estado='CARTA'`);
    res.status(200).json(results);
  } catch (err) {
    next(err);
  }
});

app.get('/detprod', async (req, res, next) => {
  try {
    const results = await executeQuery('SELECT codprod, producto, parnumb FROM productos order by codprod desc');
    console.log('Resultados de la consulta:', results); // Esto debería mostrar los datos en consola
    res.status(200).json(results);
  } catch (err) {
    console.error('Error al obtener productos:', err);
    next(err); // Manejo del error con middleware de errores
  }
});


app.post('/pedidos', async (req, res, next) => {
  const { fechped, fechoc, fechentr, sedarea, ordped, codcli, total, importe, obs, codper, pago, hora } = req.body;

  if (!fechped || !fechoc || !fechentr || !sedarea || !ordped || !codcli || !total || !importe || !pago || !hora) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const checkQuery = 'SELECT COUNT(*) AS count_exists FROM pedidos WHERE sedarea = ? AND ordped = ?';
    let exists = (await executeQuery(checkQuery, [sedarea, ordped]))[0].count_exists > 0;

    while (exists) {
      ordped = (parseInt(ordped) + 1).toString().padStart(3, '0');
      exists = (await executeQuery(checkQuery, [sedarea, ordped]))[0].count_exists > 0;
    }

    const query = `
      INSERT INTO pedidos (fechped, fechoc, fechentr, sedarea, ordped, codcli, total, importe, observ, codper, pago, hora)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const result = await executeQuery(query, [
      fechped,
      fechoc,
      fechentr,
      sedarea,
      ordped,
      codcli,
      total,
      importe,
      obs,
      codper,
      pago,
      hora,
    ]);

    res.status(201).json({ message: 'Pedido guardado exitosamente', id: result.insertId, ordped });
  } catch (err) {
    next(err);
  }
});


// Guardar detalles de un pedido
app.post('/dpedidos', async (req, res, next) => {
  const { ordped, item, codprod, cantped, precio, descrip } = req.body;

  if (!ordped || !item || !codprod || !cantped || !precio || !descrip) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  try {
    const query = 'INSERT INTO dpedidos (ordped, item, codprod, cantped, precio, descrip) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [ordped, item, codprod, cantped, precio, descrip];
    await executeQuery(query, values);
    res.status(201).json({ message: 'Pedido insertado con éxito' });
  } catch (err) {
    next(err);
  }
});

app.put('/actpedidos', async (req, res, next) => {
  const { fechped, sedarea, ordped, codcli, total, importe, codper, pago } = req.body;

  if (!fechped || !sedarea || !ordped || !codcli || !total || !importe || !codper || !pago) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const checkQuery = 'SELECT * FROM pedidos WHERE ordped = ? AND sedarea = ? AND fechped = ?';
    const existingOrder = await executeQuery(checkQuery, [ordped, sedarea, fechped]);

    if (existingOrder.length === 0) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    const updateQuery = `
      UPDATE pedidos 
      SET 
        codcli = ?, 
        total = ?, 
        codper = ?, 
        importe = ?, 
        pago = ?
      WHERE fechped = ? AND sedarea = ? AND ordped = ?`;

    await executeQuery(updateQuery, [
      codcli,
      total,
      codper,
      importe,
      pago,
      fechped,
      sedarea,
      ordped,
    ]);

    res.status(200).json({ message: 'Pedido actualizado exitosamente', ordped });
  } catch (err) {
    next(err);
  }
});

// Eliminar detalles de un pedido
app.delete('/deldpedidos', async (req, res, next) => {
  const { ordped } = req.body;

  if (!ordped) {
    return res.status(400).json({ error: 'El parámetro ordped es requerido' });
  }

  try {
    const query = 'DELETE FROM dpedidos WHERE ordped = ?';
    const result = await executeQuery(query, [ordped]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'No se encontró ningún pedido con ese ordped' });
    }

    res.status(200).json({ message: 'Pedido eliminado correctamente' });
  } catch (err) {
    next(err);
  }
});


app.put('/anulpedidos', async (req, res, next) => {
  const { fechped, sedarea, ordped, codcli, total, importe, codper, acta } = req.body;

  if (!fechped || !sedarea || !ordped || !codcli || !total || !importe || !codper) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const checkQuery = 'SELECT * FROM pedidos WHERE ordped = ? AND sedarea = ? AND fechped = ?';
    const existingOrder = await executeQuery(checkQuery, [ordped, sedarea, fechped]);

    if (existingOrder.length === 0) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    const updateQuery = `
      UPDATE pedidos 
      SET 
        codcli = ?, 
        total = ?, 
        usermod = ?, 
        importe = ?, 
        acta = ?,
        estado = 'ANULADO'
      WHERE fechped = ? AND sedarea = ? AND ordped = ?`;

    await executeQuery(updateQuery, [
      codcli,
      total,
      codper,
      importe,
      acta,
      fechped,
      sedarea,
      ordped,
    ]);

    res.status(200).json({ message: 'Pedido anulado exitosamente', ordped });
  } catch (err) {
    next(err);
  }
});

app.get('/pedidos-hora', async (req, res) => {
  const { fechped, sedarea, ordped } = req.query;

  if (!fechped || !sedarea || !ordped) {
    return res.status(400).json({ error: 'Los parámetros fecha, sede y pedido son requeridos.' });
  }

  try {
    const query = `
      SELECT TIME(hora) AS hora
      FROM pedidos
      WHERE DATE(fechped) = ?
        AND sedarea = ?
        AND ordped = ?
      LIMIT 1
    `;
    const results = await executeQuery(query, [fechped, sedarea, ordped]);

    if (results.length === 0) {
      return res.status(404).json({ error: 'No se encontró el pedido con los parámetros proporcionados.' });
    }

    const { hora } = results[0];
    return res.json({ hora });
  } catch (error) {
    console.error('Error al obtener la hora del pedido:', error.message);
    return res.status(500).json({ error: 'Error al obtener la hora del pedido.' });
  }
});


app.put('/anulped', async (req, res, next) => {
  const { sedarea, ordped } = req.body;  // <-- AGREGA sedarea

  if (!ordped || !sedarea) {
    return res.status(400).json({ error: 'Los parámetros sedarea y ordped son requeridos' });
  }

  try {
    const query = 'update pedidos set total=0.00, importe=0.00, estado="ANULADO" where sedarea=? and ordped=?';
    const result = await executeQuery(query, [sedarea, ordped]); // <-- ENVÍA AMBOS

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'No se encontró ningún pedido con esos datos' });
    }

    res.status(200).json({ message: 'Pedido anulado correctamente' });
  } catch (err) {
    next(err);
  }
});


// Obtener reportes por fecha
app.post('/reportes', async (req, res, next) => {
  const { sedarea, fechaInicio, fechaFin, acta } = req.body;

  if (!fechaInicio || !fechaFin) {
    return res.status(400).json({ error: 'Las fechas de inicio y fin son requeridas' });
  }

  try {
    const query = `
      SELECT fechped, sedarea, ordped, codcli, total, acta
      FROM pedidos
      WHERE sedarea = ? AND fechped BETWEEN ? AND ?
      ORDER BY ordped DESC
    `;
    const results = await executeQuery(query, [sedarea, fechaInicio, fechaFin]);
    res.json(results);
  } catch (err) {
    next(err);
  }
});

// Obtener detalles de un reporte
app.get('/dreportes', async (req, res, next) => {
  const { dpedido } = req.query;

  if (!dpedido) {
    return res.status(400).json({ error: 'El parámetro dpedido es requerido' });
  }

  try {
    const query = 'SELECT item, codprod, descrip, cantped, precio, medida FROM dpedidos WHERE ordped = ?';
    const results = await executeQuery(query, [dpedido]);

    if (results.length > 0) {
      res.json(results);
    } else {
      res.status(404).json({ error: 'No se encontraron detalles del pedido' });
    }
  } catch (err) {
    next(err);
  }
});

// Actualizar campo en productos
app.put('/productos/:codprod', async (req, res, next) => {
  const { codprod } = req.params;
  const { parnumb } = req.body;

  if (!parnumb) {
    return res.status(400).json({ error: 'El campo parnumb es requerido' });
  }

  try {
    const query = 'UPDATE productos SET parnumb = ? WHERE codprod = ?';
    await executeQuery(query, [parnumb, codprod]);
    res.status(200).json({ message: 'Producto actualizado exitosamente' });
  } catch (err) {
    next(err);
  }
});

// Cancelar un pedido
app.post('/cancelar', async (req, res, next) => {
  const { pago, monto, pago2, monto2, pago3, monto3, acta, usuario, fechped, sedarea, ordped } = req.body;

  if (!pago || !monto || !acta || !fechped || !sedarea || !ordped || !usuario) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  try {
    const query = `
      UPDATE pedidos
      SET 
        pago = ?, 
        monto = ?, 
        pago2 = IFNULL(?, '-'), 
        monto2 = IFNULL(?, 0), 
        pago3 = IFNULL(?, '-'), 
        monto3 = IFNULL(?, 0), 
        acta = ?,
        usuario = ?,
        estado = 'CANCELADO'
      WHERE fechped = ? AND sedarea = ? AND ordped = ?`;
    await executeQuery(query, [pago, monto, pago2, monto2, pago3, monto3, acta, usuario, fechped, sedarea, ordped]);
    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
});

// Detalles de cancelación
app.post('/dcancelar', async (req, res, next) => {
  const { fechped, sedarea, ordped } = req.body;

  if (!fechped || !sedarea || !ordped) {
    return res.status(400).json({ error: 'Parámetros faltantes: fechped, sedarea y ordped son requeridos' });
  }

  try {
    const query = 'SELECT pago, monto, pago2, monto2, pago3, monto3 FROM pedidos WHERE fechped = ? AND sedarea = ? AND ordped = ?';
    const results = await executeQuery(query, [fechped, sedarea, ordped]);

    if (results.length > 0) {
      res.status(200).json(results);
    } else {
      res.status(404).json({ error: 'No se encontraron datos para los parámetros proporcionados' });
    }
  } catch (err) {
    next(err);
  }
});

app.get('/estados', async (req, res, next) => {
  const { estado, fechaInicio, fechaFin } = req.query;

  // Validar los parámetros obligatorios
  if (!estado) {
    return res.status(400).json({ error: 'El parámetro "estado" es obligatorio' });
  }

  if (!fechaInicio || !fechaFin) {
    return res.status(400).json({ error: 'Los parámetros "fechaInicio" y "fechaFin" son obligatorios' });
  }

  console.log(`Estado recibido: ${estado}`); // Depuración
  console.log(`Rango de fechas recibido: ${fechaInicio} - ${fechaFin}`); // Depuración

  try {
    const query = `
      SELECT fechped, sedarea, ordped, codcli, total, acta 
      FROM pedidos 
      WHERE estado = ? AND fechped BETWEEN ? AND ?;
    `;

    // Ejecutar la consulta con los parámetros
    const pedidos = await executeQuery(query, [estado, fechaInicio, fechaFin]);

    if (pedidos.length === 0) {
      // Retornar un mensaje claro cuando no hay pedidos
      return res.status(200).json({
        message: 'No se encontraron pedidos con el estado y rango de fechas proporcionados',
        pedidos: [],
      });
    }

    // Retornar los pedidos encontrados
    res.status(200).json({ pedidos });
  } catch (error) {
    console.error('Error al obtener pedidos:', error.message);
    next(error); // Manejar errores globalmente
  }
});

app.post('/cajero', async (req, res, next) => {
  const { fechped, sedarea, ordped } = req.body;

  // Log de los parámetros recibidos
  console.log('Parámetros recibidos en /cajero:', { fechped, sedarea, ordped });

  if (!fechped || !sedarea || !ordped) {
    console.log('Parámetros faltantes:', { fechped, sedarea, ordped });
    return res.status(400).json({ error: 'Faltan parámetros requeridos' });
  }

  try {
    // Lógica de consulta
    const pedidosQuery = `
      SELECT usuario 
      FROM pedidos 
      WHERE fechped = ? AND sedarea = ? AND ordped = ?
    `;
    const pedidosResult = await executeQuery(pedidosQuery, [fechped, sedarea, ordped]);

    if (pedidosResult.length === 0) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    const usuario = pedidosResult[0].usuario;

    const accesoQuery = `
      SELECT nombre 
      FROM acceso 
      WHERE codper = ?
    `;
    const accesoResult = await executeQuery(accesoQuery, [usuario]);

    if (accesoResult.length === 0) {
      return res.status(404).json({ error: 'Cajero no encontrado' });
    }

    res.json({ nombre: accesoResult[0].nombre });
  } catch (error) {
    next(error);
  }
});

app.post('/api/sunat', async (req, res) => {
  const token = process.env.SUNAT_TOKEN;
  const { ruc } = req.body;

  if (!ruc || (ruc.length !== 11 && ruc.length !== 8)) {
    return res.status(400).json({ error: 'RUC o DNI inválido' });
  }

  const body = {
    token,
    [ruc.length === 11 ? 'ruc' : 'dni']: ruc,
  };

  try {
    const response = await fetch('https://ruc.com.pe/api/v1/consultas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token token=${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error al consultar SUNAT:', error);
    res.status(500).json({ error: 'No se pudo obtener datos de SUNAT' });
  }
});


// Iniciar el servidor
app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor backend corriendo en el puerto ${port}`);
});
