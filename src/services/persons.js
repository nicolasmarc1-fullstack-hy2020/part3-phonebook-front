import axios from 'axios'
// const baseUrl = "http://localhost:3001/persons"
const baseUrl = "api/persons"


const getAll = async () => {
  const request = await axios.get(baseUrl)
  return await request.data
}
const create = async (newObject) => {
  const request = await axios.post(baseUrl, newObject)
  return await request.data
}

const update = async (id, newObject) => {
  const request = await axios.put(`${baseUrl}/${id}`, newObject)
  return await request.data
}

const remove = async (id) => {
  const request = await axios.delete(`${baseUrl}/${id}`)
  return await request.data
}

export default { getAll, create, update, delete: remove }
// default, module with no name can be named in import  => import personService from './services/persons'