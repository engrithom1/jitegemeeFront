<template>
    <div class="midde_cont">
      <div class="container-fluid">
        <div class="row column_title">
          <div class="col-md-12">
            <div class="page_title">
              <h2>Academic > Attendance</h2>
            </div>
          </div>
        </div>
        <!-- row -->
        <div class="row">
          <!-- table section -->
          <div class="col-md-12">
              <div class="white_shd full margin_bottom_30">
                <div class="full graph_head">
                    <div class="heading1 margin_0">
                      <h2>{{ this.head_title }}</h2>
                    </div>
                </div>
                <div class="full inbox_inner_section">
                  <div class="full padding_infor_info">
                    <div class="mail-box">
                        <aside class="sm-side">
                          <button v-on:click="this.takeRecord" :class="take_record_btn">Take Records</button>
                          <button v-on:click="this.viewRecord" :class="view_record_btn">View Records</button>
                        </aside>
                        <!---take attendance-->
                        <aside v-if="take_record" class="lg-side">
                          <div class="inbox-body">
                              <div class="mail-option">
                                <div class="chk-all w-100">
                                  <form @submit.prevent="getClassStudents" class="form">
                                    <div class="row">
                                      <div class="col-md-3 col-sm-6 form-group">
                                        <select required v-on:change="levelSelected()" class="form-control" v-model="this.level_id">
                                        <option value="" disabled selected>Level</option>
                                        <option
                                          v-for="level in levels"
                                          :key="level.id"
                                          :value="level.id"
                                          
                                        >
                                          {{ level.level }}
                                        </option>
                                        </select>
                                      </div>

                                      <div class="col-md-3 col-sm-6 form-group">
                                        <select required v-on:change="classSelected()" class="form-control" v-model="this.class_id">
                                        <option value="" disabled selected>Class</option>
                                        <option
                                            v-for="clas in clasz"
                                            :key="clas.id"
                                            :value="clas.id"
                                            >
                                            {{ clas.classname }}
                                        </option>
                                        </select>
                                      </div>
                                      <div class="col-md-3 col-sm-6 form-group">
                                        <button :disabled="search_btn" type="submit" class="btn btn-success form-control"><i class="fa fa-search"> </i> Students</button>
                                      </div>
                                      <div class="col-md-3 col-sm-6 form-group">
                                        <button :disabled="students.length == 0" type="submit" class="btn btn-dark form-control"><i class="fa fa-file-pdf-o"> </i> Export PDF</button>
                                      </div>
                                    </div>
                                  </form>
                                </div>  
                              </div>
                              <form @submit.prevent="submitAttendance">
                                <div v-if="this.loading" class="container mt-5 mb-5">
                                    <div class="row">
                                      <div class="span4">
                                        <img class="center-block" width="500" src="/assets/images/loading/cupertino.gif" alt="#" />
                                      </div>
                                      <div class="span4"></div>
                                    </div>
                                </div>
                                <table class="table table-inbox table-hover">
                                  <tbody>
                                      <tr   v-for="student in students"
                                            :key="student.id">
                                        <td class="">
                                            <input :value="student.id" type="checkbox" v-model="this.present_students" :id="'s_'+student.index_no">
                                            <label class="ml-3" :for="'s_'+student.index_no">{{student.first_name+" "+student.middle_name+" "+student.last_name}}</label>
                                        </td>
                                        <td class="view-message" >{{ student.index_no }}</td>
                                        
                                      </tr>

                                      <div v-if="students.length > 0" class="row m-2">
                                     
                                        <div class="form-group">
                                          <input type="date" required class="form-control" v-model="this.date_att" id="">
                                        </div>

                                        <div v-if="this.teacher_id == this.user_id" class="col-md-3 col-sm-6 form-group">
                                          <select required v-on:change="levelSelected()" class="form-control" v-model="this.att_type">
                                          <option value="" disabled selected>Attendance type</option>
                                          <option value="3">Both</option>
                                          <option value="2">Class Attendance</option>
                                          <option value="1">Session Attendance</option>
                                          </select>
                                        </div>

                                        <div v-if="att_type == 1 || att_type == 3" class="col-md-3 col-sm-6 form-group">
                                          <select required v-on:change="levelSelected()" class="form-control" v-model="this.att_subject">
                                          <option value="" disabled selected>Choose subject</option>
                                          <option
                                            class="text-capitalize"
                                            v-for="subject in subjects"
                                            :key="subject.id"
                                            :value="subject.id"
                                            
                                          >
                                            {{ subject.subject }}
                                          </option>
                                          </select>
                                        </div>
                                      
                                        <div class="col-md-3 col-sm-6 form-group">
                                          <button :disabled="attendance_btn" class="btn btn-success w-100">Submit</button>
                                        </div>
                                      </div>
                                  </tbody>
                                </table>
                                <div v-if="!this.loading">
                                  <div v-if="this.students.length == 0" class="container">
                                    <div class="row">
                                      <div class="span2"></div>
                                      <div class="span4">
                                        <h5 class="text-capitalize text-danger">Not Students Found</h5>
                                      </div>
                                      <div class="span4"></div>
                                    </div>
                                  </div>
                                </div>
                              </form>
                          </div>
                        </aside>
                        <!---records heresssssss-->
                        <aside v-if="view_record" class="lg-side">
                          <div class="inbox-body">
                              <div class="mail-option">
                                <div class="chk-all">
                                  <form @submit.prevent="getAttendanceRecords" class="">
                                    <div class="row">
                                      <div class="col-md-3 col-sm-6 form-group">
                                        <select required v-on:change="levelSelected()" class="form-control" v-model="this.level_id">
                                        <option value="" disabled selected>Level</option>
                                        <option
                                          v-for="level in levels"
                                          :key="level.id"
                                          :value="level.id"
                                          
                                        >
                                          {{ level.level }}
                                        </option>
                                        </select>
                                      </div>

                                      <div class="col-md-3 col-sm-6 form-group">
                                        <select required v-on:change="classSelected()" class="form-control" v-model="this.class_id">
                                        <option value="" disabled selected>Class</option>
                                        <option
                                            v-for="clas in clasz"
                                            :key="clas.id"
                                            :value="clas.id"
                                            >
                                            {{ clas.classname }}
                                        </option>
                                        </select>
                                      </div>
                                      <div class="col-md-3 col-sm-6 form-group">
                                        <input required type="date" class="form-control" v-model="this.date_from" id="">
                                      </div>
                                      <div class="col-md-3 col-sm-6 form-group">
                                        <input required type="date" class="form-control" v-model="this.date_to" id="">
                                      </div>
                                      <div class="col-md-3 col-sm-6 form-group">
                                        <button :disabled="records_btn" type="submit" class="btn btn-success form-control"><i class="fa fa-search"> </i> Records</button>
                                      </div>
                                      <div class="col-md-3 col-sm-6 form-group">
                                        <!--input type="text"  placeholder="name or index" class="form-control" v-model="search_index_name" id=""-->
                                      </div>
                                      <div class="col-md-3 col-sm-6 form-group">
                                        <select :disabled="og_a_students.length == 0" v-on:change="selectPresence()" class="form-control" v-model="this.presence">
                                          <option value="2" >All of them</option>
                                          <option value="1" >Present's</option>
                                          <option value="0" >Absent's</option>
                                        </select>
                                      </div>
                                      <div class="col-md-3 col-sm-6 form-group">
                                        <button :disabled="a_students.length == 0" class="btn btn-dark form-control"><i class="fa fa-file-pdf-o"> </i> Export PDF</button>
                                      </div>
                                    </div>
                                  </form>
                                </div>  
                              </div>
                              <table class="table table-inbox table-hover">
                                <tbody>
                                  <tr v-for="a_student in a_students"
                                        :key="a_student.id">
                                    <td class="" >{{ a_student.date_att }}</td>    
                                    <td class="">
                                        {{a_student.first_name+" "+a_student.middle_name+" "+a_student.last_name}}
                                    </td>
                                    <td class="" >{{ a_student.index_no }}</td>
                                    <td v-if="a_student.attend == 1" class="text-success" >Present</td>
                                    <td v-else class="text-danger" >Absent</td>  
                                  </tr>
                                </tbody>
                              </table>
                          </div>
                        </aside>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          <!-- table section -->
        </div>

      </div>
      <!-- footer -->
      <div class="container-fluid">
        <div class="footer">
          <p>
            Copyright © 2023 Jitegemee MIS. All rights reserved.<br />
           
          </p>
        </div>
      </div>
      <!-- payment table-->
    </div>
</template> 

<script>
  import axios from "axios";
  export default {
    data() {
      return{
        ///settings
        take_record : true,
        view_record : false,
        take_record_btn : 'btn btn-default w-100 mb-2',
        view_record_btn : 'btn btn-success w-100 mb-2',
        head_title : "Take class Attendance",
        search_btn:false,
        records_btn:false,
        attendance_btn:false,
        ////atta
        present_students:[],
        date_att:"",
        date_from:"",
        date_to:"",
        search_index_name:"",
        presence:2,
        att_type:1,//1 = session, 2= class, 3 both
        att_subject:0,//subject_id
        ///general
        levels: [],
        students:[],
        a_students:[],
        og_a_students:[],
        clasz:[],
        academic_year: new Date().getFullYear(),
        user_id:"",
        exam_id:"",
        role_id:"",
        class_id:"",
        subs_idz:"",
        teacher_id:"",
        level_id:"",
        search_class:true,
        loading:false,
        fail_mark:"",
        allclass:[],
        subjects:[]
      }
    },
    methods:{
      isAuth() {
      var user = localStorage.getItem("user");
      var token = localStorage.getItem("user_token");
      if (user && token) {
        user = JSON.parse(user);
        this.user_id = user.id;
        this.role_id = user.role_id;
      }
      },
      takeRecord(){
         this.take_record = true;
         this.take_record_btn = 'btn btn-default w-100 mb-2'
         this.head_title = "Take class Attendance"

         this.view_record = false;
         this.view_record_btn = 'btn btn-success w-100 mb-2'
      },
      viewRecord(){
         this.take_record = false;
         this.take_record_btn = 'btn btn-success w-100 mb-2'
         this.head_title = "View class Records"

         this.view_record = true;
         this.view_record_btn = 'btn btn-default w-100 mb-2'
      },
      selectPresence(){
          var ps = this.presence
          var og = this.og_a_students

          if(ps != 2){
            var asz = og.filter((i) => i.attend == ps)

             this.a_students = asz
          }else{
            this.a_students = og
          }

      },
      typeStudentName(){
          var ps = this.presence
          var og = this.og_a_students

          if(ps != 2){
            var asz = og.filter((i) => i.attend == ps)

             this.a_students = asz
          }else{
            this.a_students = og
          }

      },
      refleshPage(){
      window.location.reload();
      }, 
      async allLevel() {
      var response = await axios.get(this.$store.state.api_url + "/levels")
        //console.log(response.data);
      this.levels = response.data;
    
    },
    async allClaszs() {
      var response = await axios.get(this.$store.state.api_url + "/class")
        //console.log(response.data);
        this.allclass = response.data;
    },
    levelSelected() {
      this.search_class = true;
      var level_id = this.level_id;
      this.clasz = this.allclass.filter((i) => i.level_id == level_id);
    },
    classSelected(){
      this.search_class = false;
      var class_id = this.class_id

      let a_class = this.allclass.filter((i) => i.id === class_id);

      this.subs_idz = a_class[0].subjects
      this.teacher_id = a_class[0].teacher_id
    },
    async getAttendanceRecords(){

     var class_id = this.class_id;
     var role_id = this.role_id;

     var date_from = this.date_from
     var date_to = this.date_to

     this.records_btn = true;

      ////date mandingo
     var yy = date_from.split('-')[0]
     var mm = date_from.split('-')[1]
     var dd = date_from.split('-')[2]

     var date_from = yy+""+mm+""+dd

     var yyt = date_to.split('-')[0]
     var mmt = date_to.split('-')[1]
     var ddt = date_to.split('-')[2]

     var date_to = yyt+""+mmt+""+ddt


     if(date_from > date_to){
          var message = 'The first date on range must be less or equal to the second';
          this.$toast.error(message,{duration: 7000,dismissible: true,})
          this.records_btn = false;
     }else{
        
      var response = await axios.post(this.$store.state.api_url + "/attendance_records",{role_id,class_id,date_from,date_to})
      .catch((errors) => {
          console.log(errors);
          this.records_btn = false;
          
            var message = "Something goes wrong try again";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
        });
        
        console.log(response.data);
        if (response.data.success) {

            var message = response.data.message;
            this.$toast.success(message,{duration: 7000,dismissible: true,})

            this.og_a_students = response.data.a_students
            this.a_students = response.data.a_students
            this.records_btn = false;
            

        } else {
            var message = response.data.message;
            this.$toast.error(message,{duration: 7000,dismissible: true,})
            this.records_btn = false;
        }

    }
 },
    async submitAttendance(){
     
        var year = this.academic_year;
        var class_id = this.class_id;
        var level_id = this.level_id;
        var user_id = this.user_id;
        var role_id = this.role_id;

        var att_type = parseInt(this.att_type)
        var subject_id = this.att_subject

        var ps = this.present_students;
        var data_att = this.date_att
        var students = this.students

        this.attendance_btn = true;

         ////date mandingo
        var yy = data_att.split('-')[0]
        var mm = data_att.split('-')[1]
        var dd = data_att.split('-')[2]

        var data_att = yy+""+mm+""+dd

        var data_att_4u = dd+"/"+mm+"/"+yy

        /////date to day
        let dateObj = new Date();
        let month = dateObj.getUTCMonth() + 1; //months from 1-12
        let day = dateObj.getUTCDate();
        let d_year = dateObj.getUTCFullYear();

        var data_day = d_year+""+month+""+day

        if(data_att > data_day){
          
          var message = "you cant do it before the date";
          this.$toast.error(message,{duration: 7000,dismissible: true,})
          
          this.attendance_btn = false;
        }else{
          if(data_att < data_day - 7){
           
            var message = "its too late, 7 days after the date";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
            this.attendance_btn = false;
          }else{

            var class_att = []
            var session_att = []
          
            if(att_type == 2){
            /////general class attendance//////////
           
            students.forEach(function (student) {
                var obj = {
                  'student_id':student.id,
                  'year':year,
                  'date_att':data_att_4u,
                  'date_no':data_att,
                  'classroom_id':class_id,
                  'level_id':level_id,
                  'user_id':user_id,
                  'attend':0,
                }

                class_att.push(obj)
            });
           
            ps.forEach(function(p){
              var o_att = class_att.findIndex((ob => ob.student_id == p))
              class_att[o_att].attend = 1
            })
            ///////ends general class atendance
            }

            if(att_type == 1){
            /////session attendance//////////
           
            students.forEach(function (student) {
                var obj = {
                  'student_id':student.id,
                  'subject_id':subject_id,
                  'year':year,
                  'date_att':data_att_4u,
                  'date_no':data_att,
                  'classroom_id':class_id,
                  'level_id':level_id,
                  'user_id':user_id,
                  'attend':0,
                }

                session_att.push(obj)
            });
           
            ps.forEach(function(p){
              var o_att = session_att.findIndex((ob => ob.student_id == p))
              session_att[o_att].attend = 1
            })
            ///////ends session atendance
            }

            if(att_type == 3){
            /////session attendance//////////
           
            students.forEach(function (student) {
                var obj = {
                  'student_id':student.id,
                  'subject_id':subject_id,
                  'year':year,
                  'date_att':data_att_4u,
                  'date_no':data_att,
                  'classroom_id':class_id,
                  'level_id':level_id,
                  'user_id':user_id,
                  'attend':0,
                }

                session_att.push(obj)
            });
           
            ps.forEach(function(p){
              var o_att = session_att.findIndex((ob => ob.student_id == p))
              session_att[o_att].attend = 1
            })
            ///////ends session atendance

             /////general class attendance//////////
           
             students.forEach(function (student) {
                var obj = {
                  'student_id':student.id,
                  'year':year,
                  'date_att':data_att_4u,
                  'date_no':data_att,
                  'classroom_id':class_id,
                  'level_id':level_id,
                  'user_id':user_id,
                  'attend':0,
                }

                class_att.push(obj)
            });
           
            ps.forEach(function(p){
              var o_att = class_att.findIndex((ob => ob.student_id == p))
              class_att[o_att].attend = 1
            })
            ///////ends general class atendance
            }

            var response = await axios.post(this.$store.state.api_url + "/submit_attendance",{role_id,subject_id,att_type,class_att,session_att,class_id,data_att}).catch((errors) => {
              //console.log(errors);
              this.attendance_btn = false;
              var message = "Something goes wrong try again";
              this.$toast.success(message,{duration: 7000,dismissible: true,})
            });
        
            console.log(response.data);
            if (response.data.success) {

                var message = response.data.message;
                this.$toast.success(message,{duration: 7000,dismissible: true,})
                this.date_att = "";
                this.present_students = []
                this.attendance_btn = false;

            } else {
                var message = response.data.message;
                this.$toast.error(message,{duration: 7000,dismissible: true,})
                this.attendance_btn = false;
            }
          }
        }
    },
    async getClassStudents(){

        var class_id = this.class_id;

        this.search_btn = true;
        this.loading = true;

        var response = await axios.post(this.$store.state.api_url + "/get_class_students",{'class_id':class_id})
        .catch((errors) => {
          console.log(errors);
          this.search_btn = false;
          var message = "Something goes wrong try again";
          this.$toast.error(message,{duration: 7000,dismissible: true,})
          
        });
        
        //console.log(response.data);
        if (response.data.success) {
            this.students = response.data.students;
            this.search_btn = false;
            this.loading = false;

             ///get subjects for a class
            var subs_idz = this.subs_idz 
            var res = await axios.post(this.$store.state.api_url + "/class_subjects",{subs_idz})
              //console.log(response.data);
              this.subjects = res.data;


        } else {
            var message = response.data.message;
            this.$toast.error(message,{duration: 7000,dismissible: true,})
            this.search_btn = false;
        }

    },
    },
      computed:{
    },
    created() {
    this.allClaszs();    
    this.allLevel();
    this.isAuth();
  },
  }
</script>