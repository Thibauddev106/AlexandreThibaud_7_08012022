import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      pseudo: 'Nc',
      id: 'Nc',
      email: 'Nc',
      token: null,
      is_admin: false
    },
  },
  mutations: {
    saveUserInfos(state, data) {
      state.user.pseudo = data.pseudo;
      state.user.email = data.email;
      state.user.id = data.id;
      state.user.token = data.token;
      state.user.is_admin = data.is_admin;
      localStorage.setItem('token',data.token)
    },
  },
  actions: {
    getUserInfos(context) {
      axios
        .get("http://localhost:5000/api/user/me", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then(response => {
          context.commit('saveUserInfos',[response.data.pseudo, response.data.id, response.data.email, response.data.is_admin])
        })
        .catch(error => {
          console.log('Erreur auth', error); 
        });
    },  
  },
  modules: {
  }
})