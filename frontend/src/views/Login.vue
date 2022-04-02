<template>
  <main class="main main--connect">
    <form
      class="w-75 align-items-center form-block d-flex m-auto shadow rounded"
    >
      <div
        class="form-block--left d-flex flex-column justify-content-center block-demi-container p-3 text-right align-self-stretch"
      >
        <img
          class="logo align-self-end"
          src="../assets/icon.svg"
          alt="Logo Groupomania"
        />
        <p>
          <small>
            Vous n'avez pas encore de compte,
            <router-link class="redirection-singup" to="/signup">enregistrez-vous
            </router-link>
          </small>
        </p>
      </div>
      <div class="block-demi-container p-3">
        <div class="form-group">
          <label for="inputEmail">Email</label>
          <input
            type="text"
            class="form-control"
            id="inputEmail"
            v-model="email"
          />
        </div>
        <div class="form-group">
          <label for="inputPassword">Mot de passe</label>
          <input
            type="password"
            class="form-control"
            id="inputPassword"
            v-model="password"
          />
        </div>
        <button @click.prevent="logIn" type="submit" class="btn btn-primary">
          Envoyer
        </button>
      </div>
    </form>
  </main>
</template>

<script>
import axios from "axios";
import { mapMutations, mapState } from "vuex";
export default {
  name: "SignUp",
  data() {
    return {
      email: null,
      password: null,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    ...mapMutations(["saveUserInfos"]),
    logIn() {
      if (this.email !== null || this.password !== null) {
        axios.post("http://localhost:5000/api/user/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          this.saveUserInfos(response.data);
          this.$router.push("/");
          // localStorage.setItem('token',response.data.token)
          // location.replace(location.origin)
          console.log(response);
        })
        .catch((error) => console.log(error));
      } else {
        console.log("oops !");
      }
    },
  },
};
</script>

<style lang="scss">
.main {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding-top: 100px;
  &--connect {
    background-size: cover;
  }
}
</style>
