<template>
    <div class="midde_cont">
        <div class="container-fluid">
            <div class="row column_title">
                <div class="col-md-12">
                    <div class="page_title">
                        <h2>Control Setting</h2>
                    </div>
                </div>
            </div>
  
            <!--exams controll-->
            <div class="row column4 graph">
                <div class="col-sm-12 col-md-6">
                    <div class="white_shd full margin_bottom_30">
                        <div class="full graph_head"> 
                          <div class="heading1 margin_0">
                              <h2>Exams Controls</h2>
                          </div>  
                        </div>
                        <div class="full progress_bar_inner">
                          <div class="row">
                            <div class="col-md-12">
                              <div class="inbox-body">
                                <div class="mail-option">
                                      <div v-if="this.exams_loading" class="container mt-5 mb-5">
                                          <div class="row">  
                                            <div class="span3">
                                              <img class="center-block" width="500" src="/assets/images/loading/cupertino.gif" alt="#" />
                                            </div>
                                            <div class="span4"></div>
                                          </div>
                                      </div>
                                      <div>
                                        <table v-if="!this.exams_loading" class="table table-hover">
                                          <thead>
                                            <th><b>Exams Name</b></th>
                                            <th><b>Status Label</b></th>
                                            <th v-if="this.role_id == 4"><b>Action</b></th>
                                          </thead>
                                          <tbody>
                                            <tr v-for="exam in exams" :key="exam.id" class="">
                                              <td class="text-capitalize">
                                                {{ exam.examname }}
                                              </td>
                                              <td v-if="exam.status == 'active'" class="text-capitalize text-success">
                                                Exam Allowed
                                              </td>
                                              <td v-if="exam.status == 'deactive'" class="text-capitalize text-danger">
                                                Exam Not Allowed
                                              </td>
                                              
                                              <td class="view-message" v-if="this.role_id == 4">
                                                <button v-if="exam.status == 'deactive'" :disabled="this.edit_btns"
                                                  @click="editExamStatus(exam.id, 'active')"
                                                  class="btn btn-sm btn-success mr-1"
                                                  data-toggle="modal"
                                                  data-target="#edit-modal"
                                                >
                                                  <i class="fa fa-edit"></i>
                                                  Activate
                                                </button>

                                                <button v-if="exam.status == 'active'" :disabled="this.edit_btns"
                                                  @click="editExamStatus(exam.id, 'deactive')"
                                                  class="btn btn-sm btn-danger mr-1"
                                                  data-toggle="modal"
                                                  data-target="#edit-modal"
                                                >
                                                  <i class="fa fa-edit"></i>
                                                  De-Activate
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
        exams_loading: true,
        edit_btns:false,
        exams:[],
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
    editExamStatus(id,status){

      var user_id = this.user_id
      var role_id = this.role_id
      this.edit_btns = true
      axios.post(this.$store.state.api_url + "/change-exam-status",{id,status,role_id,user_id}).then((response) => {
        //console.log(response.data);
        if(response.data.success){

          this.exams = response.data.exams

          var message = response.data.message;
          this.$toast.success(message,{duration: 7000,dismissible: true,})
        }else{
          var message = response.data.message;
          this.$toast.error(message,{duration: 7000,dismissible: true,})
        }
       
        
      }).catch((errors) => {
          var message = "Network or Server Errors";
          this.$toast.error(message,{duration: 7000,dismissible: true,})
      });
      this.edit_btns = false
    },
    allExams() {
      axios.get(this.$store.state.api_url + "/exams").then((response) => {
        //console.log(response.data);
        this.exams = response.data
        this.exams_loading = false
      }).catch((errors) => {
          var message = "Network or Server Errors";
          this.$toast.error(message,{duration: 7000,dismissible: true,})
      });
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
      this.allExams();
    },
  };
  </script>
  