<template>
  <div class="midde_cont">
    <div class="container-fluid">
      <div class="row column_title">
        <div class="col-md-12">
          <div class="page_title">
            <h2>Accademic > Subjects</h2>
          </div>
        </div>
      </div>
      <!--contents heaa-->
      <div class="row column4 graph">
        <div class="col-sm-12 col-md-5">
          <div class="white_shd full margin_bottom_30">
            <div class="full graph_head">
              <div class="d-flex justify-content-between">
                <div class="heading1 margin_0"><h2>Add Subject</h2></div>
                <!--button v-on:click="this.parentExist" class="btn btn-success ml-0">Add Parent</button-->
              </div>
            </div>
            <div class="full progress_bar_inner">
              <form @submit.prevent="addNewSubject" class="p-3">
                <p v-for="error in errors" :key="error" class="text-danger">
                  {{ error[0] }}
                </p>
                <div class="form-group">
                  <label for="cname">Subject Name*</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="this.form.subject"
                    placeholder="biology"
                    aria-describedby="emailHelp"
                  />
                </div>

                <button class="btn btn-success">Submit</button>
              </form>
            </div>
          </div>
        </div>
        <div class="col-sm-12 col-md-7">
          <div class="white_shd full margin_bottom_30">
            <div class="full graph_head">
              <div class="d-flex justify-content-between">
                <div class="heading1 margin_0"><h2>Subjects</h2></div>
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
                          <th><b>subjects Name</b></th>
                          <th><b>Action</b></th>
                        </thead>
                        <tbody>
                          <tr
                            v-for="subject in subjects"
                            :key="subject.id"
                            class=""
                          >
                            <td class="text-capitalize">
                              {{ subject.subject }}
                            </td>
                            <td class="view-message">
                              <button
                                @click="getEdit(subject.id, subject.subject)"
                                class="btn btn-sm btn-primary mr-1"
                                data-toggle="modal"
                                data-target="#edit-modal"
                              >
                                <i class="fa fa-edit"></i>
                              </button>
                              <button
                                class="btn btn-sm btn-danger"
                                @click="
                                  deleteSubject(subject.id, subject.subject)
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
          <h4 class="modal-title">Edit Subject</h4>
          <button type="button" class="close" data-dismiss="modal">
            &times;
          </button>
        </div>
        <!-- Modal body -->
        <div class="modal-body">
          <form @submit.prevent="updateSubject" class="p-3">
            <p v-for="error in edit_errors" :key="error" class="text-danger">
              {{ error[0] }}
            </p>
            <div class="form-group">
              <label for="cname">Subject Name*</label>
              <input
                type="text"
                class="form-control"
                v-model="this.edit_subject"
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

export default {
  data() {
    return {
      subjects: [],
      errors: [],
      edit_errors: [],
      form: {
        subject: "",
        role_id: "",
        user_id: "",
      },
      subject_id: "",
      og_subject: "",
      edit_subject: "",
    };
  },
  methods: {
    allSubjects() {
      axios.get(this.$store.state.api_url + "/subjects").then((response) => {
        //console.log(response.data);
        this.subjects = response.data;
      });
    },
    getEdit(id, subject) {
      this.edit_errors = [];
      this.subject_id = id;
      this.og_subject = subject;
      this.edit_subject = subject;
    },
    addNewSubject() {
      this.errors = [];
      axios
        .post(this.$store.state.api_url + "/create-subject", this.form)
        .then((response) => {
          if (response.data.success) {
            this.subjects = response.data.subjects;
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
    updateSubject() {
      this.errors = [];
      var data = {
        subject: this.edit_subject,
        subject_id: this.subject_id,
        og_subject: this.og_subject,
        user_id: this.form.user_id,
        role_id: this.form.role_id,
      };
      axios
        .post(this.$store.state.api_url + "/update-subject", data)
        .then((response) => {
          if (response.data.success) {
            this.subjects = response.data.subjects;
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
    deleteSubject(id, subject) {
      this.errors = [];
      var data = {
        subject_id: id,
        subject: subject,
        user_id: this.form.user_id,
        role_id: this.form.role_id,
      };
      axios
        .post(this.$store.state.api_url + "/delete-subject", data)
        .then((response) => {
          if (response.data.success) {
            this.subjects = response.data.subjects;
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
    this.allSubjects();
    this.isAuth();
    /*axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("user_token");*/
  },
};
</script>
