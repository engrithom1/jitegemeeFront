<template>
  <div class="midde_cont">
    <div class="container-fluid">
      <div class="row column_title">
        <div class="col-md-12">
          <div class="page_title">
            <h2>Staff</h2>
          </div>
        </div>
      </div>
      <!--contents heaa-->
      <div class="row column4 graph">
        <div v-show="!add_staff" class="col-md-8">
          <div class="white_shd full margin_bottom_30">
            <div class="full graph_head">
              <div class="d-flex justify-content-between">
                <div class="heading1 margin_0">
                  <h2>New Staff</h2>
                </div>
                <button
                  v-on:click="this.parentExist"
                  class="btn btn-success ml-0"
                >
                  View Staff
                </button>
              </div>
            </div>
            <div class="full progress_bar_inner">
              <div class="row">
                <div class="col-md-12">
                  <form @submit.prevent="addNewStaff" class="p-3">
                    <div class="row">
                      <div class="col-sm-12 text-center">
                        <div class="form-group">
                          <p
                            v-for="error in errors"
                            :key="error"
                            class="text-danger"
                          >
                            {{ error[0] }}
                          </p>
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-6">
                        <div class="form-group">
                          <label for="roles">Initial*</label>
                          <select
                            v-model="this.form.initial"
                            id="initial"
                            class="form-control"
                            required
                          >
                            <option class="" value="Dr">Dr</option>
                            <option class="" value="Prof">Prof</option>
                            <option class="" value="Mr">Mr</option>
                            <option class="" value="Ms">Ms</option>
                            <option class="" value="Tr">Tr</option>
                          </select>
                        </div>
                        
                        <div class="form-group">
                          <label for="first_name">First Name*</label>
                          <input
                            type="text"
                            class="form-control"
                            id="first_name"
                            v-model="this.form.first_name"
                            placeholder="john"
                            aria-describedby="emailHelp"
                            required
                          />
                        </div>
                        <div class="form-group">
                          <label for="middle_name">Middle Name*</label>
                          <input
                            type="text"
                            class="form-control"
                            id="middle_name"
                            v-model="this.form.middle_name"
                            placeholder="juvenal"
                            aria-describedby="emailHelp"
                            required
                          />
                        </div>
                        <div class="form-group">
                          <label for="last_name">Last Name*</label>
                          <input
                            type="text"
                            class="form-control"
                            id="last_name"
                            v-model="this.form.last_name"
                            placeholder="Bongo"
                            aria-describedby="emailHelp"
                            required
                          />
                        </div>

                        <div class="form-group">
                          <label for="gender">Gender*</label>
                          <select
                            class="form-control"
                            v-model="this.form.gender"
                            id="gender"
                            required
                          >
                            <option class="text-capitalize" value="1">Male</option>
                            <option class="text-capitalize" value="2">Female</option>
                          </select>
                        </div>
                      </div>

                      <div class="col-sm-12 col-md-6">
                        <div class="form-group">
                          <label for="phone">Phone</label>
                          <input
                            type="text"
                            class="form-control"
                            id="phone"
                            v-model="this.form.phone"
                            placeholder="0768448525"
                            minlength="10"
                            maxlength="10"
                            required
                          />
                        </div>
                        <div class="form-group">
                          <label for="username">Email / Username</label>
                          <input
                            type="username"
                            class="form-control"
                            id="username"
                            v-model="this.form.username"
                            placeholder="john@gmail.com"
                            aria-describedby="emailHelp"
                            required
                          />
                        </div>

                        <div class="form-group">
                          <label for="home_address">Residence*</label>
                          <input
                            type="text"
                            class="form-control"
                            v-model="this.form.home_address"
                            id="home_address"
                            placeholder="Dege Kigamboni"
                            aria-describedby="emailHelp"
                            required
                          />
                        </div>

                        <div class="form-group">
                          <label for="roles">User Role*</label>
                          <select
                            v-model="this.form.role"
                            id="roles"
                            class="form-control"
                            required
                          >
                            <option
                             
                              class="text-capitalize"
                              v-for="role in roles"
                              :key="role.id"
                              :value="role.id"
                             
                            >
                              {{ role.role }}
                            </option>
                          </select>
                        </div>
                        <div class="form-group">
                          <label for="roles">Department*</label>
                          <select
                            v-model="this.form.department"
                            id="roles"
                            class="form-control"
                            required
                          >
                            <option
                              class=""
                              v-for="department in departments"
                              :key="department.id"
                              :value="department.id"
                            >
                              {{ department.department }}
                            </option>
                          </select>
                        </div>

                        <!--img
                          class="mt-2"
                          src=""
                          id="staff_photo"
                          style="width: 130px; height: 140px"
                          alt=""
                        />
                        <div class="form-group">
                          <label for="photo">Photo*</label>
                          <input
                            type="file"
                            @change="imageProcess"
                            class="form-control"
                            id="photo"
                            name="photo"
                            aria-describedby="emailHelp"
                          />
                        </div-->
                      </div>
                    </div>
                    <input
                      type="submit"
                      value="Submit"
                      class="btn btn-success"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <div v-show="add_staff" class="white_shd full margin_bottom_30">
            <div class="full graph_head">
              <div class="d-flex justify-content-between">
                <div class="heading1 margin_0">
                  <h2>All Staff</h2>
                </div>
                <button
                  v-on:click="this.parentExist"
                  class="btn btn-success ml-0"
                >
                  Add Staff
                </button>
              </div>
            </div>
            <div class="full progress_bar_inner">
              <div class="row">
                <div class="col-md-12">
                  <!--div  class="inbox-head">
                    <h3>found (10)</h3>
                    <form action="#" class="pull-right position search_inbox">
                      <div class="input-append">
                        <input
                          type="text"
                          class="sr-input"
                          placeholder="Search parent"
                        />
                        <button class="btn sr-btn" type="button">
                          <i class="fa fa-search"></i>
                        </button>
                      </div>
                    </form>
                  </div-->
                  <div v-if="this.loading" class="container mt-5 mb-5">
                    <div class="row">
                      <div class="span2"></div>
                      <div class="span4">
                        <img class="center-block" width="500" src="/assets/images/loading/cupertino.gif" alt="#" />
                      </div>
                      <div class="span4"></div>
                    </div>
                  </div>
                  <div class="full price_table padding_infor_info">
                  <div v-if="!this.loading" class="row">
                     <!-- column contact --> 
                     <div v-for="staff in staffs" :key="staff.id" class="col-lg-4 col-md-6 col-sm-6 col-xs-12 profile_details margin_bottom_30">
                          <div class="contact_blog">
                            <h4 class="brief">{{ staff.department }}</h4>
                            <div class="contact_inner">
                                <div class="left">
                                  <h3 class="text-capitalize">{{ staff.initial+" "+staff.first_name+" "+staff.last_name }}</h3>
                                </div>
                                <div class="right">
                                  <div class="profile_contacts">
                                      <img class="img-responsive" :src="'/assets/images/logo/'+staff.photo" alt="#" />
                                  </div>
                                </div>
                                <div class="bottom_list">
                                  <ul class="list-unstyled">
                                      <li><i class="fa fa-envelope-o"></i> : {{ staff.email }}</li>
                                      <li><i class="fa fa-phone"></i> : {{ staff.phone }}</li>
                                  </ul>
                                  <div class="left_rating">
                                      <p :class="'text-'+staff.color">
                                        {{staff.role}}
                                      </p>
                                  </div>
                                  <div class="right_button">
                                      <button v-if="form.role_id == 4" type="button" class="btn btn-success btn-xs mr-2"> <i class="fa fa-user">
                                      </i> <i class="fa fa-edit"></i> 
                                      </button>
                                      <router-link to="/profile" v-if="staff.id == form.user_id" type="button" class="btn btn-primary btn-xs">
                                      <i class="fa fa-user"> </i> View Profile
                                      </router-link>
                                  </div>
                                </div>
                            </div>
                          </div>
                      </div>
                      <!-- end column contact blog -->
                  </div>
                </div>

                  <!--kukazaaaa-->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--contents heaa-->
    </div>
    <!-- footer -->
    <div class="container-fluid">
      <div class="footer">
        <p>Copyright © 2023 Jitegemee MIS. All rights reserved.<br /></p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import * as CryptoJS from 'crypto-js';

export default {
  data() {
    return {
      add_staff: true,
      loading:true,
      roles: [],
      genders:[],
      departments: [],
      staffs: [],
      errors: [],
      form: {
        username: "",
        first_name: "",
        last_name: "",
        middle_name: "",
        initial: "",
        gender: "",
        phone: "",
        home_address: "",
        role: "",
        photo: "man.png",
        user_id: "",
        role_id: "",
      },
    };
  },
  methods: {
    parentExist() {
      this.allStaff();
      this.add_staff = !this.add_staff;
    },
    async userRole() {
      var role_id = this.form.role_id
      var response = await axios.get(this.$store.state.api_url + "/roles")
        console.log(response.data);
          this.roles = response.data.filter((i) => i.id != 1)
        if(role_id != 4){
          this.roles = this.roles.filter((i) => i.id != 4) 
        }
     
    },
    async getGender() {
      var response = await axios.get(this.$store.state.api_url + "/genders")
        console.log(response.data);
        this.genders = response.data;
      
    },
    async allDepartment() {
      var response = await axios.get(this.$store.state.api_url + "/departments")
        console.log(response.data);
        this.departments = response.data;
      
    },
    async allStaff() {
      var response = await axios.get(this.$store.state.api_url + "/staffs")
        //console.log(response.data);
        this.staffs = response.data;
        this.loading = false
    },
    async addNewStaff() {
      this.errors = [];
      var response = await axios
        .post(this.$store.state.api_url + "/create-staff", this.form)
        .catch((errors) => {
          
          var message = "Network or Server Errors";
          this.$toast.error(message,{duration: 7000,dismissible: true,})
        });
          if (response.data.success) {
            //alert(response.data.message);
            var message = response.data.message;
            this.$toast.success(message,{duration: 7000,dismissible: true,})
            window.location.reload();
          } else {
            this.errors = response.data.message;
          }
     
        
    },
    
    emptyForm() {
      (this.form.username = ""),
        (this.form.first_name = ""),
        (this.form.last_name = ""),
        (this.form.middle_name = ""),
        (this.form.initial = ""),
        (this.form.gender = ""),
        (this.form.phone = ""),
        (this.form.home_address = ""),
        (this.form.role = "");
    },
    isAuth() {
      var user_cry = localStorage.getItem("rich") || "";
      var token_cry = localStorage.getItem("rosh") || "";
      var user = CryptoJS.AES.decrypt(user_cry, 'rich').toString(CryptoJS.enc.Utf8) || null
      var token = CryptoJS.AES.decrypt(token_cry, 'rosh').toString(CryptoJS.enc.Utf8) || null

      if (user && token) {
        user = JSON.parse(user);
        this.form.user_id = user.id;
        this.form.role_id = user.role_id;
      }
    },
  },
  created() {
    this.isAuth();
    this.userRole();
    this.getGender();
    this.allStaff();
    this.allDepartment();
    
  },
};
</script>
