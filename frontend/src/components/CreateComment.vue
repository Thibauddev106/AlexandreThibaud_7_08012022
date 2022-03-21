<template>
    <div class="block-post">
        <h3>Commenter la publication</h3>
        <form enctype="multipart/form-data" action="/createComment" method="post">
            <div class="input-group mb-3">
            <input v-model="newComment.comment" class="input-text" id="input_text" type="text" />
            </div>
            <input type="submit" class="btn btn-primary" @click.prevent="createComment" value="Publier" />
        </form>
        <Comment :post-id="postId"/>
    </div>
    
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import Comment from "../components/Comment.vue"
//import moment from "moment";

export default ({
    name: "CreateComment",
    components: {
        Comment
    },
    props: [
         'postId'
    ],
    data() {
        return {
            newComment: {
                comment:"",
                date_creation:"",
                user_id:"",
            },  
        }
    },
    computed: {
        ...mapState(["user", "editOption"]),
        // publiDate () {
        //     if(this.post) {
        //         return moment(this.date_creation).format('D/MM/yyyy') 
        //     }
        //     return ""
        // }
    },
    methods: {
        
        createComment() { 
            let payload = new FormData();
            payload.append("comment", this.newComment.comment)
            payload.append("post_id", this.postId)
            payload.append("date_creation", this.newComment.date_creation)
            payload.append("user_id", this.$store.state.user.id) 
        axios
            .post("http://localhost:5000/api/comment/createComment", payload,
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
