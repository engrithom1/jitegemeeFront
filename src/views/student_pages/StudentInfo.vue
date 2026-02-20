<style>
.img-student{
    width: 80px;
    height: 80px;
}
.p-head{
    font-size: 20px;
    font-weight: 500;
}
</style>

<template>
    <div class="midde_cont">
        <div class="container-fluid">
            <div class="row column_title">
                <div class="col-md-12">
                    <div class="page_title d-flex justify-content-between">
                        <h2>Student Information</h2>
                        <button v-on:click="this.refleshPage" class="btn btn-success ml-0">
                        <i class="fa fa-arrow-left mr-2"></i>Back
                        </button>
                    </div>
                </div>
            </div>
            <!--contents heaa-->
            <div v-if="!find_student" class="row column4 graph" >
                <div class="col-sm-12">
                    <div class="white_shd full margin_bottom_30">
                        <div class="full graph_head">
                            <div class="d-flex justify-content-between">
                                <div class="heading1 margin_0">
                                    <h2>Search Students</h2>
                                </div>
                                <!--button v-on:click="this.parentExist" class="btn btn-success ml-0">Add Parent</button-->
                            </div>
                        </div>
                        <div class="full progress_bar_inner">
                            <div class="row">
                                <div class="col-md-12">
                                    <p class="pt-3 text-danger text-center">{{ this.index_no_erro }}</p>
                                    <div class="inbox-head">
                                        <h3>Index Number</h3>
                                        <form @submit.prevent="searchStudentInfo"
                                            class="pull-right position search_inbox">
                                            <div class="input-append">
                                                <input type="text" minlength="6" maxlength="6"
                                                    v-model="this.search_index_no" class="sr-input"
                                                    placeholder="400000" />
                                                <button :disabled="find_btn" class="btn sr-btn" type="submit">
                                                    <i class="fa fa-search"></i>
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <div v-if="this.search_loading" class="container mt-5 mb-5">
                        <div class="row">
                          <div class="span2"></div>  
                          <div class="span4">
                            <img class="center-block" width="500" src="/assets/images/loading/cupertino.gif" alt="#" />
                          </div>
                          <div class="span4"></div>
                        </div>
                    </div>
                </div>
            </div>
  
  
           
            <div class="" v-if="find_student" >
                 <!--student details-->
                <div class="row column4 graph">
                    <div class="col-sm-12">
                        <div class="white_shd full margin_bottom_30">
                            <div class="full graph_head">
                                <div class="">
                                    <div class="heading1 margin_0">
                                        <h2>Student Details</h2>
                                    </div>
                                </div>
                            </div>
                            <div class="full">
                                 <div class="invoice_inner">
                                    <div class="row  m-3" id="personal_info">
                                        <div class="col-12 d-flex justify-content-between mb-3">
                                            <img width="100" src="/assets/images/logo/jmis_logo-bg.png" alt="#" />
                                            <p class="text-center mt-3"> <strong class="text-center"> JITEGEMEE  HIGH  SCHOOL </strong><br/>Student Parent and Admission Details</p>
                                            <h6 class="text-center mt-3">Cretated At<br/>{{this.to_date}}</h6>
                                        </div>
                                       <div class="col-sm-12 col-md-6">
                                        
                                          <div class="full invoice_blog">
                                             <h4>Personal</h4>
                                             <img class="img-responsive float-right img-student" :src="'/assets/images/logo/'+student.photo" width='40%' alt="no image">
                                             <p><strong>{{student.first_name+" "+student.middle_name+" "+student.last_name}}</strong><br>  
                                                {{ student.nationality }}, {{ student.gender }}<br> 
                                                <strong>Health : </strong>{{student.health}}<br>
                                                <strong>home : </strong>{{ student.home_address }}<br>
                                                <strong>Birth date : </strong>{{student.birth_date}}<br> 
                                                <strong>Parental Status : </strong>{{student.parent_status}}<br>
                                                <strong>Behavour and Health </strong><br>{{ student.behavior }}<br> 
                                                <strong>Contacts : </strong>{{ student.phone+", "+student.email }}
                                             </p>
                                          </div>
                                       </div>
                                       <div class="col-sm-12 col-md-6">
                                        
                                          <div class="full invoice_blog">
                                             <h4>Admission</h4>
                                            <div v-if="this.admission_loading" class="container mt-5 mb-5">
                                                <img class="center-block" width="250" src="/assets/images/loading/cupertino.gif" alt="#" />
                                            </div>
                                             <p v-if="!admission_loading"><strong>Registered: </strong>{{ admission.created_at }}<br>
                                                <strong>Registration No : </strong>{{ admission.index_no }}<br>
                                                <strong>PREM No : </strong>{{ admission.prem_no }}<br>
                                                <strong>Status : </strong>{{ student.status_name }}<br>
                                                <strong>Accademic Year: </strong>{{ admission.accademic_year }}<br>  
                                                <strong>Class: </strong>{{ admission.level+", "+admission.classname }}<br>
                                                <strong>Admission Type : </strong>{{admission.admission}}<br/>   
                                                <strong>Entry Type : </strong>{{ admission.entry }}<br/> 
                                                <span v-if="admission.entry_id == 2"> 
                                                <strong>From : </strong> {{admission.school_from}}<br/>
                                                <strong>Reason : </strong> {{admission.transfer_reason }}
                                                </span> 
                                                
                                             </p>
                                          </div>
                                       </div>
                                       <div class="col-sm-12 col-md-6">
                                          <div class="full invoice_blog">
                                             <h4>Parent </h4>
                                            <div v-if="this.parent_loading" class="container mt-5 mb-5">
                                                <img class="center-block" width="250" src="/assets/images/loading/cupertino.gif" alt="#" />
                                            </div>
                                            <img v-if="!parent_loading" class="img-responsive float-right img-student" :src="'/assets/images/logo/'+parent.photo" alt="no image">
                                             <p v-if="!parent_loading"><strong>{{parent.first_name+" "+parent.middle_name+" "+parent.last_name}}</strong><br>
                                                {{ parent.nationality }}, {{ parent.gender }}<br> 
                                                <strong>Home : </strong>{{ parent.home_address }}<br>
                                                <strong>Relation : </strong>{{ parent.relation }}<br>
                                                <strong>Occupation : </strong>{{parent.occupation}}<br>  
                                                <strong>Contacts : </strong>{{ parent.phone+", "+parent.email }}
                                             </p>
                                          </div>
                                       </div>
                                       <div class="col-12">
                                       </div>
                                    </div>
                                    <div class="float-right">
                                            <button v-on:click="exportPersonalInfo" class="btn btn-dark form-control"><i class="fa fa-file-pdf-o"> </i> Export PDF</button>
                                    </div>
                                 </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--student details end here-->
                <!--financial skills-->
                
                <div class="row column4 graph">
                    <div class="col-sm-12">
                        <div class="white_shd full margin_bottom_30">
                            <div class="full graph_head">
                                <div class="">
                                    <div class="heading1 margin_0">
                                        <h2>Financial Details</h2>
                                    </div>
                                </div>
                            </div>
                            <div id="finance_info">
                            <div class="full">
                                 <div class="invoice_inner"> 
                                    <div class="row m-3">
                                        <div class="col-12 d-flex justify-content-between">
                                            <img width="100" src="/assets/images/logo/jmis_logo-bg.png" alt="#" />
                                            <p class="text-center mt"> <strong class="text-center"> JITEGEMEE  HIGH  SCHOOL </strong><br/>Student Finance Detail( Reg No: {{ student.index_no }})</p>
                                            <h6 class="text-center mt-3">Cretated At<br/>{{this.to_date}}</h6>
                                        </div>
                                       <div class="col-md-6">
                                          
                                       </div>
                                       <div class="col-md-6">
                                          <div class="full invoice_blog padding_infor_info padding-bottom_0">
                                             <h4>Balance (TZS): {{balance}}</h4>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                            </div>
                            <div class="full padding_infor_info">
                                <p class="text-center p-head">Payments for Accademic Year {{ accademic_year }}</p>
                                <div v-if="this.finance_loading" class="container mt-5 mb-5">
                                    <div class="row">
                                    <div class="span2"></div>  
                                    <div class="span4">
                                        <img class="center-block" width="500" src="/assets/images/loading/cupertino.gif" alt="#" />
                                    </div>
                                    <div class="span4"></div>
                                    </div>
                                </div>
                                <div v-if="!this.finance_loading" class="table_row">
                                    <div class="table-responsive">
                                        <table class="table table-striped">
                                            <thead>
                                                <tr>
                                                <th width="">Fee Type</th>
                                                <th>Amount</th>
                                                <th>Paid</th>
                                                <th width="">Remains</th>
                                                <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="feepay in feepays" :key="feepay.id">
                                                    <td width="">{{feepay.fee}}</td>
                                                    <td>{{ feepay.amount }}</td>
                                                    <td>{{ feepay.paid_amount }}</td>
                                                    <td width="">{{ feepay.amount - feepay.paid_amount }}</td>
                                                    <td v-if="feepay.amount - feepay.paid_amount == 0">Nil</td>
                                                    <td v-else>Not yet</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                
                            </div>
                            </div>
                            <div class="float-right">
                                <button v-on:click="exportFinanceInfo" class="btn btn-dark form-control"><i class="fa fa-file-pdf-o"> </i> Export PDF</button>
                            </div>
                        </div>
                    </div>
                </div>
           
                <!--end financial skill-->
                <!--student Results-->
                <div class="row column4 graph">
                    <div class="col-sm-12">
                        <div class="white_shd full margin_bottom_30">
                            <div class="full graph_head">
                                <div class="">
                                    <div class="heading1 margin_0">
                                        <h2>Exams Results</h2>
                                    </div>
                                </div>
                            </div>
                            <div class="full progress_bar_inner m-3">
                                <div class="d-flex justify-content-center">
                                    <h5 class="text-danger m-5">No Results found</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--end student-->

                <!--student attendance-->
                <div class="row column4 graph">
                    <div class="col-sm-12">
                        <div class="white_shd full margin_bottom_30">
                            <div class="full graph_head">
                                <div class="">
                                    <div class="heading1 margin_0">
                                        <h2>Student Attendance</h2>
                                    </div>
                                </div>
                            </div>
                            <div class="full progress_bar_inner m-3">
                                <div class="d-flex justify-content-center">
                                    <h5 class="text-danger m-5">No Attendance data found</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--end attendance-->

                <!--student attendance-->
                <div class="row column4 graph">
                    <div class="col-sm-12">
                        <div class="white_shd full margin_bottom_30">
                            <div class="full graph_head">
                                <div class="">
                                    <div class="heading1 margin_0">
                                        <h2>More Actions</h2>
                                    </div>
                                </div>
                            </div>
                            <div class="full progress_bar_inner m-3">
                                <div class="d-flex justify-content-center">
                                    <div class="m-3">
                                        <button class="btn btn-success ml-1" data-toggle="modal"
                                        data-target="#edit-student">Edit Student</button>
                                        <button v-on:click="onChangeClass()" class="btn btn-success ml-1" data-toggle="modal"
                                        data-target="#edit-class">Edit Class</button>
                                        <button class="btn btn-success ml-1">Edit Parent</button>
                                        <button data-toggle="modal"
                                        data-target="#transfer-modal" class="btn btn-secondary ml-1">Transfer Out</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--end attendance-->
            </div>
            
        </div>
          <!-- The Modal -->
          
    <!-- end model popup -->
        <!-- footer -->
        <div class="container-fluid">
            <div class="footer">
                <p>Copyright © 2023 Jitegemee MIS. All rights reserved.<br /></p>
            </div>
        </div>
        <!-- payment table-->
    </div>

    <div class="modal fade" data-backdrop="static" data-keyboard="false" id="edit-class">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title">Change Student Class</h4>
          <button type="button" class="close" data-dismiss="modal">
            &times;
          </button>
        </div>
        <!-- Modal body -->
        <div class="modal-body">
          <p>Your about to change the class of  <b class="text-uppercase"> {{ " "+student.first_name }}</b></p>
          <form @submit.prevent="updateStudentClass" class="p-3">
            <p v-for="error in edit_errors" :key="error" class="text-danger">
              {{ error[0] }}
            </p>
            <div class="form-group">
              <h4></h4>
            </div>
            <div class="form-group">
                  <label>Choose Class*</label>
                  <select class="form-control" required v-model="this.edit_class_id">
                    <option
                      class="text-capitalize"
                      v-for="clas in og_class"
                      :key="clas.id"
                      :value="clas.id"
                    >
                      {{ clas.classname }}
                    </option>
                  </select>
                </div>
            <div class="form-group">
              <label for="cname">Reason (10-100 characters)*</label>
              <input
                type="text"
                minlength="10"
                maxlength="100"
                class="form-control"
                v-model="this.edit_class_reason"
                placeholder="why"
                aria-describedby="emailHelp"
              />
            </div>

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

    <!----transfer here-->
    <div class="modal fade" data-backdrop="static" data-keyboard="false" id="transfer-modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">Student Transfer Out</h4>
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
          </div>
          <!-- Modal body -->
          <div class="modal-body">
            <p>Your about to make tranfer of <b class="text-uppercase"> {{ " "+student.first_name }}</b></p>
            <form @submit.prevent="studentTranferOut" class="p-3">
              <p v-for="error in edit_errors" :key="error" class="text-danger">
                {{ error[0] }}
              </p>
              <div class="form-group">
                <h4></h4>
              </div>

              <div class="form-group">
                <label for="sname">School *</label>
                <input
                  type="text"
                  minlength="10"
                  maxlength="100"
                  class="form-control"
                  v-model="this.school"
                  placeholder="school name"
                  aria-describedby="emailHelp"
                />
              </div>
              
              <div class="form-group">
                <label for="cname">Reason (10-100 characters)*</label>
                <input
                  type="text"
                  minlength="10"
                  maxlength="100"
                  class="form-control"
                  v-model="this.reason"
                  placeholder="why"
                  aria-describedby="emailHelp"
                />
              </div>
  
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
    <!---->

    <div class="modal fade" data-backdrop="static" data-keyboard="false" id="edit-student">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title">Change Student Info</h4>
          <button type="button" class="close" data-dismiss="modal">
            &times;
          </button>
        </div>
        <!-- Modal body -->
        <div class="modal-body">
           <p>Still working on</p> 
          <!--form @submit.prevent="updateStudentClass" class="p-3">
            <p v-for="error in edit_errors" :key="error" class="text-danger">
              {{ error[0] }}
            </p>
            <div class="form-group">
              <label for="cname">Class Name*</label>
              <input
                type="text"
                class="form-control"
                v-model="this.anything"
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
            <div class="modal-footer">
              <button class="btn btn-success">Submit</button>
              <button type="button" class="btn btn-danger" data-dismiss="modal">
                Close
              </button>
            </div>
          </form-->
        </div>
      </div>
    </div>
    </div>
    
  </template>
  
  <script>
  import axios from "axios"
  import jspdf from "jspdf"
  import * as CryptoJS from 'crypto-js';

  export default {
    data() {
      return {
        find_student: false,
        find_btn: false,
        search_loading:false,
        parent_loading:true,
        admission_loading:true,
        print_personal_info:false,
        finance_loading:true,
        ////basic
        user_id:"",
        role_id:"",
        accademic_year: new Date().getFullYear(),
        search_index_no:"",
        index_no_erro:"",
        to_date:"",
        ///student-parent
        student:{},
        admission:{},
        parent:{},
        ////finance
        feepays:[],
        balance:0,
        ///change class
        claszs: [],
        og_class:[],
        og_class_id:"",
        edit_class_id:"",
        edit_class_reason:"",
        reason:"",
        school:""
      };
    },
    methods: {
      async studentTranferOut(){
          
          var student_id = this.student.id
          var reason = this.reason
          var school = this.school
          
          
           if(reason == null || reason == ""){
             
             alert('Reason is required')
           }else{
             
                var response = await axios
                .post(this.$store.state.api_url + "/student-transfer-out",{student_id,reason,school})
                .catch((errors) => {
                  var message = "Network or Request Errors";
                  this.$toast.error(message,{duration: 7000,dismissible: true,})
                });

                  if (response.data.success) {
                    this.reason = ''
                    this.school = ''
                    var message = response.data.message;
                    this.$toast.success(message,{duration: 7000,dismissible: true,})
                  } else {
                    var message = response.data.message;
                    this.$toast.error(message,{duration: 7000,dismissible: true,})
                  }
           }
        },
        async updateStudentClass(){
          var og_id  = this.og_class_id
          var class_id = this.edit_class_id
          var student_id = this.student.id
          var reason = this.edit_class_reason
          var level_id = this.student.level_id
          
           if(reason == null || reason == ""){
             
             alert('Reason is required')
           }else{
              if(og_id == class_id){
                alert('nothing to change')
              }else{
                var response = await axios
                .post(this.$store.state.api_url + "/change-student-class",{og_id,class_id,student_id,reason,level_id})
                .catch((errors) => {
                  var message = "Network or Server Errors";
                  this.$toast.error(message,{duration: 7000,dismissible: true,})
                });

                  if (response.data.success) {
                    var message = response.data.message;
                    this.$toast.success(message,{duration: 7000,dismissible: true,})
                  } else {
                    var message = response.data.message;
                    this.$toast.error(message,{duration: 7000,dismissible: true,})
                  }
              }
           }
        },
        updateStudentInfo(){
            
        },    
    searchStudentInfo() {
      this.index_no_erro = ""
      this.search_loading = true
      var index_no = this.search_index_no

      if(index_no > 0 && index_no < 1000000){
        this.find_btn = true,

        axios.post(this.$store.state.api_url + "/search_student_personal_info",{'index_no':index_no}).then((response) => {
        

        this.search_loading = false
        this.find_btn = false
        
        if(response.data.success && response.data.student != null){
          this.student = response.data.student
          this.find_student = true
          ///call function for more details
          this.admissionInfo()
          this.parentInfo()
          this.financeInfo()

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = dd + ' /' + mm + ' /' + yyyy;

        this.to_date = today;
          
        }else{
          this.index_no_erro = "Not student found, Enter correct index no"
         
        }
        }).catch((errors) => {
          //console.log(errors);
          
          var message = "Network or Server Errors"
          this.$toast.error(message,{duration: 7000,dismissible: true,})
        });
      
      }else{
        this.index_no_erro = "Enter correct index no "+this.search_index_no
        this.find_btn = false
      }
    },
    exportPersonalInfo(){
        var reg_no = this.student.index_no

        const doc = new jspdf()
        const html = document.getElementById('personal_info')

        doc.html(html, {
            callback: function(doc) {
                // Save the PDF
                doc.save(reg_no+"_persoanl_info.pdf");
            },
            x: 5,
            y: 10,
            width: 200, //target width in the PDF document
            windowWidth: 900 //window width in CSS pixels
        });

    },
    exportFinanceInfo(){
        var reg_no = this.student.index_no

        const doc = new jspdf()
        const html = document.getElementById('finance_info')

        doc.html(html, {
            callback: function(doc) {
                // Save the PDF
                doc.save(reg_no+"_finance_info.pdf");
            },
            x: 5,
            y: 10,
            width: 200, //target width in the PDF document
            windowWidth: 900 //window width in CSS pixels
        });

    },
    admissionInfo(){
        var student_id = this.student.id
        axios.post(this.$store.state.api_url + "/admission-info",{student_id}).then((response) => {
        //console.log(response.data);
        if(response.data != null){
            this.admission = response.data;
            this.admission_loading = false;
        }
        })

    },
    parentInfo(){
        var student_id = this.student.id
        axios.post(this.$store.state.api_url + "/parent-info",{student_id}).then((response) => {
        //console.log(response.data);
        if(response.data != null){
            this.parent = response.data;
            this.parent_loading = false;
        }
        })

    },
    financeInfo(){
        var student_id = this.student.id
        var year = this.accademic_year

        axios.post(this.$store.state.api_url + "/finance-info",{student_id,year}).then((response) => {
        //console.log(response.data);
            if(response.data != null){
                this.feepays = response.data.feepays;
                this.balance = response.data.balance;
                this.finance_loading = false;
            }
        })

    },
    async allClaszs() {
        
      var response = await axios.get(this.$store.state.api_url + "/class")
        console.log(response.data);
        this.claszs = response.data;

    },
    onChangeClass(){
        var level = this.admission.level_id
        this.og_class_id = this.admission.classroom_id
        this.edit_class_id = this.admission.classroom_id
        this.og_class = this.claszs.filter((i) => i.level_id === level);

        console.log(this.og_class)
        console.log(this.og_class_id)
    },

    isAuth() {
      var user_cry = localStorage.getItem("rich") || "";
      var token_cry = localStorage.getItem("rosh") || "";
      var user = CryptoJS.AES.decrypt(user_cry, 'rich').toString(CryptoJS.enc.Utf8) || null
      var token = CryptoJS.AES.decrypt(token_cry, 'rosh').toString(CryptoJS.enc.Utf8) || null

    if (user && token) {
      user = JSON.parse(user);
      this.user_id = user.id;
      this.role_id = user.role_id;
    }
  },
      refleshPage(){
        window.location.reload();
      },
    },
    created() {
      this.isAuth();
      this.allClaszs();
    },
  };
  </script>
  