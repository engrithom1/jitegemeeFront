<template>
  <div class="midde_cont">
    <div class="container-fluid">
      <div class="row column_title">
        <div class="col-md-12">
          <div class="page_title">
            <h2>Accademic > Classrooms</h2>
          </div>
        </div>
      </div>
      <!--contents heaa-->
      <div class="row column4 graph">
        <div class="col-sm-12 col-md-5">
          <div class="white_shd full margin_bottom_30">
            <div class="full graph_head">
              <div class="d-flex justify-content-between">
                <div class="heading1 margin_0"><h2>Add Class</h2></div>
                <!--button v-on:click="this.parentExist" class="btn btn-success ml-0">Add Parent</button-->
              </div>
            </div>
            <div class="full progress_bar_inner">
              <form @submit.prevent="addNewClass" class="p-3">
                <p v-for="error in errors" :key="error" class="text-danger">
                  {{ error[0] }}
                </p>
                <div class="form-group">
                  <label>Select Level*</label>
                  <select class="form-control" v-model="this.form.level_id">
                    <option
                      v-for="level in levels"
                      :key="level.id"
                      :value="level.id"
                    >
                      {{ level.level }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="cname">Class Name*</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="this.form.classname"
                    placeholder="A1"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div class="form-group">
                  <label for="cname">Room Number*</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="this.form.roomnumber"
                    placeholder="Room 21"
                    aria-describedby="emailHelp"
                  />
                </div>
                <hr/>
                <div class="form-grioup">
                  <label for="csubjects" class="mb-3">Select Subjects*</label>
                  <div class="row">
                  <div v-for="subz in subjects" :key="subz.id" class="col-sm-6 col-md-6">
                  <input :id="subz.subject" :value="subz.id" v-model="this.form.s_subjects" class="mr-2" type="checkbox">
                  <label :for="subz.subject">{{ subz.subject }}</label>
                  </div>
                  </div>
                </div>

                <hr/>
                <div class="form-grioup">
                  <label for="csubjects" class="mb-3">Select Fees*</label>
                  <div class="row">
                  <div v-for="feez in fees" :key="feez.id" class="col-sm-6 col-md-6">
                  <input :id="feez.fee" :value="feez.id" v-model="this.form.s_fees" class="mr-2" type="checkbox">
                  <label :for="feez.fee">{{ feez.fee }}</label>
                  </div>
                  </div>
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
                <div class="heading1 margin_0"><h2>Classrooms</h2></div>
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
                          <th><b>Level</b></th>
                          <th><b>Class</b></th>
                          <th><b>Room</b></th>
                          <th><b>Stds</b></th>
                          <th><b>Subs</b></th>
                          <th><b>Action</b></th>
                        </thead>
                        <tbody>
                          <tr v-for="clasz in claszs" :key="clasz.id" class="">
                            <td class="">
                              {{ clasz.level }}
                            </td>
                            <td class="text-uppercase">
                              {{ clasz.classname }}
                            </td>
                            <td class="">
                              {{ clasz.roomnumber }}
                            </td>
                            <td class="">
                              {{ clasz.students_count }}
                            </td>
                            <td class="">
                              {{ clasz.subjects.split(",").length }}
                            </td>
                            <td class="view-message">
                              <button
                                @click="
                                  getEdit(
                                    clasz.id,
                                    clasz.classname,
                                    clasz.roomnumber,
                                    clasz.fees,
                                    clasz.subjects
                                  )
                                "
                                class="btn btn-sm btn-primary mr-1"
                                data-toggle="modal"
                                data-target="#edit-modal"
                              >
                                <i class="fa fa-edit"></i>
                              </button>
                              <button
                                class="btn btn-sm btn-danger"
                                @click="deleteClass(clasz.id, clasz.classname)"
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
            <div class="form-group">
              <label for="cname">Class Name*</label>
              <input
                type="text"
                class="form-control"
                v-model="this.edit_classname"
                placeholder="A1"
                aria-describedby="emailHelp"
              />
            </div>
            <div class="form-group">
              <label for="cname">Room Number*</label>
              <input
                type="text"
                class="form-control"
                v-model="this.edit_roomnumber"
                placeholder="Room 21"
                aria-describedby="emailHelp"
              />
            </div>

            <hr/>
                <div class="form-grioup">
                  <label for="csubjects" class="mb-3">Select Subjects*</label>
                  <div class="row">
                  <div v-for="subz in subjects" :key="subz.id" class="col-sm-6 col-md-6">
                  <input :id="'edit_'+subz.subject" :value="subz.id" v-model="this.edit_subjects" class="mr-2" type="checkbox">
                  <label :for="'edit_'+subz.subject">{{ subz.subject }}</label>
                  </div>
                  </div>
                </div>

                <hr/>
                <div class="form-grioup">
                  <label for="csubjects" class="mb-3">Select Fees*</label>
                  <div class="row">
                  <div v-for="feez in fees" :key="feez.id" class="col-sm-6 col-md-6">
                  <input :id="'edit_'+feez.fee" :value="feez.id" v-model="this.edit_fees" class="mr-2" type="checkbox">
                  <label :for="'edit_'+feez.fee">{{ feez.fee }}</label>
                  </div>
                  </div>
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
      claszs: [],
      levels: [],
      errors: [],
      subjects:[],
      fees:[],
      edit_errors: [],
      form: {
        classname: "",
        s_subjects:[],
        s_fees:[],
        roomnumber: "",
        level_id: "",
        role_id: "",
        user_id: "",
      },
      class_id: "",
      og_classname: "",
      edit_classname: "",
      edit_fees: [],
      edit_subjects: [],
      edit_roomnumber: "",
    };
  },
  methods: {
    allClaszs() {
      axios.get(this.$store.state.api_url + "/class").then((response) => {
        //console.log(response.data);
        this.claszs = response.data;
      });
    },
    allSubjects() {
      axios.get(this.$store.state.api_url + "/subjects").then((response) => {
        //console.log(response.data);
        this.subjects = response.data;
      });
    },
    allFees() {
      axios.get(this.$store.state.api_url + "/fees").then((response) => {
        //console.log(response.data);
        this.fees = response.data;
      });
    },
    allLevel() {
      axios.get(this.$store.state.api_url + "/levels").then((response) => {
        //console.log(response.data);
        this.levels = response.data;
      });
    },
    getEdit(id, classname, roomnumber,fees, subjects) {
      this.edit_errors = [];
      this.class_id = id;
      this.og_classname = classname;
      this.edit_classname = classname;
      this.edit_roomnumber = roomnumber;
      this.edit_fees = fees.split(",");
      this.edit_subjects = subjects.split(",");
    },
    addNewClass() {
      this.errors = [];
      var feez = this.form.s_fees.toString();
      var subjectz = this.form.s_subjects.toString();
      var data = {
        classname: this.form.classname,
        level_id: this.form.level_id,
        fees:feez,
        subjects:subjectz,
        roomnumber: this.form.roomnumber,
        user_id: this.form.user_id,
        role_id: this.form.role_id,
      };
      console.log(data)
      axios
        .post(this.$store.state.api_url + "/create-class", data)
        .then((response) => {
          if (response.data.success) {
            this.claszs = response.data.claszs;
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
    updateClass() {
      this.errors = [];
      var feez = this.edit_fees.toString();
      var subjectz = this.edit_subjects.toString();
      var data = {
        classname: this.edit_classname,
        class_id: this.class_id,
        og_classname: this.og_classname,
        roomnumber: this.edit_roomnumber,
        fees:feez,
        subjects:subjectz,
        user_id: this.form.user_id,
        role_id: this.form.role_id,
      };
      axios
        .post(this.$store.state.api_url + "/update-class", data)
        .then((response) => {
          if (response.data.success) {
            this.claszs = response.data.claszs;
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
    deleteClass(id, classname) {
      this.errors = [];
      var data = {
        class_id: id,
        classname: classname,
        user_id: this.form.user_id,
        role_id: this.form.role_id,
      };
      axios
        .post(this.$store.state.api_url + "/delete-class", data)
        .then((response) => {
          if (response.data.success) {
            this.claszs = response.data.claszs;
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
    this.allClaszs();
    this.allLevel();
    this.allFees();
    this.allSubjects();
    this.isAuth();
    /*axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("user_token");*/
  },
};
</script>
