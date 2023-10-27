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
                          <label for="home_address">Home address*</label>
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
                        v-for="error in errors"
                        :key="error"
                        class="text-danger"
                      >
                        {{ error[0] }}
                      </p>
                      <div class="input-append">
                        <input
                          type="text"
                          class="sr-input"
                          v-model="this.search.search_parent"
                          placeholder="Search parent"
                        />
                        <button class="btn sr-btn" type="submit">
                          <i class="fa fa-search"></i>
                        </button>
                      </div>
                    </form>
                  </div>
                  <div class="inbox-body">
                    <div class="mail-option">
                      <ul class="unstyled inbox-pagination mb-3">
                        <li><span>1-50 of 234</span></li>
                        <li>
                          <a class="np-btn" href="#"
                            ><i class="fa fa-angle-left pagination-left"></i
                          ></a>
                        </li>
                        <li>
                          <a class="np-btn" href="#"
                            ><i class="fa fa-angle-right pagination-right"></i
                          ></a>
                        </li>
                      </ul>
                      <div class="table-responsive-md w-100">
                        <table class="table table-hover">
                          <thead>
                            <th><b>Full Name</b></th>
                            <th><b>Phone</b></th>
                            <th><b>Gendar</b></th>
                            <th><b>Home Address</b></th>
                            <th><b>Action</b></th>
                          </thead>
                          <tbody>
                            <div v-show="parents.length == 0">
                              <h4 class="text-center">no parents found</h4>
                            </div>
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
                              <td class="">{{ parent.gender }}</td>
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
//import Form from "vform";

export default {
  data() {
    return {
      add_parent: true,
      parents: [],
      errors: [],
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
      },
    };
  },
  methods: {
    parentExist() {
      this. allParents();
      this.add_parent = !this.add_parent;
    },
    getGender() {
      axios.get(this.$store.state.api_url + "/genders").then((response) => {
        console.log(response.data);
        this.genders = response.data;
      });
    },
    searchParent() {
      axios
        .post(this.$store.state.api_url + "/search-parent", this.search)
        .then((response) => {
          if (response.data.success) {
            this.parents = response.data.parents;
            console.log(response.data.parents);
          } else {
            this.search_errors = response.data.message;
          }
        })
        .catch((errors) => {
          alert("Network or Server Errors");
        });
    },
    allParents() {
      axios.get(this.$store.state.api_url + "/parents").then((response) => {
        console.log(response.data);
        this.parents = response.data;
      });
    },
    addParent() {
      this.errors = [];
      axios
        .post(this.$store.state.api_url + "/create-parent", this.form)
        .then((response) => {
          if (response.data.success) {
            alert(response.data.message);
            window.location.reload();
          } else {
            this.errors = response.data.message;
          }
        })
        .catch((errors) => {
          alert("Network or Server Errors");
        });
    },
    imageProcess(e) {
      let file = e.target.files[0];
      let reader = new FileReader();

      alert("well it chabged");

      if (file["size"] < 1111775) {
        reader.onloadend = (file) => {
          console.log("RESULT", reader.result);
          this.form.photo = reader.result;
        };
        reader.readAsDataURL(file);
      } else {
        alert("You have Choose The file more than 2MB");
        //swal("Congrats!", ", Your account is created!", "success");
      }
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
    this.allParents();
    this.getGender();
    this.isAuth();
  },
};
</script>
