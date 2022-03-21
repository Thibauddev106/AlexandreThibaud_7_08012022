<template>
    <div class="card-body">
        cc
        <div class="card-header d-flex justify-content-between">
            <div>Publier par <em class="text-secondary">{{$store.state.user.pseudo}}</em> le <em class="text-secondary">{{ }}</em> </div>
        </div> 
        <div class="card-text" v-for="com in allComments" v-bind:key="com.id" :com="com" @infosComment="setInfosCom">
            <p class="mb-0">{{com.comment}}</p>
        </div>
          
    </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
    name: "Comment",
    props: [
        'postId'
    ],
    data() {
    return {
       com: {
        id: "",
        comment: "",
        date_creation: "",
        user_id: "",
        },
        allComments: [], 
    }
  },
    computed: {
        ...mapState(["user"])
    },
    mounted() {
        axios
            .get(`http://localhost:5000/api/comment/comments/article/${this.postId}`, {
                headers: {
                Authorization: "Bearer " + this.$store.state.user.token
            }
            })
            .then(response => {
                console.log("com",response.data);
                this.allComments = response.data;
            })
            .catch(error => {
            console.log(error); 
            })
        },
    methods: {
         setInfosCom(payload) {
            this.com = payload.com;
        },
        
    },
};
</script>
