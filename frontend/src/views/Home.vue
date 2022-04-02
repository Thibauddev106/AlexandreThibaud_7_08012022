<template>
  <div id="wall" class="wall">
    <CreatePost />
    <Post
      v-for="post in allPosts"
      v-bind:key="post.id"
      :post="post"
      @infosPost="setInfos"
    />
    <ModalBoxModerate :post="post" />
  </div>
</template>

<script>
import axios from "axios";
import CreatePost from "../components/CreatePost.vue";
import Post from "../components/Post.vue";
import ModalBoxModerate from "../components/ModifPost.vue";

export default {
  name: "Home",
  components: {
    CreatePost,
    Post,
    ModalBoxModerate,
  },
  data() {
    return {
      post: {
        id: "",
        comment: "",
        image: "",
        date_creation: "",
      },
      allPosts: [],
    };
  },
  methods: {
    setInfos(payload) {
      this.post = payload.post;
    },
  },
  mounted() {
    axios.get("http://localhost:5000/api/post/articles", {
      headers: {
        Authorization: "Bearer " + this.$store.state.user.token,
      },
    })
    .then((response) => {
      console.log("post", response.data);
      this.allPosts = response.data.articles;
    })
    .catch((error) => {
      console.log(error);
    });
  },
};
</script>

<style lang="scss">
.wall {
  background-color: white;
  min-height: 100%;
  padding: 5rem 0 2rem 0;
}
.block-post {
  background-color: white;
  width: 75%;
  margin: auto;
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.25);
  border-radius: 0.25rem;
  padding: 0.5rem;
  margin-bottom: 1rem;
  & h3 {
    color: grey;
    margin: 0.25rem 0;
    font-size: 0.75rem;
  }
}
</style>
