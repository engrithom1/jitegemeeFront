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
                      <table class="table table-inbox table-hover">
                        <thead>
                          <th><b>Exams Name</b></th>
                          <th><b>Action</b></th>
                        </thead>
                        <tbody>
                          <tr v-for="exam in exams" :key="exam.id" class="">
                            <td class="">
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
            alert(response.data.message);
          } else {
            this.errors = response.data.message;
          }
        })
        .catch((errors) => {
          console.log(errors);
          alert("Network or Server Errors");
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
            alert(response.data.message);
          } else {
            this.edit_errors = response.data.message;
          }
        })
        .catch((errors) => {
          console.log(errors);
          alert("Network or Server Errors");
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
            alert(response.data.message);
          } else {
            alert(response.data.message);
          }
        })
        .catch((errors) => {
          console.log(errors);
          alert("Network or Server Errors");
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
