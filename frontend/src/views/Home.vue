<template>
  <div id="wall" class="wall">
    <CreatePost />
    
    
  </div>
</template>

<script>
import axios from "axios";
import CreatePost from "../components/CreatePost.vue";


export default {
  name: "Home",
  components: {
    CreatePost,
    
    
    
  },
  data() {
    return {
      post: {
        id: "",
        comment: "",
        image: ""
      },
      
      allPosts: []
      
    };
  },
  
  
  mounted() {
    axios
      .get("http://localhost:5000/api/post/articles", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
          //aller chercher token avec this dans le store
        }
      })
      
      .then(response => {
        
        this.allPosts = response.data;
      })
      .catch(error => {
        console.log(error); 
      }),
      
      this.$store.dispatch("getUserInfos");
  }
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