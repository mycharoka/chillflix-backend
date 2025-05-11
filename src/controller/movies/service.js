const pool = require("../../../config/database")
const db = require("../../../config/knexInstance")
const { up } = require("../../../migrations/20250429075956_create_movies_table")

async function getAllMovies() {
  try {
    const query = await pool.query("SELECT * FROM movies")
    return {
      statusCode: query.rows.length > 0 ? 200 : 400,
      data : {
        message: query.rows.length > 0 ? "OK" : "Not Found",
        data: query.rows.length > 0 ? query.rows : []
      }
    }
    
  } catch (error) {
    throw new Error(error) 
  }
}
async function getMoviesById(id) {
  try {
    const query = await pool.query("SELECT * FROM movies WHERE movie_id = $1", [id])
    
    return {
      statusCode: query.rows.length > 0 ? 200 : 400,
      data : {
        message: query.rows.length > 0 ? "OK" : "Not Found",
        data: query.rows.length > 0 ? query.rows : []
      }
    }
  } catch (error) {
    throw new Error(error)
  }
}
async function updateMoviesById(id, body) {
  try {
    const updateData = {}

    if (body.title) updateData.title = body.title
    if (body.genre_id) updateData.genre_id = body.genre_id

    if (Object.keys(updateData).length === 0) {
      return {
        statusCode: 400,
        data : {
          message: "No Updated Fields",
          data: []
        }
      }
    }

    const updated = await db('movies')
    .where('movie_id', id)
    .update({...updateData, updated_at: db.fn.now()})

    
    return {
      status: updated === 1 ? 200 : 400,
      data : {
        message: updated === 1 ? "OK" : "Not Found",
        data: updated === 1 ? "UPDATED" : []  
      }
    }
    
  } catch (error) {
    throw new Error(error)
  }
}
async function deleteMoviesById(id) {
  try {
    const query = await pool.query("DELETE FROM movies WHERE movie_id = $1", [id])
    console.log(query);
    
    return {
      statusCode: query.rowCount === 1 ? 200 : 400,
      data : {
        message: query.rowCount === 1 ? "OK" : "Not Found",
        data: query.rowCount === 1 ? "DELETED": []
      }
    }
  } catch (error) {
    throw new Error(error)
  }
}
async function createMovie(req) {
  try {
    const query = await pool.query("INSERT INTO movies(title, genre_id) VALUES ($1, $2) RETURNING *", [req.title, req.genre_id])
    return {
      statusCode: 200,
      data : {
        message: "OK",
        data: query.rows
      }
    }
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  getAllMovies,
  getMoviesById,
  updateMoviesById,
  deleteMoviesById,
  createMovie
}