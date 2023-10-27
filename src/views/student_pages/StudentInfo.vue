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
            <div v-if="!find_student" class="row column4 graph">
                <div class="col-sm-6">
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
                                                <input type="text" minlength="4" maxlength="6"
                                                    v-model="this.search_index_no" class="sr-input"
                                                    placeholder="0001" />
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
            </div>
  
  
           
            <div class="" v-if="find_student">
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
                                    <div class="row  m-3">
                                       <div class="col-md-4">
                                          <div class="full invoice_blog">
                                             <h4>Personal</h4>
                                             <p><strong>Pluto Admin</strong><br>  
                                                427 Schoen Circles Suite 124<br> 
                                                Melbourne Australia<br>    
                                                <strong>Phone : </strong><a href="tel:9876543210">9876 543 210</a><br>  
                                                <strong>Email : </strong><a href="mailto:yourmail@gmail.com">Yourmail@gmail.com</a>
                                             </p>
                                          </div>
                                       </div>
                                       <div class="col-md-4">
                                          <div class="full invoice_blog">
                                             <h4>Admission</h4>
                                             <p><strong>David Roman</strong><br>  
                                                427 Schoen Circles Suite 124<br> 
                                                Melbourne Australia<br>    
                                                <strong>Phone : </strong><a href="tel:9876543210">9876 543 210</a><br>  
                                                <strong>Email : </strong><a href="mailto:yourmail@gmail.com">Yourmail@gmail.com</a>
                                             </p>
                                          </div>
                                       </div>
                                       <div class="col-md-4">
                                          <div class="full invoice_blog">
                                             <h4>Parents </h4>
                                             <p><strong>Order ID : </strong>5b6R9C<br> 
                                                <strong>Payment Due : </strong>July/18/2018<br> 
                                                <strong>Account : </strong>254-55847
                                             </p>
                                          </div>
                                       </div>
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
                            <div class="full">
                                 <div class="invoice_inner">
                                    <div class="row">
                                       <div class="col-md-4">
                                          <div class="full invoice_blog padding_infor_info padding-bottom_0">
                                             <h4>From</h4>
                                             <p><strong>Pluto Admin</strong><br>  
                                                427 Schoen Circles Suite 124<br> 
                                                Melbourne Australia<br>    
                                                <strong>Phone : </strong><a href="tel:9876543210">9876 543 210</a><br>  
                                                <strong>Email : </strong><a href="mailto:yourmail@gmail.com">Yourmail@gmail.com</a>
                                             </p>
                                          </div>
                                       </div>
                                       <div class="col-md-4">
                                          <div class="full invoice_blog padding_infor_info padding-bottom_0">
                                             <h4>To</h4>
                                             <p><strong>David Roman</strong><br>  
                                                427 Schoen Circles Suite 124<br> 
                                                Melbourne Australia<br>    
                                                <strong>Phone : </strong><a href="tel:9876543210">9876 543 210</a><br>  
                                                <strong>Email : </strong><a href="mailto:yourmail@gmail.com">Yourmail@gmail.com</a>
                                             </p>
                                          </div>
                                       </div>
                                       <div class="col-md-4">
                                          <div class="full invoice_blog padding_infor_info padding-bottom_0">
                                             <h4>Invoice No - #111457 </h4>
                                             <p><strong>Order ID : </strong>5b6R9C<br> 
                                                <strong>Payment Due : </strong>July/18/2018<br> 
                                                <strong>Account : </strong>254-55847
                                             </p>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                            </div>
                            <div class="full padding_infor_info">
                                <div class="table_row">
                                <div class="table-responsive">
                                    <table class="table table-striped">
                                        <thead>
                                            <tr>
                                            <th>Qty</th>
                                            <th>Product</th>
                                            <th>Serial #</th>
                                            <th>Description</th>
                                            <th>Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                            <td>1</td>
                                            <td>Product One</td>
                                            <td>005-475-321</td>
                                            <td>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</td>
                                            <td>$20.00</td>
                                            </tr>
                                            <tr>
                                            <td>2</td>
                                            <td>Product Two</td>
                                            <td>015-475-321</td>
                                            <td>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</td>
                                            <td>$25.00</td>
                                            </tr>
                                            <tr>
                                            <td>3</td>
                                            <td>Product Three</td>
                                            <td>025-475-321</td>
                                            <td>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</td>
                                            <td>$20.00</td>
                                            </tr>
                                            <tr>
                                            <td>4</td>
                                            <td>Product Four</td>
                                            <td>035-475-321</td>
                                            <td>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</td>
                                            <td>$15.00</td>
                                            </tr>
                                            <tr>
                                            <td>5</td>
                                            <td>Product Five</td>
                                            <td>045-475-321</td>
                                            <td>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</td>
                                            <td>$25.00</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                </div>
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
                                <div class="d-flex justify-content-left">
                                    <div class="">
                                        <img src="/assets/images/layout_img/user.png" style="width: 130px; height: 140px"
                                            alt="" />
                                    </div>
                                    <div class="ml-3">
                                        <p class="text-capitalize">Index Number: S.1234.{{ student.index_no }}</p>
                                        <p class="text-capitalize">Name: {{ student.first_name+" "+student.middle_name+" "+student.last_name }}</p>
                                        <p class="text-capitalize">Admmited Year: {{ student.accademic_year }}</p>
                                        <p class="text-capitalize">Status: {{ student.status_name }}</p>
                                    </div>
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
                                <div class="d-flex justify-content-left">
                                    <div class="">
                                        <img src="/assets/images/layout_img/user.png" style="width: 130px; height: 140px"
                                            alt="" />
                                    </div>
                                    <div class="ml-3">
                                        <p class="text-capitalize">Index Number: S.1234.{{ student.index_no }}</p>
                                        <p class="text-capitalize">Name: {{ student.first_name+" "+student.middle_name+" "+student.last_name }}</p>
                                        <p class="text-capitalize">Admmited Year: {{ student.accademic_year }}</p>
                                        <p class="text-capitalize">Status: {{ student.status_name }}</p>
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
    
  </template>
  
  <script>
  import axios from "axios";
  export default {
    data() {
      return {
        find_student: false,
        find_btn: false,
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
    searchStudentInfo() {
      this.index_no_erro = ""

      var index_no = this.search_index_no

      if(index_no > 0 && index_no < 100000){
        this.find_btn = true,

        axios.post(this.$store.state.api_url + "/search_student_info",{'index_no':index_no}).then((response) => {
        
        if(response.data.success){
          this.student = response.data.student
          this.find_student = true
          this.find_btn = false
        }else{
          this.index_no_erro = "Not student found, Enter correct index no"
          this.find_btn = false
        }
        });
      
      }else{
        this.index_no_erro = "Enter correct index no "+this.search_index_no
        this.find_btn = false
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
  