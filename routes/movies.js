const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Movie, Genre, Cast } = require('../models');

router.get('/', async (req, res) => {
  try {
    const {
      year, genres, without_genres, search,
      sort_by = 'popularity', order = 'DESC', page = 1, limit = 20
    } = req.query;

    const query = {
      include: [],
      where: {},
      order: [[sort_by, order.toUpperCase()]],
      offset: (page - 1) * limit,
      limit: parseInt(limit)
    };

    if (year) {
      query.where.release_date = {
        [Op.between]: [`${year}-01-01`, `${year}-12-31`]
      };
    }

    if (genres) {
      query.include.push({ model: Genre, where: { name: { [Op.in]: genres.split(',') } } });
    }

    if (without_genres) {
      query.include.push({ model: Genre, where: { name: { [Op.notIn]: without_genres.split(',') } } });
    }

    if (search) {
      query.where.title = { [Op.like]: `%${search}%` };
      query.include.push({ model: Cast, where: { name: { [Op.like]: `%${search}%` } }, required: false });
    }

    const movies = await Movie.findAndCountAll(query);
    res.json({ total: movies.count, results: movies.rows });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
