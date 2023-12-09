<template>
    <div class="midde_cont">
      <div class="container-fluid">
        <div class="row column_title">
          <div class="col-md-12">
            <div class="page_title">
              <h2>Accademic > Courses</h2>
            </div>
          </div>
        </div>
        <!--contents heaa-->
        <div class="row column4 graph">
          <div class="col-sm-12 col-md-6">
            <div class="white_shd full margin_bottom_30">
              <div class="full graph_head">
                <div class="d-flex justify-content-between">
                  <div class="heading1 margin_0"><h2>Add Courses</h2></div>
                  <!--button v-on:click="this.parentExist" class="btn btn-success ml-0">Add Parent</button-->
                </div>
              </div>
              <div class="full progress_bar_inner">
                <form @submit.prevent="addNewCourse" class="p-3">
                  <p v-for="error in errors" :key="error" class="text-danger">
                    {{ error[0] }}
                  </p>

                  <div class="form-group">
                    <label for="cname">Course Name*</label>
                    <input required
                      type="text"
                      class="form-control"
                      v-model="this.form.coursename"
                      placeholder="PCM"
                      aria-describedby="emailHelp"
                      minlength="3"
                      maxlength="3"
                    />
                  </div>
                 
                 
                  <hr/>
                  <div class="form-grioup">
                    <label for="csubjects" class="mb-3">Select Subjects*</label>
                    <div class="row">
                    <div v-for="subz in subjects" :key="subz.id" class="col-md-12">
                    <input :id="subz.id" :subject_name="subz.subject" :value="subz.id" v-model="this.form.s_subjects" class="mr-2" type="checkbox">
                    <label :for="subz.id">{{ subz.subject }}</label>
                    </div>
                    </div>
                  </div>
  
                  <hr/>
                  
                 
                  <button :disabled="this.form.role_id != 4" class="btn btn-success">Submit</button>
                </form>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div class="white_shd full margin_bottom_30">
              <div class="full graph_head">
                <div class="d-flex justify-content-between">
                  <div class="heading1 margin_0"><h2>Courses list</h2></div>
                  <!--button v-on:click="this.parentExist" class="btn btn-success ml-0">Add Parent</button-->
                </div>
              </div>
              <div class="full progress_bar_inner">
                <div class="row">
                  <div class="col-sm-12 col-md-12">
                    <div class="inbox-body">
                      <div class="mail-option">
                        <div v-if="this.loading" class="container mt-5 mb-5">
                          <div class="row">
                            <div class="span2">
                              <img class="center-block" width="500" src="/assets/images/loading/cupertino.gif" alt="#" />
                            </div>
                            <div class="span4"></div>
                          </div>
                      </div>
                        <table v-if="!this.loading" class="table table-inbox table-hover">
                          <thead>
                            <th><b>Courses</b></th>
                            <th><b>Action</b></th>
                          </thead>
                          <tbody>
                            <tr v-for="course in courses" :key="course.id" class="">
                              
                              <td class="">
                                {{ course.coursename+" - "+course.subject_names }}
                              </td>
                              
                              <td class="view-message">
                                <button :disabled="this.form.role_id != 4"
                                  @click="
                                    getEdit(
                                      course.id,
                                      course.coursename,
                                      course.subjects,
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
                                  @click="deleteCourse(course.id, course.coursename)"
                                >
                                  <i class="fa fa-trash"></i>
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div v-if="!this.loading">
                        <div v-if="this.courses.length == 0" class="container">
                          <div class="row">
                            <div class="span2"></div>
                            <div class="span4">
                              <h5 class="text-capitalize text-danger">Not Course Found</h5>
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
            <form @submit.prevent="updateCourse" class="p-3">
              <p v-for="error in edit_errors" :key="error" class="text-danger">
                {{ error[0] }}
              </p>
              <div class="form-group">
                <label for="cname">Course Name*</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="this.edit_coursename"
                  placeholder="PCM"
                  minlength="3"
                  maxlength="3"
                  aria-describedby="emailHelp"
                />
              </div>
        
  
              <hr/>
                  <div class="form-grioup">
                    <label for="csubjects" class="mb-3">Select Subjects*</label>
                    <div class="row">
                    <div v-for="subz in subjects" :key="subz.id" class="col-sm-6 col-md-6">
                    <input :id="'edit_'+subz.id" :subject_name="subz.subject" :value="subz.id" v-model="this.edit_subjects" class="mr-2" type="checkbox">
                    <label :for="'edit_'+subz.id">{{ subz.subject }}</label>
                    </div>
                    </div>
                  </div>
  
                  <hr/>
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
        //levels: [],
        //a_levels: [],
        //o_levels: [],
        courses:[],
        errors: [],
        subjects:[],
        loading:true,
        //staffs:[],
        //fees:[],
        edit_errors: [],
        form: {
          coursename: "",
          s_subjects:[],
          role_id: "",
          user_id: "",
        },
        course_id:"",
        og_coursename: "",
        edit_coursename: "",
        edit_subjects: [],
      };
    },
    methods: {
      async allCourses() {
        var response = await axios.get(this.$store.state.api_url + "/courses")
          this.courses = response.data;
          this.loading = false;

      },
      async alevelSubjects() {
        var response = await axios.get(this.$store.state.api_url + "/alevel-subjects")
          //console.log(response.data);
          this.subjects = response.data
      },
      getEdit(id, coursename, subjects) {
        this.edit_errors = [];
        this.course_id = id;
        this.og_coursename = coursename;
        this.edit_coursename = coursename;
        this.edit_subjects = subjects.split(",");
      },
      async addNewCourse() {
        this.errors = [];
        var subjectz = this.form.s_subjects;
        var subject_names = ""

        subjectz.forEach(function(sub){

          var s_name = document.getElementById(sub).getAttribute('subject_name')
          s_name = s_name.charAt(0).toUpperCase() + s_name.slice(1)

          subject_names += s_name+', '
        })
  
        if ((subjectz === undefined || subjectz.length == 0)) {
            
            var message = "subjects not selected, select it acordingly";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
        }else{
        var data = {
          coursename: this.form.coursename.toUpperCase(),
          subjects:subjectz.toString(),
          user_id: this.form.user_id,
          role_id: this.form.role_id,
          subject_names : subject_names
        };
        console.log(data)
        var response = await axios
          .post(this.$store.state.api_url + "/create-course", data)
          .catch((errors) => {
            var message = "Network or Server Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
          });
            if (response.data.success) {
              this.courses = response.data.courses.filter((i) => i.id > 1);
              var message = response.data.message;
              this.$toast.success(message,{duration: 7000,dismissible: true,})
              ///clrar form
              this.form.coursename = ""
              this.form.s_subjects = []
            } else {
              this.errors = response.data.message;
            }
        }
      },
      async updateCourse() {
        this.errors = [];
        var subjectz = this.edit_subjects
        var subject_names = ""

        subjectz.forEach(function(sub){

          var s_name = document.getElementById('edit_'+sub).getAttribute('subject_name')
          s_name = s_name.charAt(0).toUpperCase() + s_name.slice(1)

          subject_names += s_name+', '
        })

        if ((subjectz === undefined || subjectz.length == 0)) {
            var message = "subjects not selected, select it acordingly";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
        }else{
        var data = {
          coursename: this.edit_coursename.toUpperCase(),
          subjects:subjectz.toString(),
          course_id: this.course_id,
          user_id: this.form.user_id,
          role_id: this.form.role_id,
          subject_names : subject_names
        };
        var response = await axios
          .post(this.$store.state.api_url + "/update-course", data)
          .catch((errors) => {
            var message = "Network or Server Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
          });

            if (response.data.success) {
              this.courses = response.data.courses.filter((i) => i.id > 1)
              this.course_id =""
              this.og_coursename = ""
              this.edit_coursename = ""
              this.edit_subjects = []
              var message = response.data.message;
              this.$toast.success(message,{duration: 7000,dismissible: true,})
            } else {
              this.edit_errors = response.data.message;
            }
        
          
        }
      },
      async deleteCourse(id, coursename) {
        this.errors = [];
        var data = {
          id: id,
          coursename: coursename,
          user_id: this.form.user_id,
          role_id: this.form.role_id,
        };
        var response = await axios
          .post(this.$store.state.api_url + "/delete-course", data)
          .catch((errors) => {
            var message = "Network or Server Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
          });
            if (response.data.success) {
              this.courses = response.data.courses.filter((i) => i.id > 1);
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
      this.allCourses();
      this.alevelSubjects();
      this.isAuth();
      /*axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("user_token");*/
    },
  };
  </script>
  