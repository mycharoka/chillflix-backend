// import {v4 as uuidv4} from 'uuid'
const {v4: uuidv4} = require('uuid')
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  const data = [
    {genre_id: uuidv4(), genre_name: 'Drama'},
    {genre_id: uuidv4(), genre_name: 'Action'},
    {genre_id: uuidv4(), genre_name: 'Thriller'},
    {genre_id: uuidv4(), genre_name: 'Comedy'},
    {genre_id: uuidv4(), genre_name: 'Sci-fi'},
  ]
  await knex('genres').del()
  await knex('genres').insert(data);
};
