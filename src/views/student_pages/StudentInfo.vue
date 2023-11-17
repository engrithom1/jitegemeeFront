<style>
.img-student{
    width: 80px;
    height: 80px;
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
                <div class="col-sm-6">
                    <div v-if="this.search_loading" class="container mt-5 mb-5">
                        <div class="row">
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
                                            <h6 class="text-center mt-3">Cretated at:<br/>{{this.to_date}}</h6>
                                        </div>
                                       <div class="col-12">
                                        
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
                                       <div class="col-12">
                                        
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
                                                <strong>Entry Type : </strong>{{ admission.entry }} <span v-if="admission.entry_id == 2"> <strong>From</strong> {{admission.school_from}}<strong> Reason </strong> {{admission.transfer_reason }}</span><br>  
                                                
                                             </p>
                                          </div>
                                       </div>
                                       <div class="col-12">
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
                                            <th width="200px">Qty</th>
                                            <th>Product</th>
                                            <th>Serial #</th>
                                            <th width="600px !important">Description</th>
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
                                        <p class="text-capitalize">Index Number: </p>
                                        <p class="text-capitalize">Name: </p>
                                        <p class="text-capitalize">Admmited Year: </p>
                                        <p class="text-capitalize">Status: </p>
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
                                        <p class="text-capitalize">Index Number: </p>
                                        <p class="text-capitalize">Name:</p>
                                        <p class="text-capitalize">Admmited Year: </p>
                                        <p class="text-capitalize">Status: </p>
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
  import axios from "axios"
  import jspdf from "jspdf"

  export default {
    data() {
      return {
        find_student: false,
        find_btn: false,
        search_loading:false,
        parent_loading:true,
        admission_loading:true,
        print_personal_info:false,
        ////basic
        user_id:"",
        role_id:"",
        accademic_year: new Date().getFullYear(),
        student:{},
        admission:{},
        parent:{},
        search_index_no:"",
        index_no_erro:"",
        to_date:"",
      };
    },
    methods: {
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
        const html = document.getElementById('personal_info').innerHTML

        doc.html(html, {
            callback: function(doc) {
                // Save the PDF
                doc.save(reg_no+"_persoanl_info.pdf");
            },
            x: 15,
            y: 15,
            width: 170, //target width in the PDF document
            windowWidth: 650 //window width in CSS pixels
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
  