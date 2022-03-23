<template>
  <div>
    <h4>Register</h4>
    <span v-if="registered">Successfully registered</span><br>
    <input type="text" v-model="form.name" placeholder="Name"><br>
    <input type="text" v-model="form.email" placeholder="Email"><br>
    <input type="password" v-model="form.password" placeholder="Password"><br>
    <input type="password" v-model="form.password_confirmation" placeholder="Password Confirmation"><br>
    <button @click="sendForm" :disabled="pending">Registration</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "v-register",
  data() {
    return {
      pending: false,
      registered: false,
      form: {
        name: null,
        email: null,
        password: null,
        password_confirmation: null
      }
    }
  },
  methods: {
    sendForm() {
      if (this.pending === false) {
        this.pending = true;
        axios.post('http://127.0.0.1:8000/register', this.form,{ useCredentails: true })
            .then(response => {
              this.registered = true;
              console.log(response)
            })
            .catch(errors => console.log(errors))
            .then(() => {
              this.pending = false;
            });
      }
    }
  }
}
</script>

<style scoped>

</style>