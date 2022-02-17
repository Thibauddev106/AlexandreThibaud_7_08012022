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
    saveUserInfos(state, [pseudo, id, email, is_admin]) {
        state.user.pseudo = pseudo,
        state.user.id = id,
        state.user.email = email,
        state.user.token = localStorage.getItem('token'),
        state.user.is_admin = is_admin
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