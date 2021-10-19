<template>
  <div :id="$style.navbar">
    <div :id="$style['navbar-wrap']">
      <div :id="$style.header">
        <h3 class="logo">Inventory App</h3>
      </div>
      <div :id="$style.link">
        <router-link to="/" :class="$style.links">
          <i class="bx bx-grid-alt"></i>
          <p :class="$style.paragraf">Dashboard</p>
        </router-link>
        <router-link to="/item" :class="$style.links">
          <i class="bx bx-cube-alt"></i>
          <p :class="$style.paragraf">Item</p>
        </router-link>
        <router-link to="/category" :class="$style.links">
          <i class="bx bx-notepad"></i>
          <p :class="$style.paragraf">Category</p>
        </router-link>
        <router-link to="/warehouse" :class="$style.links">
          <i class="bx bx-package"></i>
          <p :class="$style.paragraf">Warehouse</p>
        </router-link>
        <router-link to="/loan" :class="$style.links">
          <i class="bx bx-basket"></i>
          <p :class="$style.paragraf">Loan</p>
        </router-link>
      </div>
      <div :id="$style.profile">
        <div :id="$style['profile-wrap']">
          <div :class="$style.photo"></div>
          <div :class="$style.text">
            <p :class="$style['profile-name']">{{ user.profileName }}</p>
            <p :class="$style.role">Admin</p>
          </div>
          <button
            class="bx bx-log-out-circle"
            :class="$style['exit-btn']"
          ></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { gql } from 'apollo-boost';

export default {
  name: 'Navbar',
  data() {
    return {
      user: null,
    }
  },
  methods: {
    async handleGetUser() {
      try {
        const token = sessionStorage.getItem('token');

        const request = await this.$apollo.query({
          query: gql`query ($tokenExists: Boolean!, $token: String!) {
            UserVerify(tokenExists: $tokenExists, token: $token) {
              _id
              email
              profileName
              photo
            }
          }`,
          variables: {
            tokenExists: token !== false,
            token,
          },
        });

        this.user = request.data.UserVerify;
      }
      catch (error0) {
        console.error(error0.message);
      }
    },
  },
  async mounted() {
    this.handleGetUser();
  },
}
</script>

<style module>
#navbar {
  position: fixed;
  width: 220px; height: 100%;
  display: flex;
  background: #171724;
  color: #ffffffda;
}
#navbar-wrap {
  display: grid; grid-template-rows: auto 1fr auto;
  width: 100%;
  padding: 20px 0;
}
#header {
  margin: 0 20px 40px 20px;
  text-transform: uppercase;
}
#link {
  display: flex; flex-direction: column;
  padding: 0 20px 0 0;
}
#link .links {
  text-decoration: none;
  color: #ffffffda;
  display: grid; grid-template-columns: auto 1fr; gap: 20px;
  align-items: center;
  padding: 10px 20px;
  border-radius: 0 2rem 2rem 0;
}
#link .links:hover {
  background: #303044;
  color: #fff;
}
#link .links .icon {
  width: 30px;
  display: flex; justify-content: center; align-items: center;
}
#profile-wrap {
  display: grid; grid-template-columns: auto 1fr auto; gap: 10px;
  align-items: center;
  padding: 20px 10px 0 10px;
}
#profile #profile-wrap .photo {
  display: block;
  width: 50px; height: 50px;
  background: #303044;
  border-radius: 50%;
}
#profile #profile-wrap .text {
  display: flex; flex-direction: column;
}
#profile #profile-wrap .text .role {
  font-size: 0.85rem;
}
#profile #profile-wrap .exit-btn {
  cursor: pointer;
  font-size: 1.5rem;
  background: transparent;
  color: #fff;
}
#profile #profile-wrap .exit-btn:hover {
  background: #303044;
}
</style>
