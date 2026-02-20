<template>
  <div class="midde_cont">
    <div class="container-fluid">
      <div class="row column_title">
        <div class="col-md-12">
          <div class="page_title">
            <h2>Admission > Parents</h2>
          </div>
        </div>
      </div>
      <!--contents heaa-->
      <div class="row column4 graph">
        <div v-show="!add_parent" class="col-md-8">
          <div class="white_shd full margin_bottom_30">
            <div class="full graph_head">
              <div class="d-flex justify-content-between">
                <div class="heading1 margin_0">
                  <h2>New Parent</h2>
                </div>
                <button
                  v-on:click="this.parentExist"
                  class="btn btn-success ml-0"
                >
                  View Parents
                </button>
              </div>
            </div>
            <div class="full progress_bar_inner">
              <div class="row">
                <div class="col-md-12">
                  <form @submit.prevent="addParent" class="p-3">
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
                        <div class="form-group">
                          <label for="initial">Nationality*</label>
                          <input
                            type="text"
                            class="form-control"
                            v-model="this.form.nationality"
                            placeholder="Tanzanian"
                            required
                          />
                        </div>
                        
                      </div>

                      <div class="col-sm-12 col-md-6">
                        <div class="form-group">
                          <label for="phone">Phone*</label>
                          <input
                            type="text"
                            class="form-control"
                            v-model="this.form.phone"
                            placeholder="0768448525"
                            minlength="10"
                            maxlength="10"
                            required
                          />
                        </div>
                        <div class="form-group">
                          <label for="username">Email</label>
                          <input
                            type="username"
                            class="form-control"
                            v-model="this.form.email"
                            placeholder="john@gmail.com"
                            aria-describedby="emailHelp"
                          />
                        </div>

                        <div class="form-group">
                          <label for="home_address">Residence*</label>
                          <input
                            type="text"
                            class="form-control"
                            v-model="this.form.home_address"
                            placeholder="Dege Kigamboni"
                            aria-describedby="emailHelp"
                            required
                          />
                        </div>
                        <div class="form-group">
                          <label for="initial">Occupation*</label>
                          <input
                            type="text"
                            class="form-control"
                            v-model="this.form.occupation"
                            placeholder="Bus Drive"
                            required
                          />
                        </div>

                        <!--img
                          class="mt-2"
                          src=""
                          id="parent_photo"
                          style="width: 130px; height: 140px"
                          alt=""
                        />
                        <div class="form-group">
                          <label for="photo">Photo*</label>
                          <input
                            type="file"
                            @change="imageProcess"
                            class="form-control"
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
          <div v-show="add_parent" class="white_shd full margin_bottom_30">
            <div class="full graph_head">
              <div class="d-flex justify-content-between">
                <div class="heading1 margin_0">
                  <h2>All Parents</h2>
                </div>
                <button
                  v-on:click="this.parentExist"
                  class="btn btn-success ml-0"
                >
                  Add Parents
                </button>
              </div>
            </div>
            <div class="full progress_bar_inner">
              <div class="row">
                <div class="col-md-12">
                  <div class="inbox-head">
                    <h3>found ({{ this.parents.length }})</h3>
                    <form
                      @submit.prevent="searchParent"
                      class="pull-right position search_inbox"
                    >
                      <p
                        v-for="error in search_errors"
                        :key="error"
                        class="text-danger"
                      >
                        {{ error }}
                      </p>
                    
                      <div class="input-append">
                        <input
                          type="text"
                          class="sr-input"
                          v-model="this.search.search_parent"
                          placeholder="Search phone / name"
                          required
                        />
                        <button :disabled="this.loading" class="btn sr-btn" type="submit">
                          <i class="fa fa-search"></i>
                        </button>
                      </div>
                    </form>
                  </div>
                  <div class="inbox-body">
                    <div class="mail-option">
                      <div class="table-responsive-md w-100">
                
                        <div v-if="this.loading" class="container mt-5 mb-5">
                          <div class="row">
                            <div class="span2"></div>
                            <div class="span4">
                              <img class="center-block" width="500" src="/assets/images/loading/cupertino.gif" alt="#" />
                            </div>
                            <div class="span4"></div>
                          </div>
                        </div> 
                        
                        <table v-if="!this.loading" class="table table-hover">
                          <thead>
                            <th><b>Full Name</b></th>
                            <th><b>Phone</b></th>
                            <th><b>Home Address</b></th>
                            <th><b>Action</b></th>
                          </thead>
                          
                          <tbody>
                            <tr
                              v-show="parents"
                              v-for="parent in parents"
                              :key="parent.id"
                              class=""
                            >
                              <td class="">
                                {{
                                  parent.first_name +
                                  " " +
                                  parent.middle_name +
                                  " " +
                                  parent.last_name
                                }}
                              </td>
                              <td class="">{{ parent.phone }}</td>
                              <td :class="'text-' + parent.color">
                                {{ parent.home_address }}
                              </td>
                              <td class="">
                                <button
                                  parent_id="{{ parent.id }}"
                                  class="btn btn-sm btn-primary btn-table mr-1"
                                >
                                  <i class="fa fa-edit"></i>
                                </button>
                                <button class="btn btn-sm btn-info btn-table">
                                  <i class="fa fa-eye"></i>
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div v-if="!this.loading">
                          <div v-if="this.parents.length == 0" class="container">
                            <div class="row">
                              <div class="span2"></div>
                              <div class="span4">
                                <h5 class="text-capitalize text-danger">Not Parent Found</h5>
                              </div>
                              <div class="span4"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
      add_parent: true,
      loading:true,
      parents: [],
      errors: [],
      genders:[],
      search_errors: [],
      search: {
        search_parent: "",
      },
      form: {
        email: "",
        first_name: "",
        last_name: "",
        middle_name: "",
        gender: "",
        phone: "",
        home_address: "",
        nationality: "",
        occupation: "",
        photo: "man.png",
        user_id: "",
        role_id: "",
        department_id:""
      },
    };
  },
  methods: {
    parentExist() {
      this. allParents();
      this.add_parent = !this.add_parent;
    },
    async getGender() {
      var response = await axios.get(this.$store.state.api_url + "/genders")
        //console.log(response.data);
        this.genders = response.data;
      
    },
    async searchParent() {
      this.loading = true;
      this.search_errors = []
      var response = await axios
        .post(this.$store.state.api_url + "/search-parent", this.search)
        .catch((errors) => {
          this.loading = false;
          var message = "Network or Server Errors";
          this.$toast.error(message,{duration: 7000,dismissible: true,})
        });

        this.loading = false;
          if (response.data.success) {
            this.parents = response.data.parents;
            //console.log(response.data.parents);
          } else {
            this.search_errors = response.data.message;
          }
    },
    async allParents() {
      var response = await axios.get(this.$store.state.api_url + "/parents")
        //console.log(response.data);
        this.parents = response.data;
        this.loading = false;
    },
    async addParent() {
      this.errors = [];
      if(this.form.role_id == 4 || this.form.department_id == 2){
        var response = await axios
        .post(this.$store.state.api_url + "/create-parent", this.form)
        .catch((errors) => {
          var message = "Network or Server Errors";
          this.$toast.error(message,{duration: 7000,dismissible: true,})
        });
        
          if (response.data.success) {
           
            var message = response.data.message;
            this.$toast.success(message,{duration: 7000,dismissible: true,})
            window.location.reload();

          } else {
            this.errors = [response.data.message];
          }
      }else{
        var message = "Your not belong to Admission Deptartiment";
          this.$toast.error(message,{duration: 7000,dismissible: true,}) 
      }
    },
    
    isAuth() {

      var user_cry = localStorage.getItem("rich") || "";
      var token_cry = localStorage.getItem("rosh") || "";
      var user = CryptoJS.AES.decrypt(user_cry, 'rich').toString(CryptoJS.enc.Utf8) || null
      var token = CryptoJS.AES.decrypt(token_cry, 'rosh').toString(CryptoJS.enc.Utf8) || null

      if (user && token) {
        user = JSON.parse(user);
        this.form.user_id = user.id;
        this.form.department_id = user.department_id;
        this.form.role_id = user.role_id;
      }
    },
  },
  created() {
    this.isAuth();
    this.allParents();
    this.getGender();
  },
};
</script>
