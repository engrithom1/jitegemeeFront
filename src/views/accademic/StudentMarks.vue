<template>
    <div class="midde_cont">
      <div class="container-fluid">
        <div class="row column_title">
          <div class="col-md-12">
            <div class="page_title">
              <h2>Academic > Exam Marks</h2>
            </div>
          </div>
        </div>
        <!--contents heaa-->
        <div v-show="!find_clas" class="row column4 graph">
          <div class="col-sm-6">
            <div class="white_shd full margin_bottom_30">
            <div class="full graph_head">
              <div class="d-flex justify-content-between">
                <div class="heading1 margin_0 "><h2>Choose Class</h2></div>
                <!--button v-on:click="this.parentExist" class="btn btn-success ml-0">Add Parent</button-->
              </div>
            </div>
            <div class="full progress_bar_inner">
                  <form action="#" class="p-3">
                    <div class="form-group">
                      <label for="pgender"
                        >Exam Type</label
                      >
                      <select
                        class="form-control text-capitalize"
                        v-model="exam_id"
                        required
                      >
                      <option
                          class="text-capitalize"
                          v-for="exms in active_exams"
                          :key="exms.id"
                          :value="exms.id"
                        >
                          {{ exms.examname }}
                        </option>
                      </select>
                    </div>
                    <div class="form-group">
                          <label for="pgender"
                        >Academic Year</label
                      >
                      <input required minlength="4" maxlength="4" v-model="this.academic_year" type="number" class="form-control"/>  
                        </div>
                    <div class="form-group">
                      <label>Select Level*</label>
                      <select v-on:change="levelSelected()" class="form-control" v-model="this.level_id">
                        <option
                          v-for="level in levels"
                          :key="level.id"
                          :value="level.id"
                          
                        >
                          {{ level.level }}
                        </option>
                      </select>
                    </div>

                    <div v-show="clasz.length >= 1" class="form-group">
                      <label>Select Class*</label>
                  <select v-on:change="classSelected()" class="form-control" v-model="this.selected_class">
                    <option
                      v-for="clas in clasz"
                      :key="clas.id"
                      :value="clas"
                    >
                      {{ clas.classname }}
                    </option>
                    </select>
                    </div>
                    <button :disabled="this.search_class" type="button" @click="this.getStudentsClass" class="btn btn-success">Search</button>
                  </form>
                  
            </div>
          </div>
          </div>
        </div>

        <!--add payments-->
        <div v-show="find_clas" class="row column4 graph">
          <div class="col-12">
            <div class="white_shd full margin_bottom_30">
            <div class="full graph_head">
              <div class="d-flex justify-content-between">
                <div class="heading1 margin_0 "><h2>Class {{ this.selected_class.classname }}</h2></div>
                <button v-on:click="this.refleshPage" class="btn btn-success ml-0">Back</button>
              </div>
            </div>
            <div class="full progress_bar_inner">
              <div class="row">
                <div class="col-md-12">
                  <div class="inbox-body">
                  <div class="mail-option">
                    <div class="table-responsive-md w-100">
                      <table class="table table-hover">
                      <thead>
                        <th><b>Index Number</b></th>
                        <th><b>Full Name</b></th>
                        <th><b>Action</b></th>
                      </thead>
                      <tbody>
                        <tr v-for="student in students" :key="student.mark" class="">
                          <td class="">{{ student.index_no }}</td>
                          <td class="">{{ student.first_name+' '+student.middle_name+' '+student.last_name}}</td>
                          <td class="">
                            <button v-show="student.exam_marks_count == this.subjects.length" @click="selectedStudent(student)" class="btn btn-success btn-table mr-1" data-toggle="modal" data-target="#myModal"><i class="fa fa-eye"></i> view marks</button>
                            <button v-show="student.exam_marks_count < this.subjects.length" @click="selectedStudent(student)" class="btn btn-primary btn-table mr-1" data-toggle="modal" data-target="#myModal"><i class="fa fa-plus"></i> add marks</button>
                          </td>
                        </tr>
                      </tbody>
                    </table> 
                    </div>
                       
                  </div>
                  <div class="d-flex justify-content-center">
                    <button v-show="hosted && role_id == 4" @click="hostResults()" class="btn btn-success p-3" ><i class="fa fa-cloud-upload fa-lg"></i><b class="p-3 font-lg">Host Results</b><i class="fa fa-cloud-upload fa-lg"></i></button>
                    <p class="alert bg-success text-white" v-show="!hosted">Results for this class and Exam has aleady been Hosted</p>  
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

        <!-- The Modal maxxxxxxxx -->
        <div class="modal fade hide" data-backdrop="static" data-keyboard="false" id="myModal">
            <div class="modal-dialog">
               <div class="modal-content">
                  <!-- Modal Header -->
                  <div class="modal-header">
                     <h4 class="modal-title">Add Exam Marks</h4>
                     <button type="button" @click="refleshStudents()" class="close" data-dismiss="modal">&times;</button>
                  </div>
                  <!-- Modal body -->
                  
                  <div class="modal-body">

                    <div class="pt-3 pr-3 pl-3 d-flex justify-content-between">
                    <h4 class="text-camelcase">S.459.{{ this.selected_student.index_no }}</h4>
                    <h4 class="text-camelcase">{{ this.selected_student.first_name+' '+this.selected_student.last_name }}</h4>
                  </div>
                  <form v-show="!change_mark_bool" @submit.prevent="addExamMarks" class="pl-2 pr-2">
                <p v-for="error in errors" :key="error" class="text-danger text-center">
                  {{ error[0] }}
                </p>
                <p class="text-danger">
                  {{ fail_mark }}
                </p>
                      
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                        <select required v-model="subject"
                          class="form-control"
                        >
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
                      </div>
                      <div class="col-md-3">
                        <div class="form-group">
                          <input required v-model="mark" min="0" max="100" maxlength="3" type="number" class="form-control"/>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group">
                          <button type="submit" id="max_submit_btn" class="btn btn-primary form-control">Add Marks</button>
                        </div>
                      </div>
                    </div>
                  </form>

                  <div v-show="change_mark_bool" class="row">
                      <p class="text-danger">
                       {{ fail_mark }}
                      </p>
                      <div class="col-md-12">
                        <p class="">Changing marks for <b class="text-capitalize">{{ this.change_subject_name }}</b></p>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <input disabled v-model="change_p_mark" min="0" max="100" maxlength="3" type="number" class="form-control"/>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <input v-model="change_n_mark" min="0" max="100" maxlength="3" type="number" class="form-control"/>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <button @click="changeMarks()" class="btn btn-primary form-control">Change Marks</button>
                        </div>
                      </div>
                    </div>

                  <div class="row">
                      <div class="col-12">
                      <table class="table">
                        <thead>
                          <td>Subject</td>
                          <td>Marks</td>
                          <td>Grade</td>
                          <td>Grade Label</td>
                          <td></td>
                        </thead>
                        <tbody>
                          <tr v-for="exam in exam_marks" :key="exam.mark">
                            <td class="text-capitalize">{{ exam.subject }}</td>
                            <td class="text-capitalize">{{ exam.mark }}</td>
                            <td class="text-capitalize">{{ exam.grade }}</td>
                            <td class="text-capitalize">{{ exam.grade_label }}</td>
                            <td>
                              <button @click="getChangeMarks(exam)" class="btn btn-sm btn-success btn-table"><i class="fa fa-edit"></i></button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    </div>
                  </div>
                
                  <!-- Modal footer -->
                  <div class="modal-footer">
                     <button type="button" @click="refleshStudents()" class="btn btn-danger" data-dismiss="modal">Close</button>
                  </div>
               </div>
            </div>
         </div>
        <!-- end The Modal maxxxxxxxx -->

        <!-- The Modal waitttttttt -->
         <div class="modal fade hide" data-backdrop="static" data-keyboard="false" id="waitModal">
            <div class="modal-dialog">
               <div class="modal-content">
                  <!-- Modal body -->
                  <div class="modal-body">
                      <h2>Please wait</h2>
                  </div>
               </div>
            </div>
         </div>
         <!-- end model popup -->
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
        find_clas:false,
        search_class:true,
        fail_mark:"",
        user_id:"",
        role_id:"",
        mark:0,
        level_id:"",
        selected_class:{},
        students:[],
        selected_student:{},
        levels: [],
        clasz:[],
        errors: [],
        subject:"",
        subjects:[],
        academic_year: new Date().getFullYear(),
        exam_marks:[],
        active_exams:[],
        exam_id:"",
        user_id:"",
        role_id:"",
        hosted: false,
        change_p_mark:"",
        change_n_mark:0,
        change_subject_id:"",
        change_subject_name:"",
        change_mark_bool:false,
        change_row_id:"",
        change_subs:"",
        show_alert: false
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
    },refleshPage(){
      window.location.reload();
    },
      getStudentsClass(){

        var year = this.academic_year;

        if(year > new Date().getFullYear()){
            alert("You can't add mark for the next year")
        }else{

        var class_id = this.selected_class.id;
        var subjects = this.selected_class.subjects;
        var exam_id = this.exam_id;

        axios.post(this.$store.state.api_url + "/class_students",{'class_id':class_id,'subjects':subjects,'exam_id':exam_id,'year':year}).then((response) => {
        console.log(response.data);

        this.students = response.data.students;
        this.subjects = response.data.subjects;
        this.hosted = response.data.hosted;

        this.find_clas = !this.find_clas
        });
      }

      },
      refleshStudents(){

        var year = this.academic_year;
        var class_id = this.selected_class.id;
        var exam_id = this.exam_id;

        axios.post(this.$store.state.api_url + "/reflesh_students",{'class_id':class_id,'exam_id':exam_id,'year':year}).then((response) => {
        //console.log(response.data);
        this.students = response.data.students;
        this.hosted = response.data.hosted;
        //this.find_clas = !this.find_clas

        }); 
      },
      selectedStudent(student){
        this.fail_mark = ""
        this.selected_student = student;

        var student_id = student.id;
        var exam_id =  this.exam_id;
        var year = this.academic_year;
        var level_id = this.level_id;

        axios.post(this.$store.state.api_url + "/student_mark_recorded",{'student_id':student_id,'exam_id':exam_id,'year':year,'level_id':level_id}).then((response) => {
        //console.log(response.data);
        this.exam_marks = response.data;
        });
      },
      allLevel() {
      axios.get(this.$store.state.api_url + "/levels").then((response) => {
        //console.log(response.data);
        this.levels = response.data;
      });
    },
    activeExams() {
      axios.get(this.$store.state.api_url + "/active_exams").then((response) => {
        //console.log(response.data);
        this.active_exams = response.data;
      });
    },
    levelSelected() {
      this.search_class = true;
      //alert('level ni '+this.level_id);
      var level_id = this.level_id;
      axios.post(this.$store.state.api_url + "/class_level",{'level_id':level_id}).then((response) => {
        //console.log(response.data);
        
        this.clasz = response.data.claszs;
      });
    },
    classSelected(){
      this.search_class = false;
    },
    addExamMarks(){

        this.fail_mark = ""

        document.getElementById("max_submit_btn").disabled = true;

        var level_id = this.level_id;
        var subject_id = this.subject
        var student_id = this.selected_student.id
        var mark = this.mark
        var year = this.academic_year
        var exam_id = this.exam_id
        var class_id = this.selected_class.id;
        var user_id = this.user_id
        var role_id = this.role_id

        axios.post(this.$store.state.api_url + "/create-exam-mark",{user_id,exam_id,role_id,mark,subject_id,year,level_id,student_id,class_id}).then((response) => {
        
        if(response.data.success){
          this.fail_mark = ""
          this.exam_marks = response.data.examx
          //console.log(response.data.examx);
          this.subject = ""
          this.mark = ""
          document.getElementById("max_submit_btn").disabled = false;

        }else{
          this.fail_mark = response.data.message
          //console.log(response.data.examx);
          this.exam_marks = response.data.examx
          document.getElementById("max_submit_btn").disabled = false;
        }
        
      }); 
    },
    hostResults(){
      var subl = this.subjects.length;
      var studs = this.students;
      var check = true;
      var count_studs = 0;

      var level_id = this.level_id;
      var year = this.academic_year
      var exam_id = this.exam_id
      var class_id = this.selected_class.id;
      var user_id = this.user_id
      var role_id = this.role_id

      studs.forEach(function(stud){
        if(stud.exam_marks_count < subl){
          console.log('hapoooo');
          check = false
          count_studs += 1;
        }
      });
        if(check){
          //peform action
          axios.post(this.$store.state.api_url + "/host-exam-mark",{user_id,exam_id,role_id,year,level_id,class_id,subl}).then((response) => {
        
        if(response.data.success){
          alert(response.data.message)
          window.location.reload();

        }else{
          alert(response.data.message)
        }
        
        }); 
        }else{
          //perform not alert
          alert('sio poa wanafunzi '+count_studs+', hawajawekewa marks');
        }
    },
    getChangeMarks(exam){
      //console.log(exam);
        this.fail_mark = ""
        this.change_mark_bool = true
        this.change_p_mark = exam.mark
        this.change_subject_id = exam.subject_id
        this.change_subject_name = exam.subject
        this.change_row_id = exam.id
        this.change_user_id = exam.user_id
        this.change_n_mark = 0
        this.change_subs = exam.subs
    },
    changeMarks(){

      this.fail_mark = ""
      var user_id = this.user_id
      var change_user_id = this.change_user_id
      var role_id = this.role_id
      var level_id = this.level_id
      var id = this.change_row_id
      var mark = this.change_n_mark
      var student_id = this.selected_student.id
      var year = this.academic_year
      var subs = this.change_subs
      var exam_id = this.exam_id

      if(subs != 0){

        this.fail_mark = "You can't change marks anymore Exam Results has aleady been Hosted"

      }else{
        
      axios.post(this.$store.state.api_url + "/update-exam-mark",{user_id,role_id,id,mark,change_user_id,level_id,year,exam_id,student_id}).then((response) => {
        
        if(response.data.success){
          this.fail_mark = ""
          this.exam_marks = response.data.examx
          console.log(response.data.examx);

        }else{
          this.fail_mark = response.data.message
          console.log(response.data.examx);
          this.exam_marks = response.data.examx
        }
      });
      }

        this.change_mark_bool = false
        this.change_p_mark = ""
        this.change_subject_id = ""
        this.change_subject_name = ""
        this.change_row_id = ""
        this.change_n_mark = "" 
    }
      
    },
      computed:{
    },
    created() {
    this.allLevel();
    this.isAuth();
    this.activeExams();
  },
  }
</script>
  