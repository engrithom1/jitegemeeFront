<template>
  <div class="midde_cont">
    <div class="container-fluid">
      <div class="row column_title">
        <div class="col-md-12">
          <div class="page_title">
            <h2>Academic > Reconciliation</h2>
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
                        <button v-on:click="this.depositSlip" :class="deposit_slip_btn">Deposit Slips</button>
                        <button v-on:click="this.removePayment" :class="remove_payment_btn">Remove Payments</button>
                        <button v-on:click="this.paymentDate" :class="payment_date_btn">Payments Dedits</button>
                      </aside>

                      <!---deposit slips-->
                      <aside v-if="deposit_slip" class="lg-side">
                        <!--data components-->
                        <div class="row column1 social_media_section ml-3 mr-3">
                          <div class="col-md-6 col-lg-3">
                              <div class="full socile_icons fb ">
                                <div class="social_icon">
                                    <i class="fa fa-facebook"></i>
                                    <span class="ml-2">960</span>
                                </div>
                                <div class="social_cont">
                                  <span>UnApproved Slips</span>
                                </div>
                              </div>
                          </div>
                          <div class="col-md-6 col-lg-3">
                              <div class="full socile_icons tw ">
                                <div class="social_icon">
                                    <i class="fa fa-facebook"></i>
                                    <span class="ml-2">12000</span>
                                </div>
                                <div class="social_cont">
                                  <span>Fees Debits</span>
                                </div>
                              </div>
                          </div>
                          <div class="col-md-6 col-lg-3">
                              <div class="full socile_icons linked ">
                                <div class="social_icon">
                                    <i class="fa fa-facebook"></i>
                                    <span class="ml-2">63</span>
                                </div>
                                <div class="social_cont">
                                  <span>Remove Fees</span>
                                </div>
                              </div>
                          </div>
                          <div class="col-md-6 col-lg-3">
                              <div class="full socile_icons google_p ">
                                <div class="social_icon">
                                    <i class="fa fa-trash"></i>
                                    <span class="ml-2">23</span>
                                </div>
                                <div class="social_cont">
                                  <span>Pending Slips</span>
                                </div>
                              </div>
                          </div>
                        </div>
                        <!--end data components-->
                        <div class="inbox-body">
                            <div class="mail-option">
                              <div class="chk-all w-100">
                                <form @submit.prevent="getClassStudents" class="form">
                                  <div class="row">
                                    
                                    <div class="col-md-6 col-sm-6 form-group">
                                      <input placeholder="Enter deposit code" text="" class="form-control"/>
                                    </div>
                                    <div class="col-md-3 col-sm-6 form-group">

                                    </div>
                                    <div class="col-md-3 col-sm-6 form-group">
                                      <button :disabled="students.length == 0" type="submit" class="btn btn-danger form-control"><i class="fa fa-eye mr-2"> </i>Pending Slips</button>
                                    </div>
                                  </div>
                                </form>
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
                                      <td class="view-message" >S.1234.{{ student.index_no }}</td>
                                      
                                    </tr>
                                </tbody>
                              </table>
                        </div>
                      </aside>
                      <!--ends of deposit slips-->

                      <!---remove payments-->
                      <aside v-if="remove_payment" class="lg-side">
                        <!--data components-->
                        <div class="row column1 social_media_section ml-3 mr-3">
                          <div class="col-md-6 col-lg-3">
                              <div class="full socile_icons fb ">
                                <div class="social_icon">
                                    <i class="fa fa-facebook"></i>
                                    <span class="ml-2">960</span>
                                </div>
                                <div class="social_cont">
                                  <span>UnApproved Slips</span>
                                </div>
                              </div>
                          </div>
                          <div class="col-md-6 col-lg-3">
                              <div class="full socile_icons tw ">
                                <div class="social_icon">
                                    <i class="fa fa-facebook"></i>
                                    <span class="ml-2">12000</span>
                                </div>
                                <div class="social_cont">
                                  <span>Fees Debits</span>
                                </div>
                              </div>
                          </div>
                          <div class="col-md-6 col-lg-3">
                              <div class="full socile_icons linked ">
                                <div class="social_icon">
                                    <i class="fa fa-facebook"></i>
                                    <span class="ml-2">63</span>
                                </div>
                                <div class="social_cont">
                                  <span>Remove Fees</span>
                                </div>
                              </div>
                          </div>
                          <div class="col-md-6 col-lg-3">
                              <div class="full socile_icons google_p ">
                                <div class="social_icon">
                                    <i class="fa fa-trash"></i>
                                    <span class="ml-2">23</span>
                                </div>
                                <div class="social_cont">
                                  <span>Pending Slips</span>
                                </div>
                              </div>
                          </div>
                        </div>
                        <!--end data components-->
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
                                      <input type="date" class="form-control" v-model="this.date_from" id="">
                                    </div>
                                    <div class="col-md-3 col-sm-6 form-group">
                                      <input type="date" class="form-control" v-model="this.date_to" id="">
                                    </div>
                                    <div class="col-md-3 col-sm-6 form-group">
                                      <button :disabled="records_btn" type="submit" class="btn btn-success form-control"><i class="fa fa-search"> </i> Records</button>
                                    </div>
                                    <div class="col-md-3 col-sm-6 form-group">
                                      <input type="text"  placeholder="name or index" class="form-control" v-model="search_index_name" id="">
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
                                  <td class="" >S.1234.{{ a_student.index_no }}</td>
                                  <td v-if="a_student.attend == 1" class="text-success" >Present</td>
                                  <td v-else class="text-danger" >Absent</td>  
                                </tr>
                              </tbody>
                            </table>
                        </div>
                      </aside>
                      <!--ends of remove paayments-->

                      <!---payment date-->
                      <aside v-if="payment_date" class="lg-side">
                        <!--data components-->
                        <div class="row column1 social_media_section ml-3 mr-3">
                          <div class="col-md-6 col-lg-3">
                              <div class="full socile_icons fb ">
                                <div class="social_icon">
                                    <i class="fa fa-facebook"></i>
                                    <span class="ml-2">960</span>
                                </div>
                                <div class="social_cont">
                                  <span>UnApproved Slips</span>
                                </div>
                              </div>
                          </div>
                          <div class="col-md-6 col-lg-3">
                              <div class="full socile_icons tw ">
                                <div class="social_icon">
                                    <i class="fa fa-facebook"></i>
                                    <span class="ml-2">12000</span>
                                </div>
                                <div class="social_cont">
                                  <span>Fees Debits</span>
                                </div>
                              </div>
                          </div>
                          <div class="col-md-6 col-lg-3">
                              <div class="full socile_icons linked ">
                                <div class="social_icon">
                                    <i class="fa fa-facebook"></i>
                                    <span class="ml-2">63</span>
                                </div>
                                <div class="social_cont">
                                  <span>Remove Fees</span>
                                </div>
                              </div>
                          </div>
                          <div class="col-md-6 col-lg-3">
                              <div class="full socile_icons google_p ">
                                <div class="social_icon">
                                    <i class="fa fa-trash"></i>
                                    <span class="ml-2">23</span>
                                </div>
                                <div class="social_cont">
                                  <span>Pending Slips</span>
                                </div>
                              </div>
                          </div>
                        </div>
                        <!--end data components-->
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
                                      <input type="date" class="form-control" v-model="this.date_from" id="">
                                    </div>
                                    <div class="col-md-3 col-sm-6 form-group">
                                      <input type="date" class="form-control" v-model="this.date_to" id="">
                                    </div>
                                    <div class="col-md-3 col-sm-6 form-group">
                                      <button :disabled="records_btn" type="submit" class="btn btn-success form-control"><i class="fa fa-search"> </i> Records</button>
                                    </div>
                                    <div class="col-md-3 col-sm-6 form-group">
                                      <input type="text"  placeholder="name or index" class="form-control" v-model="search_index_name" id="">
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
                                  <td class="" >S.1234.{{ a_student.index_no }}</td>
                                  <td v-if="a_student.attend == 1" class="text-success" >Present</td>
                                  <td v-else class="text-danger" >Absent</td>  
                                </tr>
                              </tbody>
                            </table>
                        </div>
                      </aside>
                      <!--ends of payment date-->

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
import * as CryptoJS from 'crypto-js';

export default {
  data() {
    return{
      ///settings
      deposit_slip : true,
      remove_payment : false,
      payment_date:false,
      deposit_slip_btn : 'btn btn-default w-100 mb-2',
      remove_payment_btn : 'btn btn-success w-100 mb-2',
      payment_date_btn : 'btn btn-success w-100 mb-2',
      head_title : "Approve Deposit Slips",
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
      level_id:"",
      search_class:true,
      fail_mark:"",
      allclass:[]
    }
  },
  methods:{
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
    depositSlip(){
       this.deposit_slip = true;
       this.deposit_slip_btn = 'btn btn-default w-100 mb-2'
       this.head_title = "Approve Deposit Slips"

       this.remove_payment = false;
       this.remove_payment_btn = 'btn btn-success w-100 mb-2'

       this.payment_date = false;
       this.payment_date_btn = 'btn btn-success w-100 mb-2'
    },
    removePayment(){
       this.deposit_slip = false;
       this.deposit_slip_btn = 'btn btn-success w-100 mb-2'
       this.head_title = "Remove Unrequired Payments"

       this.remove_payment = true;
       this.remove_payment_btn = 'btn btn-default w-100 mb-2'

       this.payment_date = false;
       this.payment_date_btn = 'btn btn-success w-100 mb-2'
    },

    paymentDate(){
       this.deposit_slip = false;
       this.deposit_slip_btn = 'btn btn-success w-100 mb-2'
       this.head_title = "Check Payments Debits"

       this.remove_payment = false;
       this.remove_payment_btn = 'btn btn-success w-100 mb-2'

       this.payment_date = true;
       this.payment_date_btn = 'btn btn-default w-100 mb-2'
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
    allLevel() {
    axios.get(this.$store.state.api_url + "/levels").then((response) => {
      //console.log(response.data);
      this.levels = response.data;
    });
  },
  allClaszs() {
    axios.get(this.$store.state.api_url + "/class").then((response) => {
      //console.log(response.data);
      this.allclass = response.data;
    });
  },
  levelSelected() {
    this.search_class = true;
    var level_id = this.level_id;
    let clazs = this.allclass.filter((i) => i.level_id === level_id);
    this.clasz = clazs;
  },
  classSelected(){
    this.search_class = false;
  },
  getAttendanceRecords(){
   
   
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
        alert('The first date on range must be less or equal to the second')
        this.records_btn = false;
   }else{
      
      axios.post(this.$store.state.api_url + "/attendance_records",{role_id,class_id,date_from,date_to}).then((response) => {
      
      console.log(response.data);
      if (response.data.success) {

          alert(response.data.message);

          this.og_a_students = response.data.a_students
          this.a_students = response.data.a_students
          this.records_btn = false;

      } else {
          alert(response.data.message);
          this.records_btn = false;
      }

      }).catch((errors) => {
        console.log(errors);
        this.records_btn = false;
        alert("Something goes wrong try again");
      });
  }
},
  submitAttendance(){
   
      var year = this.academic_year;
      var class_id = this.class_id;
      var level_id = this.level_id;
      var user_id = this.user_id;
      var role_id = this.role_id;

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
        alert('you cant do it before the date')
        this.attendance_btn = false;
      }else{
        if(data_att < data_day - 7){
          alert('its too late, 7 days after the date')
          this.attendance_btn = false;
        }else{

          var att = []

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

              att.push(obj)
          });
         
          ps.forEach(function(p){
            var o_att = att.findIndex((ob => ob.student_id == p))
            att[o_att].attend = 1
          })

          axios.post(this.$store.state.api_url + "/submit_attendance",{role_id,att,class_id,data_att}).then((response) => {
      
          console.log(response.data);
          if (response.data.success) {

              alert(response.data.message);
              this.date_att = "";
              this.present_students = []
              this.attendance_btn = false;

          } else {
              alert(response.data.message);
              this.attendance_btn = false;
          }

          }).catch((errors) => {
            console.log(errors);
            this.attendance_btn = false;
            alert("Something goes wrong try again");
          });
        }
      }
  },
  getClassStudents(){

      var class_id = this.class_id;

      this.search_btn = true;

      axios.post(this.$store.state.api_url + "/get_class_students",{'class_id':class_id}).then((response) => {
      
      console.log(response.data);
      if (response.data.success) {
          this.students = response.data.students;
          this.search_btn = false;
      } else {
          alert(response.data.message);
          this.search_btn = false;
      }

      }).catch((errors) => {
        console.log(errors);
        this.search_btn = false;
        alert("Something goes wrong try again");
      });
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