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
    getRecipesByAuthor(id_user) {
        return axios.get(`${API_URL}/recipes/user/${id_user}`)
    },
    getOthersRecipes(id_user, id_recipe) {
        return axios.get(`${API_URL}/recipes/user/${id_user}/others/${id_recipe}`)
    },
    getForks(id_user) {
        return axios.get(`${API_URL}/recipes/forks/${id_user}`)
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
    getCommentsByAuthor(id_user) {
        return axios.get(`${API_URL}/comments/user/${id_user}`)
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
