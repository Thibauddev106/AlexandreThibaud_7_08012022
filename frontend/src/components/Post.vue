<template>
  <div class="card mb-4 w-75 mx-auto">
    <div class="card-header d-flex justify-content-between">
      <div>
        Publier par <em class="text-secondary">{{ post.pseudo }}</em> le
        <em class="text-secondary">{{ publicationDate }}</em>
      </div>
      <div class="dropdown"></div>
      <svg
        class="bi bi-three-dots dropdown-toggle"
        id="dropdownMenuPost"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
        />
      </svg>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuPost">
        <button
          class="dropdown-item modifPost"
          data-toggle="modal"
          data-target="#modalEditPost"
          type="button"
          @click="
            emitInfoPost();
            changeEditStyle('modify');
          "
        >
          Modifier
        </button>
        <button
          class="dropdown-item deletePost"
          data-toggle="modal"
          data-target="#modalEditPost"
          type="button"
          @click="
            emitInfoPost();
            changeEditStyle('delete');
          "
        >
          Supprimer
        </button>
      </div>
    </div>
    <div class="card-body">
      <div class="card-img-top w-75 mx-auto" v-if="post.image">
        <img :src="post.image" alt="..." class="w-100" />
      </div>
      <div class="card-text" v-if="post.comment !== 'null'">
        <p class="mb-0">{{ post.comment }}</p>
      </div>
    </div>
    <CreateComment :post-id="post.id" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";

import CreateComment from "../components/CreateComment.vue";

export default {
  name: "Post",
  components: {
    CreateComment,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["user", "editOption"]),
    publicationDate() {
      //console.log (this.post)
      if (this.post) {
        return moment(this.post.date_creation).format("D/MM/yyyy");
      }
      return "";
    },
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {
    emitInfoPost() {
      this.$emit("infosPost", { post: this.post });
    },
    changeEditStyle(value) {
      this.$store.dispatch("changeEditStyle", value);
    },
  },
};
</script>

<style></style>
