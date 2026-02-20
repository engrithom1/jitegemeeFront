<template>
    <div class="midde_cont">
        <div class="container-fluid">
            <div class="row column_title">
                <div class="col-md-12">
                    <div class="page_title">
                        <h2>My Profile</h2>
                    </div>
                </div>
            </div>
  
            <!-- row -->
            <div class="row column1">
                <div class="col-md-2"></div>
                <div class="col-md-8">
                    <div class="white_shd full margin_bottom_30">
                        <div class="full graph_head">
                            <div class="heading1 margin_0">
                            <h2>User profile</h2>
                            </div>
                        </div>
                        <div class="full price_table padding_infor_info">
                            <div class="row">
                            <!-- user profile section --> 
                            <!-- profile image -->
                            <div class="col-12">
                                <div v-if="this.me_loading" class="container mt-5 mb-5">
                                    <div class="row">  
                                      <div class="span4">
                                        <img class="center-block" width="500" src="/assets/images/loading/cupertino.gif" alt="#" />
                                      </div>
                                      <div class="span4"></div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="!this.me_loading" class="col-lg-12">
                                <div class="full dis_flex center_text">
                                    <div class="profile_img">
                                        <img width="150" class="rounded-circle"
                                              :src="'/assets/images/logo/'+this.me.photo"
                                              alt="#"
                                        />
                                    </div>
                                    <div class="profile_contant">
                                        <div class="contact_inner">
                                        <h3 class="text-capitalize">{{ me.initial+" "+me.first_name+" "+me.middle_name+" "+me.last_name }}</h3>
                                        <p><strong>Department: </strong>{{ me.department }}</p>
                                        <ul class="list-unstyled">
                                            <li><i class="fa fa-envelope-o"></i> : {{ me.email }}</li>
                                            <li><i class="fa fa-phone"></i> :{{ me.phone }}</li>
                                        </ul>
                                        </div>
                                        
                                    </div>
                                </div>
                                <!-- profile contant section -->
                                <div class="full inner_elements margin_top_30">
                                    <div class="tab_style2">
                                        <div class="tabbar">
                                        <nav>
                                            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                                <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#recent_activity" role="tab" aria-selected="true">About Me</a>
                                                <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#project_worked" role="tab" aria-selected="false">Change Password</a>
                                            </div>
                                        </nav>
                                        <div class="tab-content" id="nav-tabContent">
                                            <div class="tab-pane fade show active" id="recent_activity" role="tabpanel" aria-labelledby="nav-home-tab">
                                               <form @submit.prevent="updateAboutMe" class="form">
                                                <div class="form-group">
                                                  <label for="about_me">Tel Parents and Student About You</label>
                                                  <textarea required class="form-control" v-model="this.me.about_me" id="about_me"></textarea>
                                                </div>
                                                <div class="form-group">
                                                    <input :disabled="me_btn" class="btn btn-success" type="submit" value="Update Info">
                                                </div>
                                               </form> 
                                            </div>
                                            <div class="tab-pane fade" id="project_worked" role="tabpanel" aria-labelledby="nav-profile-tab">
                                              <form @submit.prevent="changePassword" class="form">
                                                <div class="form-group">
                                                  <label for="cp">Current Password</label>
                                                  <input required class="form-control" v-model="this.current_password" id="cp"/>
                                                </div>
                                                <div class="form-group">
                                                  <label for="np">New Password</label>
                                                  <input required minlength="8" maxlength="10" class="form-control" v-model="this.new_password" id="np"/>
                                                </div>
                                                <div class="form-group">
                                                  <label for="ccp">Confirm Password</label>
                                                  <input required minlength="8" maxlength="10" class="form-control" v-model="this.confirm_password" id="ccp"/>
                                                </div>
                                                <div class="form-group">
                                                    <input :disabled="password_btn" class="btn btn-success" type="submit" value="Change Password">
                                                </div>
                                               </form>  
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- end user profile section -->
                            </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2"></div>
                </div>
                <!-- end row -->
                </div>
                <!-- footer -->
        </div>
          <!-- The Modal -->
          
    <!-- end model popup -->
        <!-- footer -->
        <div class="container-fluid">
            <div class="footer">
                <p>Copyright © 2023 Jitegemee MIS. All rights reserved.<br /></p>
            </div>
        </div>
        <!-- payment table-->
    </div>
    
  </template>
  
  <script>
  import axios from "axios";
  import * as CryptoJS from 'crypto-js';
  
  export default {
    data() {
      return {
        me_loading: true,
        me_btn:false,
        password_btn:false,
        /////password detail
        new_password:"",
        confirm_password:"",
        current_password:"",
        ////basic
        user_id:"",
        role_id:"",
        accademic_year: new Date().getFullYear(),
        me:{
          about_me:"am staff at jitegee secondary"
        },
      };
    },
    methods: {
    staffProfile(){
        var user_id = this.user_id

        axios.post(this.$store.state.api_url + "/staff-profile",{user_id}).then((response) => {
        //console.log(response.data);
        if(response.data.success){
            this.me = response.data.me;
            this.me_loading = false;
        }else{
          var message = response.data.message
          this.$toast.error(message,{duration: 7000,dismissible: true,})
        }
        }).catch((errors) => {
          //console.log(errors);
          
          var message = "Network or Server Errors"
          this.$toast.error(message,{duration: 7000,dismissible: true,})
        });

    },
    changePassword(){
       var current_password = this.current_password
       var new_password = this.new_password
       var confirm_password = this.confirm_password
       var user_id = this.user_id

       this.password_btn = true;
      
       if(new_password == confirm_password){

        if(new_password == current_password){
          var message = "You just Entered the same Password"
          this.$toast.error(message,{duration: 7000,dismissible: true,})
        }else{
          axios.post(this.$store.state.api_url + "/change-password",{user_id,new_password,current_password}).then((response) => {
          
            if(response.data.success){
 
            var message = response.data.message
            this.$toast.success(message,{duration: 7000,dismissible: true,})

            //this.logout(user_id)
            localStorage.removeItem("rosh")
            localStorage.removeItem("rich")

            setTimeout(function(){
              window.location.replace('/');
            },2000);

            }else{
              //alert(response.data.message+"toast doesnt wak")
              var message = response.data.message
              this.$toast.error(message,{duration: 7000,dismissible: true,})
            }
        }).catch((errors) => {
          var message = "Network or Server Errors"
          this.$toast.error(message,{duration: 7000,dismissible: true,})
        });
        }
        
      }else{
        var message = "New Password must metch confirm Password"
        this.$toast.error(message,{duration: 7000,dismissible: true,})
      }
      this.password_btn = false;
    },  

    updateAboutMe(){
       var about_me = this.me.about_me
       var index_no = this.me.index_no
       var user_id = this.user_id

       this.me_btn = true;
      
       axios.post(this.$store.state.api_url + "/update-about-me",{user_id,about_me,index_no}).then((response) => {
        if(response.data.success){
          var message = response.data.message
          this.$toast.success(message,{duration: 7000,dismissible: true,})
        }else{
          var message = response.data.message
          this.$toast.error(message,{duration: 7000,dismissible: true,})
        }
        }).catch((errors) => {
          var message = "Network or Server Errors"
          this.$toast.error(message,{duration: 7000,dismissible: true,})
        });
        this.me_btn = false;
    },
    isAuth() {
      var user_cry = localStorage.getItem("rich") || "";
      var token_cry = localStorage.getItem("rosh") || "";
      var user = CryptoJS.AES.decrypt(user_cry, 'rich').toString(CryptoJS.enc.Utf8) || null
      var token = CryptoJS.AES.decrypt(token_cry, 'rosh').toString(CryptoJS.enc.Utf8) || null
    if (user && token) {
      user = JSON.parse(user);
      this.user_id = user.id;
      this.role_id = user.role_id;
    }
  },
      refleshPage(){
        window.location.reload();
      },
    },
    created() {
      this.isAuth();
      this.staffProfile()
    },
  };
  </script>
  