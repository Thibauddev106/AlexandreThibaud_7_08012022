<template>
  <div>
    <div class="block-post">
      <h3>Créer un article</h3>
      <form enctype="multipart/form-data" action="/createArticle" method="post">
        <div class="input-group mb-3">
          <input
            v-model="comment"
            class="input-text"
            id="input_text"
            type="text"
          />
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputFileAddon"
              >Importer image</span
            >
          </div>
          <div class="custom-file">
            <input
              name="image"
              type="file"
              class="custom-file-input"
              id="inputFile"
              aria-describedby="inputFileAddon"
              @change="onFileChange"
            />
            <label class="custom-file-label" for="inputFile"
              >Sélectionner fichier</label
            >
          </div>
        </div>
        <input
          type="submit"
          class="btn btn-primary"
          @click.prevent="createPost"
          value="Publier"
        />
        <span
          id="msgReturnAPI"
          class="mx-3 text-danger"
          v-if="user.token == null"
          >Veuillez vous connecter</span
        >
        <span id="msgReturnAPI" class="mx-3" v-else>{{ msgError }}</span>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import moment from "moment";

export default {
  name: "CreatePost",
  data() {
    return {
      comment: "",
      image: "",
      date_creation: "",
      user_id: "",

      msgError: "",
    };
  },
  computed: {
    ...mapState(["user", "editOption"]),
  },
  methods: {
    createPost() {
      let payload = new FormData();
      payload.append("comment", this.comment);
      payload.append("image", this.image);
      payload.append("date_creation", moment().format("YYYY-MM-DD"));
      payload.append("user_id", this.$store.state.user.id);
      axios.post("http://localhost:5000/api/post/createArticle", payload, {
        headers: {
          Authorization: "Bearer " + this.$store.state.user.token,
        },
      })
      .then((response) => {
        //Si retour positif de l'API reload de la page pour affichage du dernier post
        if (response) {
          console.log(response);
          window.location.reload();
        }
      })
      .catch((error) => (this.msgError = error));
    },
    onFileChange(e) {
      console.log(e);
      this.image = e.target.files[0] || e.dataTransfer.files;
      console.log(this.image);
    },
  },
};
</script>

<style>
.input-text {
  width: 100%;
}
</style>
