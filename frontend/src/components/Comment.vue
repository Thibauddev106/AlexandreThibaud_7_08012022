<template>
<div class="block-post">
      <h3>Commenter la publication</h3>
      <form enctype="multipart/form-data" action="/createComment" method="post">
        <div class="input-group mb-3">
          <input v-model="comment" class="input-text" id="input_text" type="text" />
        </div>
        <input type="submit" class="btn btn-primary" @click.prevent="createComment" value="Publier" />
        <div class="card-text" v-if="comment!=='null'">
        <p class="mb-0">{{comment}}</p>
      </div>
      </form>
</div>

</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default ({
    name: "Comment",
    data() {
        return {
            comment:"",
            date_creation:"",
            user_id:"",
            post_id:""
        };
    },
    computed: {
        ...mapState(["user", "editOption"]),
    },
    methods: {
        createComment() {  
        axios
            .post("http://localhost:5000/api/comment/createComment",  
            {
            comment: this.comment,
            post_id: this.post_id,
            date_creation: this.date_creation,
            user_id: this.$store.state.user.id
            },
            {
            headers: {
                Authorization: "Bearer "+ this.$store.state.user.token
            }
            })
            .then(response => {
            //Si retour positif de l'API reload de la page pour affichage du dernier post
            if (response) {
                console.log(response)
                window.location.reload();
            }
            })
            .catch(error => (this.msgError = error)); 
        },
    } 
})
</script>
