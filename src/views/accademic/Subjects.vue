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
                <div class="form-group">
                          <label for="gender">Level*</label>
                          <select
                            class="form-control"
                            v-model="this.form.level_id"
                            id="gender"
                            required
                          >
                            <option class="text-capitalize" value="7">O-Level</option>
                            <option class="text-capitalize" value="8">A-level</option>
                          </select>
                        </div>
                <div class="form-group">
                  <label for="code">Subject Code*</label>
                  <input
                    id="code"
                    type="text"
                    class="form-control"
                    v-model="this.form.code"
                    minlength="3"
                    maxlength="3"
                    placeholder="code"
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
                <div class="heading1 margin_0"><h2>Subjects</h2></div>
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
                          <th><b>subjects Name</b></th>
                          <th><b>Code</b></th>
                          <th><b>Level</b></th>
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
                            <td class="text-capitalize">
                              {{ subject.code }}
                            </td>
                            <td class="text-capitalize">
                              {{ subject.level }}
                            </td>
                            <td class="view-message">
                              <button :disabled="this.form.role_id != 4"
                                @click="getEdit(subject.id, subject.subject,subject.code)"
                                class="btn btn-sm btn-primary mr-1"
                                data-toggle="modal"
                                data-target="#edit-modal"
                              >
                                <i class="fa fa-edit"></i>
                              </button>
                              <button :disabled="this.form.role_id != 4"
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

                      <div v-if="!this.loading">
                        <div v-if="this.subjects.length == 0" class="container">
                          <div class="row">
                            <div class="span2"></div>
                            <div class="span4">
                              <h5 class="text-capitalize text-danger">Not Subject Found</h5>
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
            <div class="form-group">
              <label for="edit_code">Subject Code*</label>
              <input
                id="edit_code"
                type="text"
                class="form-control"
                v-model="this.edit_code"
                minlength="3"
                maxlength="3"
                placeholder="code"
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
      loading:true,
      form: {
        subject: "",
        code:"",
        role_id: "",
        user_id: "",
        level_id:7,
      },
      subject_id: "",
      og_subject: "",
      edit_subject: "",
      edit_code:"",
    };
  },
  methods: {
    async allSubjects() {
      var response = await axios.get(this.$store.state.api_url + "/subjects-level")
        //console.log(response.data);
        this.subjects = response.data;
        this.loading = false;
    
    },
    getEdit(id, subject, code) {
      this.edit_errors = [];
      this.subject_id = id;
      this.og_subject = subject;
      this.edit_subject = subject;
      this.edit_code = code;
    },
    async addNewSubject() {
      this.errors = [];
      var response = await axios
        .post(this.$store.state.api_url + "/create-subject", this.form)
        .catch((errors) => {
          //console.log(errors);
          var message = "Network or Server Errors";
          this.$toast.error(message,{duration: 7000,dismissible: true,})
        });
          if (response.data.success) {
            this.subjects = response.data.subjects;
            
            var message = response.data.message;
            this.$toast.success(message,{duration: 7000,dismissible: true,})
          } else {
            //this.errors = [response.data.message];
            var message = response.data.message;
            this.$toast.error(message,{duration: 7000,dismissible: true,})
          }
     
    },
    async updateSubject() {
      this.errors = [];
      var data = {
        subject: this.edit_subject,
        code: this.edit_code,
        subject_id: this.subject_id,
        og_subject: this.og_subject,
        user_id: this.form.user_id,
        role_id: this.form.role_id,
      };
      var response = await axios
        .post(this.$store.state.api_url + "/update-subject", data)
        .catch((errors) => {
          //console.log(errors);
          var message = "Network or Server Errors";
          this.$toast.error(message,{duration: 7000,dismissible: true,})
        });
          if (response.data.success) {
            this.subjects = response.data.subjects;
           
            var message = response.data.message;
            this.$toast.success(message,{duration: 7000,dismissible: true,}) 
          } else {
            this.errors = [response.data.message];
          }

        
    },
    async deleteSubject(id, subject) {
      this.errors = [];
      var data = {
        subject_id: id,
        subject: subject,
        user_id: this.form.user_id,
        role_id: this.form.role_id,
      };
      var response = await axios
        .post(this.$store.state.api_url + "/delete-subject", data)
        .catch((errors) => {
          //console.log(errors);
          var message = "Network or Server Errors";
          this.$toast.error(message,{duration: 7000,dismissible: true,})
        });
          if (response.data.success) {
            this.subjects = response.data.subjects;
            var message = response.data.message;
            this.$toast.success(message,{duration: 7000,dismissible: true,})
          } else {
           
            var message = response.data.message;
            this.$toast.error(message,{duration: 7000,dismissible: true,})
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
    this.allSubjects();
    this.isAuth();
    /*axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("user_token");*/
  },
};
</script>
