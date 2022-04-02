<template>
  <div class="block-post">
    <h3>Commenter la publication</h3>
    <form enctype="multipart/form-data" action="/createComment" method="post">
      <div class="input-group mb-3">
        <input
          v-model="newComment.comment"
          class="input-text"
          id="input_text"
          type="text"
        />
      </div>
      <input
        type="submit"
        class="btn btn-primary"
        @click.prevent="createComment"
        value="Publier"
      />
    </form>
    <div class="card-body">
      <div class="card-text" v-for="com in allComments" v-bind:key="com.id">
        <p class="mb-0">
          {{ com.comment }} Publier par
          <em class="text-secondary">{{ pseudo }}</em> le
          <em class="text-secondary">{{ com.date_creation }}</em>
        </p>
      </div>
    </div>
  </div>
  <!-- <Comment :post-id="postId" /> -->
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import moment from "moment";

export default {
  name: "CreateComment",
  props: ["postId"],
  data() {
    return {
      newComment: {
        comment: "",
        user_id: "",
      },
      allComments: [],
      pseudo: "",
    };
  },
  mounted() {
    axios.get(`http://localhost:5000/api/comment/comments/article/${this.postId}`, {
        headers: {
          Authorization: "Bearer " + this.user.token,
        },
      }
    )
    .then((response) => {
      console.log("com", response.data);
      this.allComments = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
    axios.get(`http://localhost:5000/api/user/pseudo/${this.user.id}`, {
      headers: {
        Authorization: "Bearer " + this.user.token,
      },
    })
    .then((response) => {
      // console.log("pseudo", response.data);
      this.pseudo = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  },
  computed: {
    ...mapState(["user", "editOption"]),
    // publiDate() {
    //   return moment().format("D/MM/yyyy");
    // },
  },
  methods: {
    createComment() {
      let payload = {
        comment: this.newComment.comment,
        post_id: this.postId,
        date_creation: moment().format("YYYY-MM-DD"),
        user_id: this.user.id,
      };
      axios.post("http://localhost:5000/api/comment/createComment", payload, {
        headers: {
          Authorization: "Bearer " + this.user.token,
        },
      })
      .then((response) => {
        if (response) {
          console.log(response.data);
          this.allComments.push(response.data);
        }
      })
      .catch((error) => (this.msgError = error));
    },
  },
};
</script>
