<template>
  <div>
    <div class="block-post">
      <h3>Créer un article</h3>
      <form enctype="multipart/form-data" action="/create" method="post">
        <div class="input-group mb-3">
          <input v-model="contentPost.content" class="input-text" id="input_text" type="text" />
        </div>
        <input type="submit" class="btn btn-primary" @click.prevent="createPost" value="Envoyer" />
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "CreatePost",
  data() {
    return {
      contentPost: {
        content: null
        
      },
      msgError: ""
    };
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    createPost() {  
        axios
          .post("http://localhost:5000/api/post/createArticle", {
            headers: {
              Authorization: "Bearer " + window.localStorage.getItem("token")
            }
          })
          .then(response => {
            //Si retour positif de l'API reload de la page pour affichage du dernier post
            if (response) {
              window.location.reload();
            }
          })
          .catch(error => (this.msgError = error));
      }
    },
}

</script>

<style>
.input-text {
  width: 100%;
}
</style>