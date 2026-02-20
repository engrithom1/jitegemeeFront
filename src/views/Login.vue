<template>
  <div class="inner_page login">
    <div class="full_container">
      <div class="container">
        <div class="center verticle_center full_height">
          <div class="login_section">
            <div class="logo_login">
              <div class="center">
                <img width="200" src="/jmis/assets/images/logo/jmis_logo-bg.png" alt="#" />
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
                    <a class="forgot" href="#" data-toggle="modal" data-target="#quick-approve">Forgotten Password?</a>
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

  <div class="modal fade mobile-full-width" data-backdrop="static" data-keyboard="false" id="quick-approve">
    <div class="modal-dialog modal-dialog-centered modal-md" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4>Forget Password</h4>
                <button  type="button" class="btn-close" :disabled="this.alert_load" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>    
            <div class="modal-body m-2">
                <div v-if="auth" class="login-form">
                        <div>
                            <div class="login-discription">
                                <p class="text-primary">Please enter username or index number </p>
                            </div>
                            <div v-if="this.alert_danger" class="alert alert-danger mt-3" role="alert">
                                {{ this.message }}
                            </div>
                            <div v-if="this.alert_success" class="alert alert-success mt-3" role="alert">
                                {{ this.message }}
                            </div>
                            <div class="form-sec">
                                <div>
                                    <form class="theme-form" @submit.prevent="forgetPassword">
                                        <div v-if="this.alert_load" class="loading-img container-fluid">
                                            <img class="img-gif" width="300" src="/jmis/assets/images/loading/cupertino.gif" alt="#" />
                                        </div>
                                           
                                        <div class="form-group">
                                            <label for="exampleInputEmail1">Username/ Index no</label>
                                            <input type="text" v-model="username" required class="form-control" id="exampleInputEmail1"
                                                placeholder="">
                                            
                                        </div>
                                        
                                        <div class="btn-section mt-5">
                                            <button :disabled="this.alert_load" type="submit" class="btn btn-success">Submit</button>
                                            <span class="ml-2"></span>
                                            <button :disabled="this.alert_load" type="button" class="btn btn-danger" data-dismiss="modal" aria-label="Close">Close</button>
                                        </div>
                                    </form>

                                </div>
                            </div>
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
      alert_danger:false,
      alert_success:false,
      alert_load:false,
      message:"",
      username:"",
      auth:true,
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async forgetPassword(){
        var username = this.username

        this.alert_load = true
        this.alert_danger = false
        this.alert_success = false

        var response = await axios.post(this.$store.state.api_url + "/forget-password-request",{username})
        .catch((errors) => {
        this.alert_load = false
        var message = "Network or Server Errors";
        this.$toast.error(message,{duration: 7000,dismissible: true,})
        });
    
        if (response.data.success) {
            this.alert_load = false
            if(response.data.status == 1){
                this.alert_success = true
                this.alert_danger = false
                this.message = response.data.message
            }
            if(response.data.status == 2){
                this.alert_danger = true
                this.alert_success = false
                this.message = response.data.message
            }
            if(response.data.status == 3){
              alert(response.data.message)
                //alert("If you don't receive SMS, Wait for 10min then try again")
            }   
    
        } else {
            this.alert_load = false
            console.log(response.data.errors)
        }
                
    
    },
    login() {
      this.$store.dispatch("loginUser", this.form);
    },
  },
  created() {},
};
</script>
