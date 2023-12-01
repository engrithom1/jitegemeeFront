<template>
  <div class="inner_page login">
    <div class="full_container">
      <div class="container">
        <div class="center verticle_center full_height">
          <div class="login_section">
            <div class="logo_login">
              <div class="center">
                <img width="200" src="/assets/images/logo/jmis_logo-bg.png" alt="#" />
              </div>
            </div>
            <div class="login_form">
              <form @submit.prevent="login">
                <p class="text-danger">
                  {{ this.$store.state.errors }}
                </p>
                <fieldset>
                  <div class="field">
                    <!--label class="label_field hidden">Username</label-->
                    <input
                      type="text"
                      name="usarname"
                      v-model="this.form.username"
                      placeholder="Username"
                    />
                  </div>
                  <div class="field">
                    <label class="label_field hidden">Password</label>
                    <input
                      type="password"
                      name="password"
                      v-model="this.form.password"
                      placeholder="Password"
                    />
                  </div>
                  <div class="field">
                    <label class="label_field hidden">hidden label</label>
                    <label class="form-check-label hidden"
                      ><input type="checkbox" class="form-check-input" />
                      Remember Me</label
                    >
                    <a class="forgot" href="">Forgotten Password?</a>
                  </div>
                  <div class="field margin_0">
                    <label class="label_field hidden">hidden label</label>
                    <input type="submit" value="Sing In" class="main_bt" />
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      errors: "",
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      this.$store.dispatch("loginUser", this.form);
    },
  },
  created() {},
};
</script>
