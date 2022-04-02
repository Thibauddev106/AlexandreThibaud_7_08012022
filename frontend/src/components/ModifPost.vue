<template>
  <div
    class="modal fade"
    id="modalEditPost"
    tabindex="-1"
    role="dialog"
    aria-labelledby="ModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <!--Modification est demandée-->
      <div class="modal-content" v-if="editOption == 'modify'">
        <div class="modal-header">
          <h5 class="modal-title" id="ModalLabel">Modifier le post</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form enctype="multipart/form-data" action="/update" method="put">
            <div class="input-group mb-3">
              <label for="input_text">Modifiez votre texte</label>
              <br />
              <textarea
                class="input-text"
                id="inputNewText"
                type="text"
                :value="post.comment"
              ></textarea>
            </div>
            <div class="input-group mb-3" v-if="post.image">
              <br />
              <img class="img-thumbnail" :src="post.image" />
              <button
                type="button"
                class="btn btn-danger mx-auto mt-1"
                @click="deleteImgAction"
              >
                Effacer image
              </button>
            </div>
            <span id="msgReturnAPI" class="mx-3"></span>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Annuler
          </button>
          <button type="button" class="btn btn-primary" @click="updatePost">
            Sauvgarder
          </button>
        </div>
      </div>

      <!--Une suppression est demandée-->
      <div class="modal-content" v-else>
        <div class="modal-header">
          <h5 class="modal-title" id="ModalLabel">
            Supprimer ce post (id: {{ post.id }})
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>Etes vous sûr de vouloir supprimer ce post</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Annuler
          </button>
          <button type="button" class="btn btn-danger" @click="deletePost">
            Supprimer post
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "ModalBoxModerate",
  data() {
    return {
      deleteImg: false,
    };
  },
  computed: {
    ...mapState(["user", "editOption"]),
  },
  props: {
    post: {
      type: Object,
      default() {},
    },
  },
  methods: {
    deletePost() {
      axios.delete(`http://localhost:5000/api/post/article/delete/${this.post.id}`, {
        headers: {
          Authorization: "Bearer " + this.$store.state.user.token,
        }, 
      })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => console.log(error));
    },

    updatePost() {
      let newInput = document.getElementById("inputNewText").value;
      //Verification si changements existent
      let newContent = false;
      if (newInput !== this.post.comment || this.deleteImg != false) {
        newContent = true;
      }
      //Modificiation si changements existent
      if (newContent && this.deleteImg) {
        axios.put(`http://localhost:5000/api/post/article/update/${this.post.id}`,
          {
            comment: newInput,
            image: "",
          },
          {
            headers: {
              authorization: "Bearer " + this.$store.state.user.token,
            },
          }
        )
        .then((response) => {
          console.log("reponse API", response);
          this.retourAPI = response.data.confirmation;
          setTimeout(() => {
            this.retourAPI = "";
          }, 2000);
          window.location.reload();
        })
        .catch((err) => {
          console.log("admin", err);
          this.retourAPI = "Une erreur est survenue, vérifier vos saisies";
        });
      } else if (newContent) {
        axios.put(`http://localhost:5000/api/post/article/update/${this.post.id}`,
          {
            comment: newInput,
          },
          {
            headers: {
              authorization: "Bearer " + this.$store.state.user.token,
            },
          }
        )
        .then((response) => {
          console.log("reponse API", response);
          this.retourAPI = response.data.confirmation;
          setTimeout(() => {
            this.retourAPI = "";
          }, 2000);
          window.location.reload();
        })
        .catch((err) => {
          console.log("admin", err);
          this.retourAPI = "Une erreur est survenue, vérifier vos saisies";
        });
      } else {
        console.log("aucun changement");
      }
    },
    deleteImgAction() {
      this.deleteImg = true;
    },
  },
};
</script>

<style></style>
