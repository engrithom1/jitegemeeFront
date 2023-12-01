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
        <div class="col-sm-12 col-md-8">
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
                  <select v-on:change="levelSelected()" class="form-control" required v-model="this.form.level_id">
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
                  <input required
                    type="text"
                    class="form-control"
                    v-model="this.form.classname"
                    placeholder="A1"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div class="form-group">
                  <label>Class Teacher*</label>
                  <select class="form-control" required v-model="this.form.teacher_id">
                    <option
                      class="text-capitalize"
                      v-for="staff in staffs"
                      :key="staff.id"
                      :value="staff.id"
                    >
                      {{ staff.initial+" "+staff.first_name+" "+staff.middle_name+" "+staff.last_name }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="cname">Room Number*</label>
                  <input required
                    type="text"
                    class="form-control"
                    v-model="this.form.roomnumber"
                    placeholder="Room 21"
                    aria-describedby="emailHelp"
                  />
                </div>
                <hr/>
                <div v-if="sub_show" class="form-grioup">
                  <label for="csubjects" class="mb-3">Select Subjects*</label>
                  <div class="row">
                  <div v-for="subz in subjects" :key="subz.id" class="col-sm-6 col-md-6">
                  <input :id="subz.subject" :value="subz.id" v-model="this.form.s_subjects" class="mr-2" type="checkbox">
                  <label :for="subz.subject">{{ subz.subject }}</label>
                  </div>
                  </div>
                </div>

                <div v-if="coz_show" class="form-group">
                  <label>Select Course*</label>
                  <select class="form-control" required v-model="this.form.course_id">
                    <option disabled value="" selected>Select Course</option>
                    <option
                      class="text-capitalize"
                      v-for="course in courses"
                      :key="course.id"
                      :value="course.id"
                    >
                      {{ course.coursename }}
                    </option>
                  </select>
                </div>

                <!--hr/>
                <div class="form-grioup">
                  <label for="csubjects" class="mb-3">Select Fees*</label>
                  <div class="row">
                  <div v-for="feez in fees" :key="feez.id" class="col-sm-6 col-md-6">
                  <input :id="feez.fee" :value="feez.id" v-model="this.form.s_fees" class="mr-2" type="checkbox">
                  <label :for="feez.fee">{{ feez.fee }}</label>
                  </div>
                  </div>
                </div-->
               
                <button :disabled="this.form.role_id != 4" class="btn btn-success">Submit</button>
              </form>
            </div>
          </div>
        </div>
        <div class="col-sm-12 col-md-12">
          <div class="white_shd full margin_bottom_30">
            <div class="full graph_head">
              <div class="d-flex justify-content-between">
                <div class="heading1 margin_0"><h2>Classrooms</h2></div>
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
                            <div class="span2"></div>
                            <div class="span4">
                              <img class="center-block" width="500" src="/assets/images/loading/cupertino.gif" alt="#" />
                            </div>
                            <div class="span4"></div>
                          </div>
                      </div>
                      <table v-if="!this.loading" class="table table-inbox table-hover">
                        <thead>
                          <th><b>Level</b></th>
                          <th><b>Class</b></th>
                          <th><b>Room</b></th>
                          <th><b>Stds</b></th>
                          <th><b>Subs</b></th>
                          <th><b>Class Teacher</b></th>
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
                            <td class="text-capitalize">
                              {{ clasz.initial+" "+clasz.first_name+" "+clasz.last_name }}
                            </td>
                            <td class="view-message">
                              <button :disabled="this.form.role_id != 4"
                                @click="
                                  getEdit(
                                    clasz.id,
                                    clasz.classname,
                                    clasz.roomnumber,
                                    clasz.fees,
                                    clasz.subjects,
                                    clasz.teacher_id,
                                    clasz.course_id
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
                                @click="deleteClass(clasz.id, clasz.classname)"
                              >
                                <i class="fa fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div v-if="!this.loading">
                        <div v-if="this.claszs.length == 0" class="container">
                          <div class="row">
                            <div class="span2"></div>
                            <div class="span4">
                              <h5 class="text-capitalize text-danger">Not Fee Found</h5>
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
                  <label>Class Teacher*</label>
                  <select class="form-control" required v-model="this.edit_teacher_id">
                    <option
                      class="text-capitalize"
                      v-for="staff in staffs"
                      :key="staff.id"
                      :value="staff.id"
                    >
                      {{ staff.initial+" "+staff.first_name+" "+staff.middle_name+" "+staff.last_name }}
                    </option>
                  </select>
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
                <div v-if="edit_coz_show" class="form-group">
                  <label>Select Course*</label>
                  <select class="form-control" required v-model="this.edit_course_id">
                    <option disabled value="" selected>Select Course</option>
                    <option
                      class="text-capitalize"
                      v-for="course in courses"
                      :key="course.id"
                      :value="course.id"
                    >
                      {{ course.coursename }}
                    </option>
                  </select>
                </div>
                <div v-if="edit_sub_show" class="form-grioup">
                  <label for="csubjects" class="mb-3">Select Subjects*</label>
                  <div class="row">
                  <div v-for="subz in subjects" :key="subz.id" class="col-sm-6 col-md-6">
                  <input :id="'edit_'+subz.subject" :value="subz.id" v-model="this.edit_subjects" class="mr-2" type="checkbox">
                  <label :for="'edit_'+subz.subject">{{ subz.subject }}</label>
                  </div>
                  </div>
                </div>

                <!--hr/>
                <div class="form-grioup">
                  <label for="csubjects" class="mb-3">Select Fees*</label>
                  <div class="row">
                  <div v-for="feez in fees" :key="feez.id" class="col-sm-6 col-md-6">
                  <input :id="'edit_'+feez.fee" :value="feez.id" v-model="this.edit_fees" class="mr-2" type="checkbox">
                  <label :for="'edit_'+feez.fee">{{ feez.fee }}</label>
                  </div>
                  </div>
                </div-->
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
      a_levels: [],
      o_levels: [],
      courses:[],
      errors: [],
      subjects:[],
      staffs:[],
      sub_show:true,
      coz_show:false,
      edit_sub_show:false,
      edit_coz_show:false,
      loading:true,
      fees:[],
      edit_errors: [],
      form: {
        course_id:0,
        classname: "",
        s_subjects:[],
        s_fees:[0],
        roomnumber: "",
        level_id: "",
        teacher_id: "",
        role_id: "",
        user_id: "",
      },
      class_id: "",
      og_classname: "",
      edit_classname: "",
      edit_course_id: 0,
      edit_teacher_id: "",
      edit_fees: [0],
      edit_subjects: [],
      edit_roomnumber: "",
    };
  },
  methods: {
    levelSelected(){
      var level_id = this.form.level_id;
      if(level_id > 4){
        this.coz_show = true
        this.sub_show = false
      }else{
        this.coz_show = false
        this.sub_show = true
      }
    },
    async allClaszs() {
      var response = await axios.get(this.$store.state.api_url + "/class-teachers")
        //console.log(response.data);
        this.claszs = response.data;
    },
    async allCourses() {
          var response = await axios.get(this.$store.state.api_url + "/courses")
          this.courses = response.data.filter((i) => i.id > 1);
          this.loading = false
          //console.log(response.data.filter((i) => i.id > 1));
      },
    async allSubjects() {
      var response = await axios.get(this.$store.state.api_url + "/subjects")
        //console.log(response.data);
        this.subjects = response.data.filter((i) => i.level_id === 7);
    },
    async allFees() {
      var response = await axios.get(this.$store.state.api_url + "/fees")
        //console.log(response.data);
        this.fees = response.data;
    },
    async allStaff() {
      var response = await axios.get(this.$store.state.api_url + "/staffs")
        console.log(response.data);
        this.staffs = response.data;
    },
    async allLevel() {
      var response = await axios.get(this.$store.state.api_url + "/levels")
        //console.log(response.data);
        var levels = response.data

        if(levels){
          var o_levels = levels.filter((i) => i.id < 5);
          var a_levels = levels.filter((i) => i.id > 4);

        console.log(a_levels)

        this.levels = levels;
        this.o_levels = o_levels;
        }
    },
    getEdit(id, classname, roomnumber,fees, subjects,teacher_id, course_id) {
      this.edit_errors = [];
      this.class_id = id;
      this.og_classname = classname;
      this.edit_course_id = course_id;
      this.edit_classname = classname;
      this.edit_roomnumber = roomnumber;
      this.edit_teacher_id = teacher_id,
      this.edit_fees = fees.split(",");
      this.edit_subjects = subjects.split(",");

      if(course_id == 0){
        this.edit_sub_show = true;
        this.edit_coz_show = false;
      }else{
        this.edit_coz_show = true;
        this.edit_sub_show = false;
      }
    },
    async addNewClass() {
      this.errors = [];
      var feez = this.form.s_fees;
      var subjectz = this.form.s_subjects;
      var course_id = this.form.course_id
      var level_id = this.form.level_id

      if(level_id > 4){
        var course = this.courses.filter((i) => i.id == course_id);
        subjectz = String(course[0].subjects).split(",")
      }else{
        course_id = 0
      }

      //feez === undefined || feez.length == 0) || (subjectz === undefined || subjectz.length == 0

      if ((subjectz === undefined || subjectz.length == 0)) {
            var message = 'subjects or fees not selected, select it acordingly';
            this.$toast.success(message,{duration: 7000,dismissible: true,})
      }else{
      var data = {
        classname: this.form.classname,
        level_id: level_id,
        fees:feez.toString(),
        subjects:subjectz.toString(),
        roomnumber: this.form.roomnumber,
        user_id: this.form.user_id,
        role_id: this.form.role_id,
        teacher_id: this.form.teacher_id,
        course_id:course_id
      };
      console.log(data)
      var response = await axios
        .post(this.$store.state.api_url + "/create-class", data)
        .catch((errors) => {
          var message = "Network or Server Errors";
          this.$toast.error(message,{duration: 7000,dismissible: true,})
        });

          if (response.data.success) {
            this.claszs = response.data.claszs;
            var message = response.data.message;
            this.$toast.success(message,{duration: 7000,dismissible: true,})
            ///clrar form
            this.form.classname = ""
            this.form.roomnumber = ""
            this.teacher_id = ""
            this.form.user_id = ""
            this.form.s_subjects = []
            this.form.s_fees = []
          } else {
            
            var message = response.data.message;
            this.$toast.error(message,{duration: 7000,dismissible: true,})
            this.errors = [response.data.message];
            //this.errors = this.errors.push(response.data.message);
            //console.log(this.errors)
          }
      }
    },
    async updateClass() {
      this.errors = [];
      this.edit_errors = [];
      var feez = this.edit_fees.toString();
      var subjectz = this.edit_subjects.toString();
      var course_id = this.edit_course_id;

      if(course_id > 0){
        var course = this.courses.filter((i) => i.id == course_id);
        subjectz = String(course[0].subjects)
      }
      var data = {
        classname: this.edit_classname,
        teacher_id: this.edit_teacher_id,
        course_id: this.edit_course_id,
        class_id: this.class_id,
        og_classname: this.og_classname,
        roomnumber: this.edit_roomnumber,
        fees:feez,
        subjects:subjectz,
        user_id: this.form.user_id,
        role_id: this.form.role_id,
      };
      var response = await axios
        .post(this.$store.state.api_url + "/update-class", data)
        .catch((errors) => {
          var message = "Network or Server Errors";
          this.$toast.error(message,{duration: 7000,dismissible: true,})
        });

          if (response.data.success) {
            this.claszs = response.data.claszs;
            var message = response.data.message;
            this.$toast.success(message,{duration: 7000,dismissible: true,})
          } else {
           
            var message = response.data.message;
            this.$toast.error(message,{duration: 7000,dismissible: true,})
            //this.edit_errors = this.edit_errors.push(response.data.message);
            //console.log(this.errors)
            this.edit_errors = [response.data.message];
          }

    },
    async deleteClass(id, classname) {
      this.errors = [];
      var data = {
        class_id: id,
        classname: classname,
        user_id: this.form.user_id,
        role_id: this.form.role_id,
      };
      var response = await axios
        .post(this.$store.state.api_url + "/delete-class", data)
        .catch((errors) => {
          var message = "Network or Server Errors";
          this.$toast.error(message,{duration: 7000,dismissible: true,})
        });
          if (response.data.success) {
            this.claszs = response.data.claszs;
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
    this.isAuth();
    this.allClaszs();
    this.allCourses();
    this.allLevel();
    this.allStaff();
    this.allFees();
    this.allSubjects();
   
    /*axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("user_token");*/
  },
};
</script>
