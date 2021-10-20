<template>
  <div :id="$style.register">
    <div :id="$style['register-wrap']">
      <div :id="$style.header">
        <h2>Register Your Account</h2>
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
          <label for="email">Full Name</label>
          <input
            type="text"
            name="profileName"
            id="profile-name"
            placeholder="Enter Your Fullname"
            v-model="fields.profileName"
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
          <button type="submit" :class="$style['submit-btn']">Register</button>
        </span>
      </form>
      <div :id="$style.footer">
        <p :class="$style.paragraf">Already have an account?</p>
        <router-link to="/">Login</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { gql } from 'apollo-boost';

export default {
  name: 'Register',
  data() {
    return {
      fields: {
        email: '',
        profileName: '',
        password: '',
      },
      notif: null,
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const request = await this.$apollo.mutate({
          mutation: gql`mutation($email: String!, $profileName: String, $password: String!) {
            UserRegister(
              email: $email
              profileName: $profileName
              password: $password
            ) {
              email
              profileName
              password
            }
          }`,
          variables: {
            email: this.fields.email,
            profileName: this.fields.profileName,
            password: this.fields.password,
          },
        });

        this.notif = 'Account created successfully';
        console.log(request);

        setTimeout(() => this.$router.push('/'), 800);
      }
      catch (error0) {
        this.notif = error0.message;
      }
    },
  },
}
</script>

<style module>
#register {
  position: absolute;
  width: 100%; height: 100%;
  display: flex; justify-content: flex-start;
  background: #171724;
  z-index: 9;
}
#register-wrap {
  width: 400px;
  background: #fff;
  padding: 20px;
}
#header .notif {
  margin: 10px 0 0 0;
}
#form {
  display: flex; flex-direction: column;
  gap: 20px;
  margin: 40px 0;
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
  background: #303044;
  display: flex; justify-content: center; align-items: center;
  cursor: pointer;
  padding: 10px 0;
  color: #fff;
}
.submit-btn:hover {
  filter: brightness(0.95);
}
#footer {
  position: absolute;
  bottom: 0;
  display: flex; align-items: center; gap: 10px;
  margin: 0 0 20px 0;
}
</style>
