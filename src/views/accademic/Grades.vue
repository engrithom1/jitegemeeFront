<template>
  <div class="midde_cont">
    <div class="container-fluid">
      <div class="row column_title">
        <div class="col-md-12">
          <div class="page_title">
            <h2>Accademic > Grades</h2>
          </div>
        </div>
      </div>
      <!--contents heaa-->
      <div class="row column4 graph">
        <div class="col-sm-12 col-md-5">
          <div class="white_shd full margin_bottom_30">
            <div class="full graph_head">
              <div class="d-flex justify-content-between">
                <div class="heading1 margin_0"><h2>Add Marks Grade</h2></div>
                <!--button v-on:click="this.parentExist" class="btn btn-success ml-0">Add Parent</button-->
              </div>
            </div>
            <div class="full progress_bar_inner">
              <form @submit.prevent="addNewClass" class="p-3">
                <p v-for="error in errors" :key="error" class="text-danger">
                  {{ error[0] }}
                </p>
                <div class="form-group">
                  <label for="cname">Level</label>
                  <select
                    class="form-control"
                    required
                    v-model="this.form.level_id"
                  >
                    <option
                      v-for="level in levels"
                      :key="level.id"
                      :value="level.id"
                    >
                      {{ level.level }}
                    </option>
                  </select>
                </div>
                <div class="row">
                  <div class="col-6">
                    <div class="form-group">
                      <label for="cname">Mark From*</label>
                      <input
                        type="number"
                        class="form-control"
                        min="0"
                        max="100"
                        required
                        v-model="this.form.mark1"
                        placeholder="81"
                      />
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="form-group">
                      <label for="cname">Mark To*</label>
                      <input
                        type="number"
                        class="form-control"
                        min="0"
                        required
                        v-model="this.form.mark2"
                        max="100"
                        placeholder="100"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <div class="form-group">
                      <label for="cname">Grade*</label>
                      <input
                        type="text"
                        class="form-control"
                        required
                        v-model="this.form.grade"
                        placeholder="A"
                        aria-describedby="emailHelp"
                      />
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="form-group">
                      <label for="cname">Point*</label>
                      <input
                        type="number"
                        class="form-control"
                        min="0"
                        max="100"
                        required
                        v-model="this.form.point"
                        placeholder="1"
                        aria-describedby="emailHelp"
                      />
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label for="cname">Grade Label*</label>
                  <input
                    type="text"
                    class="form-control"
                    required
                    v-model="this.form.grade_label"
                    placeholder="Excellent"
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
                <div class="heading1 margin_0"><h2>Grades</h2></div>
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
                          <th><b>Level</b></th>
                          <th><b>Marks</b></th>
                          <th><b>Grade</b></th>
                          <th><b>Point</b></th>
                          <th><b>Label</b></th>
                          <th><b>Action</b></th>
                        </thead>
                        <tbody>
                          <tr v-for="grade in grades" :key="grade.id" class="">
                            <td class="">{{ grade.level }}</td>
                            <td class="">
                              {{ grade.mark1 + " - " + grade.mark2 }}
                            </td>
                            <td class="text-uppercase">{{ grade.grade }}</td>
                            <td class="">{{ grade.point }}</td>
                            <td class="">{{ grade.grade_label }}</td>
                            <td class="">
                              <button :disabled="this.form.role_id != 4"
                                @click="
                                  getEdit(
                                    grade.id,
                                    grade.grade,
                                    grade.mark1,
                                    grade.mark2,
                                    grade.point,
                                    grade.grade_label
                                  )
                                "
                                class="btn btn-sm btn-primary mr-1"
                                data-toggle="modal"
                                data-target="#edit-modal"
                              >
                                <i class="fa fa-edit"></i>
                              </button>
                              <button :disabled="this.form.role_id != 4"
                                class="btn btn-sm btn-danger"
                                @click="deleteGrade(grade.id, grade.grade)"
                              >
                                <i class="fa fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div v-if="!this.loading">
                        <div v-if="this.grades.length == 0" class="container">
                          <div class="row">
                            <div class="span2"></div>
                            <div class="span4">
                              <h5 class="text-capitalize text-danger">Not Grade Found</h5>
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
  <div class="modal fade" data-backdrop="static" data-keyboard="false" id="edit-modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title">Edit Class</h4>
          <button type="button" class="close" data-dismiss="modal">
            &times;
          </button>
        </div>
        <!-- Modal body -->
        <div class="modal-body">
          <form @submit.prevent="updateClass" class="p-3">
            <p v-for="error in edit_errors" :key="error" class="text-danger">
              {{ error[0] }}
            </p>
            <div class="row">
              <div class="col-6">
                <div class="form-group">
                  <label for="cname">Marks From*</label>
                  <input
                    type="number"
                    class="form-control"
                    min="0"
                    max="100"
                    required
                    v-model="this.edit_mark1"
                    placeholder="81"
                  />
                </div>
              </div>
              <div class="col-6">
                <div class="form-group">
                  <label for="cname">Marks To*</label>
                  <input
                    type="number"
                    class="form-control"
                    min="0"
                    required
                    v-model="this.edit_mark2"
                    max="100"
                    placeholder="100"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <div class="form-group">
                  <label for="cname">Grade*</label>
                  <input
                    type="text"
                    class="form-control"
                    required
                    v-model="this.edit_grade"
                    placeholder="A"
                    aria-describedby="emailHelp"
                  />
                </div>
              </div>
              <div class="col-6">
                <div class="form-group">
                  <label for="cname">Point*</label>
                  <input
                    type="number"
                    class="form-control"
                    min="1"
                    max="100"
                    required
                    v-model="this.edit_point"
                    placeholder="1"
                    aria-describedby="emailHelp"
                  />
                </div>
              </div>
            </div>

            <div class="form-group">
              <label for="cname">Grade Label*</label>
              <input
                type="text"
                class="form-control"
                required
                v-model="this.edit_grade_label"
                placeholder="Excellent"
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
      grades: [],
      levels: [],
      errors: [],
      edit_errors: [],
      loading:true,
      form: {
        grade: "",
        grade_label: "",
        mark1: "",
        mark2: "",
        point: "",
        level_id: "",
        role_id: "",
        user_id: "",
      },
      grade_id: "",
      og_grade: "",
      edit_grade: "",
      edit_mark1: "",
      edit_mark2: "",
      edit_point: "",
      edit_grade_label: "",
    };
  },
  methods: {
    async allGrades() {
      var response = await axios.get(this.$store.state.api_url + "/grades")
        //console.log(response.data);
        this.grades = response.data;
        this.loading = false
    },
    async allLevel() {
      var response = await axios.get(this.$store.state.api_url + "/levels")
        //console.log(response.data);
        this.levels = response.data;

    },
    getEdit(id, grade, mark1, mark2, point, grade_label) {
      this.edit_errors = [];
      this.grade_id = id;
      this.og_grade = grade;
      this.edit_grade = grade;
      this.edit_mark1 = mark1;
      this.edit_mark2 = mark2;
      this.edit_point = point;
      this.edit_grade_label = grade_label;
    },
    async addNewClass() {
      this.errors = [];
      var response = await axios
        .post(this.$store.state.api_url + "/create-grade", this.form)
        .catch((errors) => {
          //console.log(errors);
          var message = "Network or Server Errors";
          this.$toast.error(message,{duration: 7000,dismissible: true,})
        });
          if (response.data.success) {
            this.grades = response.data.grades;
            var message = response.data.message;
            this.$toast.success(message,{duration: 7000,dismissible: true,})
          } else {
            this.errors = [response.data.message];
          }   
    },
    async updateClass() {
      this.errors = [];
      var data = {
        grade: this.edit_grade,
        grade_id: this.grade_id,
        og_grade: this.og_grade,
        mark1: this.edit_mark1,
        mark2: this.edit_mark2,
        point: this.edit_point,
        grade_label: this.edit_grade_label,
        user_id: this.form.user_id,
        role_id: this.form.role_id,
      };
      var response = await axios
        .post(this.$store.state.api_url + "/update-grade", data)
        .catch((errors) => {
          console.log(errors);
          var message = "Network or Server Errors";
          this.$toast.error(message,{duration: 7000,dismissible: true,})
        });
          if (response.data.success) {
            this.grades = response.data.grades;
            var message = response.data.message;
            this.$toast.success(message,{duration: 7000,dismissible: true,})
          } else {
            this.edit_errors = [response.data.message];
          }
       
    },
    async deleteGrade(id, grade) {
      this.errors = [];
      var data = {
        grade_id: id,
        grade: grade,
        user_id: this.form.user_id,
        role_id: this.form.role_id,
      };
      var response = await axios
        .post(this.$store.state.api_url + "/delete-grade", data)
        .catch((errors) => {
          console.log(errors);
          var message = "Network or Server Errors";
          this.$toast.error(message,{duration: 7000,dismissible: true,})
        });
          if (response.data.success) {
            this.grades = response.data.grades;
            var message = response.data.message;
            this.$toast.success(message,{duration: 7000,dismissible: true,})
          } else {
            var message = response.data.message;
            this.$toast.success(message,{duration: 7000,dismissible: true,})
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
    this.allGrades();
    this.allLevel();
    this.isAuth();
    /*axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("user_token");*/
  },
};
</script>
