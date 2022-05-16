const winston = require('winston');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const { runMigration } = require('./migration');

const start = async () => {
  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'backend' },
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: `${__dirname}/../logs/backend.log` }),
    ],
  });

  const app = express();
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  const sequelize = new Sequelize(process.env.DB_ADDR, {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    retry: {
      max: 10,
      match: [
        Sequelize.ConnectionError,
        Sequelize.ConnectionRefusedError,
      ],
    },
  });

  const Items = sequelize.define('Item', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    rating: {
      type: Sequelize.INTEGER,
      validate: {
        min: 1,
        max: 5,
      },
    },
  });

  await runMigration(sequelize, logger);

  app.get('/', async (req, res) => {
    logger.info('GET /items');
    const rows = await Items.findAll({
      order: [
        ['id', 'DESC'],
      ],
    });
    return res.status(200).json(rows);
  });

  app.get('/items', async (req, res) => {
    logger.info('GET /items');
    const rows = await Items.findAll({
      order: [
        ['id', 'DESC'],
      ],
    });
    return res.status(200).json(rows);
  });

  app.post('/items', async (req, res) => {
    try {
      logger.info('POST /items');
      await Items.create({
        name: req.body.name,
        rating: req.body.rating,
      }).then((item) => res.status(201).json(item));
    } catch (err) {
      return res.status(400).json({ errors: err.errors });
    }
  });

  app.put('/items', async (req, res) => {
    try {
      logger.info('PUT /items');
      const updateId = req.body.id;
      const updatedName = req.body.name;
      logger.info(`id: ${updateId}, name: ${updatedName}`);

      await Items.update(
        { name: updatedName },
        { returning: true, where: { id: updateId } },
        // eslint-disable-next-line no-unused-vars
      ).then(([numItems, [items]]) => res.send(res.status(201).json(items)));
    } catch (err) {
      return res.status(500);
    }
  });

  app.delete('/items/:id', async (req, res) => {
    try {
      logger.info('DELETE /items');
      const deleteId = req.params.id;
      console.log(deleteId);

      if (Number.isNaN(deleteId)) return res.status(400).end();
      console.log('test');

      Items.destroy({
        where: { id: deleteId },
      }).then(() => {
        res.status(204).end();
      });
    } catch (err) {
      return res.status(500);
    }
  });

  app.all('*', (req, res) => {
    res.status(200).json([]);
  });

  return app.listen(8080, () => {
    logger.info('> Listening on port: 8080');
  });
};

start();
