<template>
  <div class="midde_cont">
    <div class="container-fluid">
      <div class="row column_title">
        <div class="col-md-12">
          <div class="page_title">
            <h2>Dashboard</h2>
          </div>
        </div>
      </div>
      <!--for super admin-->
      <div v-if="this.role_id > 2" class="row column1">
        <div class="col-md-6 col-lg-3">
          <div class="full counter_section margin_bottom_30">
            <div class="couter_icon">
              <div>
                <i class="fa fa-bitcoin text-danger"></i>
              </div>
            </div>
            <div class="counter_no">
              <div>
                <p class="total_no">{{ this.balances }}</p>
                <p class="head_couter">Fees Balances</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="full counter_section margin_bottom_30">
            <div class="couter_icon">
              <div>
                <i class="fa fa-money text-secondary"></i>
              </div>
            </div>
            <div class="counter_no">
              <div>
                <p class="total_no">{{ this.debits }}</p>
                <p class="head_couter">Fees Debits</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="full counter_section margin_bottom_30">
            <div class="couter_icon">
              <div>
                <i class="fa fa-credit-card text-primary"></i>
              </div>
            </div>
            <div class="counter_no">
              <div>
                <p class="total_no">{{ this.paids }}</p>
                <p class="head_couter">Fees Paid</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="full counter_section margin_bottom_30">
            <div class="couter_icon">
              <div>
                <i class="fa fa-calendar text-success"></i>
              </div>
            </div>
            <div class="counter_no">
              <div>
                <p class="total_no">{{ this.attendance+"%" }}</p>
                <p class="head_couter">Attendance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--end for super admin-->
      <!--for all-->
      <div class="row column1">
        <div class="col-md-6 col-lg-3">
          <div class="full counter_section margin_bottom_30">
            <div class="couter_icon">
              <div>
                <i class="fa fa-users yellow_color"></i>
              </div>
            </div>
            <div class="counter_no">
              <div>
                <p class="total_no">{{this.students}}</p>
                <p class="head_couter">Students</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="full counter_section margin_bottom_30">
            <div class="couter_icon">
              <div>
                <i class="fa fa-clone blue1_color"></i>
              </div>
            </div>
            <div class="counter_no">
              <div>
                <p class="total_no">{{ this.subjects }}</p>
                <p class="head_couter">Subjects</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="full counter_section margin_bottom_30">
            <div class="couter_icon">
              <div>
                <i class="fa fa-user green_color"></i>
              </div>
            </div>
            <div class="counter_no">
              <div>
                <p class="total_no">{{ this.teachers }}</p>
                <p class="head_couter">Teachers</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="full counter_section margin_bottom_30">
            <div class="couter_icon">
              <div>
                <i class="fa fa-users red_color"></i>
              </div>
            </div>
            <div class="counter_no">
              <div>
                <p class="total_no">{{ this.staffs }}</p>
                <p class="head_couter">All Staffs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--end for all-->
      <div class="row column4 graph">
        <div class="col-md-12 margin_bottom_30">
          <div class="dash_blog">
            <div class="dash_blog_inner">
              <div class="dash_head">
                <h3>
                  <span><i class="fa fa-calendar"></i> Events & Time Table</span>
                </h3>
              </div>
              
              <div class="task_list_main">
                <ul class="task_list">
                  <li>
                    <a href="#">Test 2 Examination's shall be on date delow</a
                    ><br /><strong>11/ 11/ 1023</strong>
                  </li>
                  <li>
                    <a href="#">School Meating for all students and staff</a><br /><strong
                      >17/ 11/ 1023</strong
                    >
                  </li>
                  <li>
                    <a href="#">Annualy Examination's shall be on date delow</a
                    ><br /><strong>01/ 12/ 1023</strong>
                  </li>
                  <li>
                    <a href="#">Form form and form six Graduation selemonies</a><br /><strong
                      >19/ 12/ 1023</strong
                    >
                  </li>
                 
                </ul>
              </div>
              <div class="read_more">
                <div class="center">
                  <a class="main_bt read_bt" href="#">Read More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
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
  </div>
</template>

<script>
import axios from "axios";
import * as CryptoJS from 'crypto-js';

export default {
  data() {
    return{
      ///basic info
      academic_year: new Date().getFullYear(),
      user_id:"",
      role_id:"",
      ////dashbord info
      balances:"000,000",
      debits:"000,000",
      paids:"000,000",
      attendance:0,
      students:"0000",
      subjects:"00",
      teachers:"00",
      staffs:"00"
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
  dashbordData() {
    var year = this.academic_year

    axios.post(this.$store.state.api_url + "/dashbord-datas",{year}).then((response) => {
      //this.students = response.data.students;
      //this.subjects = response.data.subjects;
      //this.teachers = response.data.teachers;
      //this.staffs = response.data.staffs;
      //this.balances = new Intl.NumberFormat().format(response.data.balances);
      this.paids = new Intl.NumberFormat().format(response.data.paids);
      this.debits = new Intl.NumberFormat().format(response.data.debits);
      this.attendance = response.data.attendance;
    });
  },
  async dashBalances(){
      var response = await axios.get(this.$store.state.api_url + "/dash-balances")
        //console.log(response.data);
        this.balances = response.data;
  },
  async dashStudents(){
      var response = await axios.get(this.$store.state.api_url + "/dash-students")
        //console.log(response.data);
        this.students = response.data;
  },
  async dashTeachers(){
      var response = await axios.get(this.$store.state.api_url + "/dash-teachers")
        //console.log(response.data);
        this.teachers = response.data;
  },
  async dashStaffs(){
      var response = await axios.get(this.$store.state.api_url + "/dash-staffs")
        //console.log(response.data);
        this.staffs = response.data;
  },
  async dashSubjects(){
      var response = await axios.get(this.$store.state.api_url + "/dash-subjects")
        //console.log(response.data);
        this.subjects = response.data;
  },
  async dashPaids(){
      var year = this.academic_year
      var response = await axios.post(this.$store.state.api_url + "/dash-paids",{year})
        //console.log(response.data);
        this.paids = response.data;
  },
  async dashDebits(){
      var year = this.academic_year
      var response = await axios.post(this.$store.state.api_url + "/dash-debits",{year})
        //console.log(response.data);
        this.debits = response.data;
  },
  async dashAttendance(){
      var year = this.academic_year
      var response = await axios.post(this.$store.state.api_url + "/dash-attendance",{year})
        //console.log(response.data);
        this.debits = response.data;
  },
},
    computed:{
  },
  created() {
  this.isAuth();
  this.dashBalances();
  this.dashStudents();
  this.dashAttendance();
  this.dashTeachers();
  this.dashStaffs();
  this.dashSubjects();
  this.dashPaids();
  this.dashDebits();
},
}
</script>
