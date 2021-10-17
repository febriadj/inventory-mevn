<template>
  <div :id="$style.login">
    <div :id="$style['login-wrap']">
      <div :id="$style.header">
        <h2>Login With Your Account</h2>
        <p :class="$style.notif">{{ notif }}</p>
      </div>
      <form method="post" :id="$style.form" @submit.prevent="handleSubmit" autocomplete="off">
        <span :class="$style.line">
          <label for="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Your Email"
            v-model="fields.email"
          >
        </span>
        <span :class="$style.line">
          <label for="password">Password</label>
          <input
            type="password"
            name="email"
            id="password"
            placeholder="Enter Your Password"
            v-model="fields.password"
          >
        </span>
        <span :class="$style.submit">
          <button type="submit" :class="$style['submit-btn']">Login</button>
        </span>
      </form>
      <div :id="$style.footer">
        <p :class="$style.paragraf">Don't have an account yet?</p>
        <router-link to="/register">Register</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { gql } from 'apollo-boost';

export default {
  name: 'Login',
  data() {
    return {
      fields: {
        email: '',
        password: '',
      },
      notif: null,
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const request = await this.$apollo.mutate({
          mutation: gql`mutation {
            UserLogin(
              email: "${this.fields.email}"
              password: "${this.fields.password}"
            ) {
              token
            }
          }`,
        });

        this.notif = 'You have successfully logged in';
        sessionStorage.setItem('token', request.data.UserLogin.token);

        setTimeout(() => {
          this.$router.go();
        }, 2000);
      }
      catch (error0) {
        this.notif = error0.message;
      }
    },
  },
}
</script>

<style module>
#login {
  position: absolute;
  width: 100%; height: 100%;
  display: flex; justify-content: center; align-items: center;
  background: #f5e7ff;
  z-index: 9;
}
#login-wrap {
  width: 350px;
  background: #fff;
  padding: 20px;
}
#header .notif {
  margin: 10px 0 0 0;
}
#form {
  display: flex; flex-direction: column;
  gap: 20px;
  margin: 20px 0 40px 0;
}
#form .line {
  display: flex; flex-direction: column;
  padding: 10px 30;
}
#form label {
  text-transform: uppercase;
  font-size: 0.85rem;
}
#form input {
  padding: 10px 0;
  background: transparent;
  border-bottom: 1px solid #352a3a;
}
.submit {
  display: flex;
}
.submit-btn {
  width: 150px;
  background: #95899e;
  display: flex; justify-content: center; align-items: center;
  cursor: pointer;
  padding: 10px 0;
  color: #fff;
}
.submit-btn:hover {
  filter: brightness(0.95);
}
#footer {
  display: flex; align-items: center; gap: 10px;
}
</style>
