<template>
  <div>
    <h4>Register</h4>
    <span v-if="registered">Successfully registered</span><br>
    <input type="text" v-model="form.name" placeholder="Name"><br>
    <input type="text" v-model="form.email" placeholder="Email"><br>
    <input type="password" v-model="form.password" placeholder="Password"><br>
    <input type="password" v-model="password_confirmation" placeholder="Password Confirmation"><br>
    <button @click="sendForm" :disabled="pending">Registration</button>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "v-register",
  data() {
    return {
      pending: false,
      registered: false,
      form: {
        name: '',
        email: '',
        password: ''
      },
      password_confirmation: ''
    }
  },
  methods: {
    ...mapActions([
        'REGISTER'
    ]),
    sendForm() {
      if (this.password_confirmation === this.form.password) {
        this.REGISTER(this.form)
      } else {
        alert('Your passwords do not match')
      }
    }
  }
}
</script>

<style scoped>

</style>