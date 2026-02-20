
<template>
  <div class="midde_cont">
    <div class="container-fluid">
      <div class="row column_title">
        <div class="col-md-12">
          <div class="page_title">
            <h2>Admission > All Students</h2>
          </div>
        </div>
      </div>
      <!--contents heaa-->
      <div class="row column4 graph">
        <div class="col-12">
          <div class="white_shd full margin_bottom_30">
            <div class="full graph_head">
              <div class="d-flex justify-content-between">
                <div class="heading1 margin_0"><h2>All Students</h2></div>
                <!--button v-on:click="this.parentExist" class="btn btn-success ml-0">Add Parent</button-->
              </div>
            </div>
            <div class="full progress_bar_inner">
              <div class="row">
                <div class="col-md-12">
                  <div class="inbox-head">
                    <h3>found ({{ this.og_students.length }})</h3>
                    <form action="#" class="pull-right position search_inbox">
                      <div class="input-append">
                        <input
                          type="text"
                          class="sr-input"
                          placeholder="Search students"
                        />
                        <button class="btn sr-btn" type="button">
                          <i class="fa fa-search"></i>
                        </button>
                      </div>
                    </form>
                  </div>
                 
                  <div class="inbox-body">
                    <div class="mail-option">
                      <div class="btn-group hidden-phone">
                        <select class="form-control" v-on:change="levelSelected()" v-model="this.level_id">
                          <option :value="0" selected>All Level</option>
                          <option
                            v-for="level in levels"
                            :key="level.id"
                            :value="level.id">
                            {{ level.level }}
                          </option>
                        </select>
                      </div>
                      <div class="btn-group">
                        <select class="form-control" v-on:change="classSelected()" v-model="this.class_id">
                          <option :value="0" selected>All Classes</option>
                          <option
                              v-for="clas in clasz"
                              :key="clas.id"
                              :value="clas.id">
                              {{ clas.classname }}
                          </option>
                        </select>
                      </div>
                      <div class="btn-group">
                        <button v-on:click="this.exportStudentData()" class="btn btn-default">Export Pdf</button>
                      </div>
                      <ul class="unstyled inbox-pagination mb-3">
                        <li><span>{{ this.students.length }} of {{ this.og_students.length }}</span></li>
                        <!--li>
                          <a class="np-btn" href="#">
                            <i class="fa fa-angle-left pagination-left"></i>
                          </a>
                        </li>
                        <li>
                          <a class="np-btn" href="#">
                            <i class="fa fa-angle-right pagination-right"></i>
                          </a>
                        </li-->
                      </ul>
                      <div v-if="this.loading" class="container mt-5 mb-5">
                          <div class="row">
                            <div class="col-sm-2"></div>
                            <div class="col-sm-6">
                              <img class="center-block" width="500" src="/assets/images/loading/cupertino.gif" alt="#" />
                            </div>
                            <div class="col-sm-3"></div>
                          </div>
                      </div>

                     

                      <div v-if="!this.loading" class="table-responsive-md w-100">
                        
                        <table class="table table-hover">
                          <thead>
                            <th><b>No</b></th>
                            <th><b>Index Number</b></th>
                            <th><b>Full Name</b></th>
                            <th><b>Class</b></th>
                            <th><b>Gender</b></th>
                            <th><b>Action</b></th>
                          </thead>
                          <tbody>
                            <div v-if="students.length == 0">
                              <h4>No Student Found</h4>
                            </div>
                            <tr class="" v-for="student,index in students">
                              <td class="">{{ index+1 }}</td>
                              <td class="">{{ student.index_no }}</td>
                              <td class="text-uppercase">{{ student.first_name+' '+student.middle_name+' '+student.last_name}}</td>
                              <td class="">{{ student.classname }}</td>
                              <td class="text-uppercase">{{ student.gender}}</td>
                              <td class="">
                                <button class="btn btn-primary btn-table btn-sm mr-1">
                                  <i class="fa fa-edit"></i>
                                </button>
                                <button class="btn btn-info btn-table btn-sm">
                                  <i class="fa fa-user"></i>
                                </button>
                              </td>
                            </tr>
                  
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                   <!---print start-->
                   <div v-show="this.show_first" class="row" id="print_students">
                    <div class="col-12 d-flex justify-content-between mb-3">
                        <img width="100" src="/assets/images/logo/jmis_logo-bg.png" alt="#" />
                        <p class="text-center mt-3"> <strong class="text-center"> JITEGEMEE  HIGH  SCHOOL </strong><br/>Students List</p>
                        <h6 class="text-center mt-3 p-2">Cretated At<br/>{{this.to_date}}</h6>
                    </div>
                    <div class="table-responsive-md col-12 w-100">
                        
                        <table class="table table-hover">
                          <thead>
                            <th><b>No</b></th>
                            <th><b>Index Number</b></th>
                            <th><b>Full Name</b></th>
                            <th><b>Class</b></th>
                            <th><b>Gender</b></th>
                           
                          </thead>
                          <tbody>
                            <div v-if="students.length == 0">
                              <h4>No Student Found</h4>
                            </div>
                            <tr class="" v-for="student,index in students">
                              <td class="">{{ index+1 }}</td>
                              <td class="">{{ student.index_no }}</td>
                              <td class="text-uppercase">{{ student.first_name+' '+student.middle_name+' '+student.last_name}}</td>
                              <td class="">{{ student.classname }}</td>
                              <td class="text-uppercase">{{ student.gender}}</td>
                            </tr>  
                  
                          </tbody>
                        </table>
                      </div>
                  </div>
                  <!--print end-->
                  
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
</template>

<script>
  import axios from "axios";
  import * as CryptoJS from 'crypto-js';
  //import jspdf from "jspdf";
  import html2pdf from "html2pdf.js";
  export default {
    data() {
      return{

        levels: [],
        clasz:[],
        academic_year: new Date().getFullYear(),
        user_id:"",
        role_id:"",
        class_id:0,
        level_id:0,
        search_class:true,
        loading:true,
        allclass:[],
        og_students:[],
        students:[],
        to_date:"",
        show_first:false
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
      refleshPage(){
      window.location.reload();
      }, 
      async allLevel() {
      var response = await axios.get(this.$store.state.api_url + "/levels")
        //console.log(response.data);
      this.levels = response.data;
    
    },
    async exportStudentData(){

      this.show_first = true;

      var level = ""
      var clazz = ""

      if(this.level_id == 0){
         level = "all_Level"
      }else{
         level = "form"
      }

      if(this.class_id == 0){
         clazz = "all_class"
      }else{
         clazz = this.allclass.find(x => x.id === this.class_id).classname
      }
       
      const html = document.getElementById('print_students')

       await html2pdf(html, {
				margin: 10,
        pagebreak: { avoid: "tr", mode: "css", before: "#nextpage1" },
  			filename: level+"_"+clazz+"_student_list.pdf",
			});

        this.show_first = false;

    },
    async not_in_use_exportStudentData(){

      this.show_first = true;
      
        const doc = new jspdf()
        const html = document.getElementById('print_students')

      await doc.html(html, {
            callback: function(doc) {
                // Save the PDF
                doc.save("student_list.pdf");
            },
            x: 5,
            y: 10,
            width: 200, //target width in the PDF document
            windowWidth: 900 //window width in CSS pixels
        });

        this.show_first = false;

      },
      async allStudents() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = dd + ' /' + mm + ' /' + yyyy;

        this.to_date = today;

      var response = await axios.get(this.$store.state.api_url + "/all-students")
      console.log(response.data);
      this.og_students = response.data;
      if(response.data.length > 50){
        this.students = response.data.slice(0,50)
      }else{
        this.students = response.data;
      }
      this.loading = false
    
    },
    async allClaszs() {
      var response = await axios.get(this.$store.state.api_url + "/class")
        //console.log(response.data);
        this.allclass = response.data;
    },
    levelSelected() {
      var og_students = this.og_students;
      var allcls = this.allclass;
      var level_id = this.level_id;
      //alert(level_id)
      if(level_id == 0){
        this.students = og_students
        this.clasz = []
        this.class_id = 0
      }else{
        this.clasz = allcls.filter((i) => i.level_id == level_id);
        var bf_students = og_students.filter((i) => i.level_id == level_id);
        //bf_students = bf_students.sort((a, b) => a.gender - b.gender);
        this.students = bf_students.sort((a, b) => a.first_name > b.first_name ? 1 : -1);
      }
    },
    classSelected(){
      //this.search_class = false;
      var og_students = this.og_students
      var level_id = this.level_id;
      var class_id = this.class_id
      
      if(class_id == 0){
        this.students = og_students.filter((i) => i.level_id == level_id);
      }else{
        var students = og_students.filter((i) => i.level_id == level_id);

        students = students.filter((i) => i.classroom_id == class_id);

        //students = students.sort((a, b) => a.gender - b.gender);

        this.students = students.sort((a, b) => a.first_name > b.first_name ? 1 : -1);
      }
    },

    },
      computed:{
    },
    created() {
    this.isAuth();
    this.allClaszs();    
    this.allLevel();
    this.allStudents();
    
  },
  }
</script>
