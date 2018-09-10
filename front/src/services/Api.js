import axios from 'axios'
const API_URL = `http://${window.location.hostname}:3000/api/v1`

export default {
    getAllRecipes() {
        return axios.get(`${API_URL}/recipes`)
    },
    getRecipe(id_recipe) {
        return axios.get(`${API_URL}/recipes/${id_recipe}`)
    },
    searchRecipes(q) {
        return axios.get(`${API_URL}/recipes?q=${q}`)
    },
    getRecipesByAuthor(user_id) {
        return axios.get(`${API_URL}/recipes/user/${user_id}`)
    },
    getOthersRecipes(user_id, id_recipe) {
        return axios.get(`${API_URL}/recipes/user/${user_id}/others/${id_recipe}`)
    },
    getForks(user_id) {
        return axios.get(`${API_URL}/recipes/forks/${user_id}`)
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
    },
    getCommentsByAuthor(user_id) {
        return axios.get(`${API_URL}/comments/user/${user_id}`)
    },
    addComment(content) {
        return axios.post(`${API_URL}/comments`, content)
    },
    removeComment(id_comment) {
        return axios.delete(`${API_URL}/recipes/${id_comment}`)
    },
    addLike(content) {
        return axios.post(`${API_URL}/likes`, content)
    },
    removeLike(id_like) {
        return axios.delete(`${API_URL}/likes/${id_like}`)
    },
}
