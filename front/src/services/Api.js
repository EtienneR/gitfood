import axios from 'axios'
const API_URL = 'http://localhost:3000/api/v1'

export default {
    getAllRecipes() {
        return axios.get(`${API_URL}/recipes`)
    },
    getRecipe(id_recipe) {
        return axios.get(`${API_URL}/recipes/${id_recipe}`)
    },
    getRecipesByAuthor(id_user) {
        return axios.get(`${API_URL}/recipes/user/${id_user}`)
    },
    getOthersRecipes(id_user, id_recipe) {
        return axios.get(`${API_URL}/recipes/user/${id_user}/others/${id_recipe}`)
    },
    addRecipe(content) {
        return axios.post(`${API_URL}/recipes`, content)
    },
    updateRecipe(id_recipe, content) {
        return axios.put(`${API_URL}/recipes/${id_recipe}`, content)
    },
    removeRecipe(id_recipe) {
        return axios.delete(`${API_URL}/recipes/${id_recipe}`)
    },
    getCommentsByRecipe(id_recipe) {
        return axios.get(`${API_URL}/comments/recipe/${id_recipe}`)
    }
}
