<template>
    <div class="midde_cont">
        <div class="container-fluid">
            <div class="row column_title">
                <div class="col-md-12">
                    <div class="page_title">
                        <h2>Teachers List</h2>
                    </div>
                </div>
            </div>
  
            <!--add payments-->
            <div class="row column4 graph">
                <div class="col-sm-12">
                    <div class="white_shd full margin_bottom_30">
                        <div class="full graph_head">
                            <div class="d-flex justify-content-between">
                                <div class="heading1 margin_0">
                                    <h2>Teachers</h2>
                                </div>
                                <button v-on:click="this.refleshPage" class="btn btn-success ml-0">
                                    Back
                                </button>
                            </div>
                        </div>
                        <div class="full progress_bar_inner m-3">
                            <div class="d-flex justify-content-left">
                                <div class="">
                                    <img src="/assets/images/layout_img/user.png" style="width: 130px; height: 140px"
                                        alt="" />
                                </div>
                                <div class="ml-3">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--contents heaa-->
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
    
  </template>
  
  <script>
  import axios from "axios";
  export default {
    data() {
      return {
        find_student: false,
        ////basic
        user_id:"",
        role_id:"",
        accademic_year: new Date().getFullYear(),
        student:{},
        search_index_no:"",
        index_no_erro:"",
      };
    },
    methods: {
    searchStudentIndex() {
      this.index_no_erro = ""
      var index_no = this.search_index_no

      if(index_no > 0 && index_no < 10000){
        
        axios.post(this.$store.state.api_url + "/search_student_info",{'index_no':index_no}).then((response) => {
        var student = response.data.student;

        if(student){
          this.student = student
          this.level_id = student.level_id
          this.find_student = true;
        }else{
          this.index_no_erro = "Not student found, Enter correct index no"
        }
        });
      
      }else{
        this.index_no_erro = "Enter correct index no "+this.search_index_no
      }
    },
    isAuth() {
    var user = localStorage.getItem("user");
    var token = localStorage.getItem("user_token");
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
    },
  };
  </script>
  