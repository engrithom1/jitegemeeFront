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
                          <label for="initial">Name Initial</label>
                          <input
                            type="text"
                            class="form-control"
                            id="initial"
                            v-model="this.form.initial"
                            placeholder="Dr/Col/Maj/Tr/Prof/Mr/Mrs  ect"
                            aria-describedby="emailHelp"
                            required
                          />
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
                            <option
                              class="text-capitalize"
                              v-for="gender in genders"
                              :key="gender.id"
                              :value="gender.id"
                            >
                              {{ gender.gender }}
                            </option>
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
                          <label for="home_address">Home address*</label>
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
                  <div class="inbox-head">
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
                  </div>
                  <div class="full price_table padding_infor_info">
                  <div class="row">
                     <!-- column contact --> 
                     <div v-for="staff in staffs" :key="staff.id" class="col-lg-4 col-md-6 col-sm-6 col-xs-12 profile_details margin_bottom_30">
                          <div class="contact_blog">
                            <h4 class="brief">{{ staff.department }}</h4>
                            <div class="contact_inner">
                                <div class="left">
                                  <h3>{{ staff.initial+" "+staff.first_name+" "+staff.last_name }}</h3>
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
                                      <button type="button" class="btn btn-success btn-xs mr-2"> <i class="fa fa-user">
                                      </i> <i class="fa fa-comments-o"></i> 
                                      </button>
                                      <button type="button" class="btn btn-primary btn-xs">
                                      <i class="fa fa-user"> </i> View Profile
                                      </button>
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

export default {
  data() {
    return {
      add_staff: true,
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
    userRole() {
      axios.get(this.$store.state.api_url + "/roles").then((response) => {
        console.log(response.data);
        this.roles = response.data;
      });
    },
    getGender() {
      axios.get(this.$store.state.api_url + "/genders").then((response) => {
        console.log(response.data);
        this.genders = response.data;
      });
    },
    allDepartment() {
      axios.get(this.$store.state.api_url + "/departments").then((response) => {
        console.log(response.data);
        this.departments = response.data;
      });
    },
    allStaff() {
      axios.get(this.$store.state.api_url + "/staffs").then((response) => {
        console.log(response.data);
        this.staffs = response.data;
      });
    },
    addNewStaff() {
      this.errors = [];
      axios
        .post(this.$store.state.api_url + "/create-staff", this.form)
        .then((response) => {
          if (response.data.success) {
            alert(response.data.message);
          } else {
            this.errors = response.data.message;
          }
        })
        .catch((errors) => {
          this.errors = "Network or Server Errors";
        });
    },
    imageProcess(e) {
      let file = e.target.files[0];
      let reader = new FileReader();

      alert("well it chabged");

      if (file["size"] < 1111775) {
        reader.onloadend = (file) => {
          console.log("RESULT", reader.result);
          //this.form.photo = reader.result;
        };
        reader.readAsDataURL(file);
      } else {
        alert("You have Choose The file more than 2MB");
        //swal("Congrats!", ", Your account is created!", "success");
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
      var user = localStorage.getItem("user");
      var token = localStorage.getItem("user_token");
      if (user && token) {
        user = JSON.parse(user);
        this.form.user_id = user.id;
        this.form.role_id = user.role_id;
      }
    },
  },
  created() {
    this.userRole();
    this.getGender();
    this.allStaff();
    this.allDepartment();
    this.isAuth();
  },
};
</script>
