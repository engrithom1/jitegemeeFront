<template>
  <div class="midde_cont">
    <div class="container-fluid">
      <div class="row column_title">
        <div class="col-md-12">
          <div class="page_title">
            <h2>Accademic > Departments</h2>
          </div>
        </div>
      </div>
      <!--contents heaa-->
      <div class="row column4 graph">
        <div class="col-sm-12 col-md-5">
          <div class="white_shd full margin_bottom_30">
            <div class="full graph_head">
              <div class="d-flex justify-content-between">
                <div class="heading1 margin_0"><h2>Add Department</h2></div>
                <!--button v-on:click="this.parentExist" class="btn btn-success ml-0">Add Parent</button-->
              </div>
            </div>
            <div class="full progress_bar_inner">
              <form @submit.prevent="addNewDepartment" class="p-3">
                <p v-for="error in errors" :key="error" class="text-danger">
                  {{ error[0] }}
                </p>
                <div class="form-group">
                  <label for="cname">Department Name*</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="this.form.department"
                    placeholder="Music"
                    aria-describedby="emailHelp"
                  />
                </div>

                <button :disabled="this.form.role_id != 4" class="btn btn-success">Submit</button>
              </form>
            </div>
          </div>
        </div>
        <div class="col-sm-12 col-md-7">
          <div class="white_shd full margin_bottom_30">
            <div class="full graph_head">
              <div class="d-flex justify-content-between">
                <div class="heading1 margin_0"><h2>Departments</h2></div>
                <!--button v-on:click="this.parentExist" class="btn btn-success ml-0">Add Parent</button-->
              </div>
            </div>
            <div class="full progress_bar_inner">
              <div class="row">
                <div class="col-md-12">
                  <div class="inbox-body">
                    <div class="mail-option">
                      <div v-if="this.loading" class="container mt-5 mb-5">
                          <div class="row">
                            <div class="span4">
                              <img class="center-block" width="500" src="/assets/images/loading/cupertino.gif" alt="#" />
                            </div>
                            <div class="span4"></div>
                          </div>
                      </div>
                      <table v-if="!this.loading" class="table table-inbox table-hover">
                        <thead>
                          <th><b>Departments</b></th>
                          <th><b>Staff</b></th>
                          <th><b>Action</b></th>
                        </thead>
                        <tbody>
                          <tr
                            v-for="department in departments"
                            :key="department.id"
                            class=""
                          >
                            <td class="">
                              {{ department.department }}
                            </td>
                            <td class="">
                              {{ department.staff_count }}
                            </td>
                            <td class="view-message">
                              <button :disabled="this.form.role_id != 4 || department.id < 4"
                                @click="
                                  getEdit(department.id, department.department)
                                "
                                class="btn btn-sm btn-primary mr-1"
                                data-toggle="modal"
                                data-target="#edit-modal"
                              >
                                <i class="fa fa-edit"></i>
                              </button>
                              <button :disabled="this.form.role_id != 4 || department.id < 4"
                                class="btn btn-sm btn-danger"
                                @click="
                                  deleteDepartment(
                                    department.id,
                                    department.department
                                  )
                                "
                              >
                                <i class="fa fa-trash"></i>
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
      <!--contents heaa-->
    </div>
    <!-- footer -->
    <div class="container-fluid">
      <div class="footer">
        <p>Copyright © 2023 Jitegemee MIS. All rights reserved.<br /></p>
      </div>
    </div>
  </div>
  <!-- The Modal -->
  <div class="modal fade" id="edit-modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title">Edit department</h4>
          <button type="button" class="close" data-dismiss="modal">
            &times;
          </button>
        </div>
        <!-- Modal body -->
        <div class="modal-body">
          <form @submit.prevent="upateDepartment" class="p-3">
            <p v-for="error in edit_errors" :key="error" class="text-danger">
              {{ error[0] }}
            </p>
            <div class="form-group">
              <label for="cname">department Name*</label>
              <input
                type="text"
                class="form-control"
                v-model="this.edit_department"
                placeholder="biology"
                aria-describedby="emailHelp"
              />
            </div>
            <!-- Modal footer -->
            <div class="modal-footer">
              <button class="btn btn-success">Submit</button>
              <button type="button" class="btn btn-danger" data-dismiss="modal">
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- end model popup -->
</template>

<script>
import axios from "axios";
import * as CryptoJS from 'crypto-js';

export default {
  data() {
    return {
      departments: [],
      errors: [],
      edit_errors: [],
      loading:true,
      form: {
        department: "",
        role_id: "",
        user_id: "",
      },
      department_id: "",
      og_department: "",
      edit_department: "",
    };
  },
  methods: {
    async allDepartments() {
      var response = await axios.get(this.$store.state.api_url + "/departments")
        //console.log(response.data);
        this.departments = response.data;
        this.loading = false;
    
    },
    getEdit(id, department) {
      this.edit_errors = [];
      this.department_id = id;
      this.og_department = department;
      this.edit_department = department;
    },
    async addNewDepartment() {
      this.errors = [];
      var response = await axios
        .post(this.$store.state.api_url + "/create-department", this.form)
        .catch((errors) => {
          var message = "Network or Server Errors";
          this.$toast.error(message,{duration: 7000,dismissible: true,})
        });
          if (response.data.success) {
            this.departments = response.data.departments;
            var message = response.data.message;
            this.$toast.success(message,{duration: 7000,dismissible: true,})
          } else {
            var message = response.data.message;
            this.$toast.error(message,{duration: 7000,dismissible: true,})
          }
 
       
    },
    async upateDepartment() {
      this.errors = [];
      var data = {
        department: this.edit_department,
        department_id: this.department_id,
        og_department: this.og_department,
        user_id: this.form.user_id,
        role_id: this.form.role_id,
      };
      var response = await axios
        .post(this.$store.state.api_url + "/update-department", data)
        .catch((errors) => {
          var message = "Network or Server Errors";
          this.$toast.error(message,{duration: 7000,dismissible: true,})
        });
          if (response.data.success) {
            this.departments = response.data.departments;
            var message = response.data.message;
            this.$toast.success(message,{duration: 7000,dismissible: true,})
          } else {
            this.errors = response.data.message;
            var message = response.data.message;
            this.$toast.error(message,{duration: 7000,dismissible: true,})
          }
      
    },
    async deleteDepartment(id, department) {
      this.errors = [];
      var data = {
        department_id: id,
        department: department,
        user_id: this.form.user_id,
        role_id: this.form.role_id,
      };
      var response = await axios
        .post(this.$store.state.api_url + "/delete-department", data)
        .catch((errors) => {
          var message = "Network or Server Errors";
          this.$toast.error(message,{duration: 7000,dismissible: true,})
        });
          if (response.data.success) {
            this.departments = response.data.departments;
            var message = response.data.message;
            this.$toast.success(message,{duration: 7000,dismissible: true,})
          } else {
            var message = response.data.message;
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
        this.form.role_id = user.role_id;
      }
    },
  },
  created() {
    this.isAuth();
    this.allDepartments();
    
    /*axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("user_token");*/
  },
};
</script>
