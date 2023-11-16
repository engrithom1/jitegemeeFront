<template>
  <div class="midde_cont">
    <div class="container-fluid">
      <div class="row column_title">
        <div class="col-md-12">
          <div class="page_title">
            <h2>Accademic > Exams</h2>
          </div>
        </div>
      </div>
      <!--contents heaa-->
      <div class="row column4 graph">
        <div class="col-sm-12 col-md-5">
          <div class="white_shd full margin_bottom_30">
            <div class="full graph_head">
              <div class="d-flex justify-content-between">
                <div class="heading1 margin_0"><h2>Add Exam</h2></div>
                <!--button v-on:click="this.parentExist" class="btn btn-success ml-0">Add Parent</button-->
              </div>
            </div>
            <div class="full progress_bar_inner">
              <form @submit.prevent="addNewExam" class="p-3">
                <p v-for="error in errors" :key="error" class="text-danger">
                  {{ error[0] }}
                </p>
                <div class="form-group">
                  <label for="cname">Exam Name*</label>
                  <input
                    type="text"
                    class="form-control"
                    id="examname"
                    required
                    v-model="this.form.examname"
                    placeholder="Test 3"
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
                <div class="heading1 margin_0"><h2>Exams Types</h2></div>
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
                          <th><b>Exams Name</b></th>
                          <th><b>Action</b></th>
                        </thead>
                        <tbody>
                          <tr v-for="exam in exams" :key="exam.id" class="">
                            <td class="text-capitalize">
                              {{ exam.examname }}
                            </td>
                            <td class="view-message">
                              <button :disabled="this.form.role_id != 4"
                                @click="getEdit(exam.id, exam.examname)"
                                class="btn btn-sm btn-primary mr-1"
                                data-toggle="modal"
                                data-target="#edit-modal"
                              >
                                <i class="fa fa-edit"></i>
                              </button>
                              <button :disabled="this.form.role_id != 4"
                                class="btn btn-sm btn-danger"
                                @click="deleteExam(exam.id, exam.examname)"
                              >
                                <i class="fa fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <div v-if="!this.loading">
                        <div v-if="this.exams.length == 0" class="container">
                          <div class="row">
                            <div class="span2"></div>
                            <div class="span4">
                              <h5 class="text-capitalize text-danger">Not Exam Found</h5>
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
          <h4 class="modal-title">Edit Exam</h4>
          <button type="button" class="close" data-dismiss="modal">
            &times;
          </button>
        </div>
        <!-- Modal body -->
        <div class="modal-body">
          <form @submit.prevent="updateExam" class="p-3">
            <p v-for="error in edit_errors" :key="error" class="text-danger">
              {{ error[0] }}
            </p>
            <div class="form-group">
              <label for="cname">Exam Name*</label>
              <input
                type="text"
                class="form-control"
                v-model="this.edit_examname"
                placeholder="Test 3"
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

export default {
  data() {
    return {
      exams: [],
      errors: [],
      edit_errors: [],
      loading:true,
      form: {
        examname: "",
        role_id: "",
        user_id: "",
      },
      exam_id: "",
      og_examname: "",
      edit_examname: "",
    };
  },
  methods: {
    allExams() {
      axios.get(this.$store.state.api_url + "/exams").then((response) => {
        //console.log(response.data);
        this.exams = response.data;
        this.loading = false
      });
    },
    getEdit(id, examname) {
      this.edit_errors = [];
      this.exam_id = id;
      this.og_examname = examname;
      this.edit_examname = examname;
    },
    addNewExam() {
      this.errors = [];
      axios
        .post(this.$store.state.api_url + "/create-exam", this.form)
        .then((response) => {
          if (response.data.success) {
            this.exams = response.data.exams;
            var message = response.data.message;
            this.$toast.success(message,{duration: 7000,dismissible: true,}) 
          } else {
            this.errors = response.data.message;
            
          }
        })
        .catch((errors) => {
          var message = "Network or Server Errors";
          this.$toast.error(message,{duration: 7000,dismissible: true,})
        });
    },
    updateExam() {
      this.edit_errors = [];
      var data = {
        examname: this.edit_examname,
        exam_id: this.exam_id,
        og_examname: this.og_examname,
        user_id: this.form.user_id,
        role_id: this.form.role_id,
      };
      axios
        .post(this.$store.state.api_url + "/update-exam", data)
        .then((response) => {
          if (response.data.success) {
            this.exams = response.data.exams;
           
            var message = response.data.message;
            this.$toast.success(message,{duration: 7000,dismissible: true,}) 
          } else {
            this.edit_errors = [response.data.message];
          }
        })
        .catch((errors) => {
          var message = "Network or Server Errors";
          this.$toast.error(message,{duration: 7000,dismissible: true,})
        });
    },
    deleteExam(id, exam) {
      this.errors = [];
      var data = {
        exam_id: id,
        exam: exam,
        user_id: this.form.user_id,
        role_id: this.form.role_id,
      };
      axios
        .post(this.$store.state.api_url + "/delete-exam", data)
        .then((response) => {
          if (response.data.success) {
            this.exams = response.data.exams;
            var message = response.data.message;
            this.$toast.success(message,{duration: 7000,dismissible: true,}) 
          } else {
            var message = response.data.message;
            this.$toast.error(message,{duration: 7000,dismissible: true,}) 
          }
        })
        .catch((errors) => {
          var message = "Network or Server Errors";
          this.$toast.error(message,{duration: 7000,dismissible: true,})
        });
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
    this.allExams();
    this.isAuth();
    /*axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("user_token");*/
  },
};
</script>
