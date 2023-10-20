<template>
  <div class="midde_cont">
    <div class="container-fluid">
      <div class="row column_title">
        <div class="col-md-12">
          <div class="page_title">
            <h2>Finance > Student Payments</h2>
          </div>
        </div>
      </div>
      <!--contents heaa-->
      <div v-if="!find_student" class="row column4 graph">
        <div class="col-sm-6">
          <div class="white_shd full margin_bottom_30">
            <div class="full graph_head">
              <div class="d-flex justify-content-between">
                <div class="heading1 margin_0"><h2>Search Students</h2></div>
                <!--button v-on:click="this.parentExist" class="btn btn-success ml-0">Add Parent</button-->
              </div>
            </div>
            <div class="full progress_bar_inner">
              <div class="row">
                <div class="col-md-12">
                  <p class="pt-3 text-danger text-center">{{ this.index_no_erro }}</p>
                  <div class="inbox-head">
                    <h3>Index Number</h3>
                    <form @submit.prevent="searchStudentIndex" class="pull-right position search_inbox">
                      <div class="input-append">
                        <input
                          type="text"
                          minlength="4"
                          maxlength="4"
                          v-model="this.search_index_no"
                          class="sr-input"
                          placeholder="0001"
                        />
                        <button
                          class="btn sr-btn"
                          type="submit"
                        >
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
             

      <!--add payments-->
      <div v-if="find_student" class="row column4 graph">
        <div class="col-sm-6">
          <div v-if="prepare_payment" class="white_shd full margin_bottom_30">
            <div class="full graph_head">
              <div class="d-flex justify-content-between">
                <div class="heading1 margin_0"><h2>Prepare for Payments</h2></div>
                <!--button v-on:click="this.parentExist" class="btn btn-success ml-0">Add Parent</button-->
              </div>
            </div>
            <div class="full progress_bar_inner">
              <div class="row">
                <div class="col-12">
                  <form @submit.prevent="checkRequiredFees" class="p-3">
                          <div class="form-group">
                            <label for="pgender">Accademic Year*</label>
                            <input
                              type="number"
                              maxlength="4"
                              minlength="4"
                              class="form-control"
                              v-model="this.accademic_year"
                              aria-describedby="emailHelp"
                              required
                            />
                          </div>
                          
                          <div class="form-group">
                      <label>Select Level*</label>
                      <select required v-on:change="levelClass()" class="form-control" v-model="this.level_id">
                        <option
                          v-for="level in levels"
                          :key="level.id"
                          :value="level.id"
                          
                        >
                          {{ level.level }}
                        </option>
                      </select>
                    </div>

                    <div v-show="clasz" class="form-group">
                      <label>Select Class*</label>
                  <select class="form-control" v-model="this.selected_class">
                    <option
                      v-for="clas in clasz"
                      :key="clas.id"
                      :value="clas"
                    >
                      {{ clas.classname }}
                    </option>
                    </select>
                    </div>
                          <div class="form-group">
                            <label for="sgender">Admission Type*</label>
                            <select
                              v-model="this.admission_id"
                              class="form-control"
                              required
                            >
                            <option
                                class="text-capitalize"
                                v-for="adm_type in adm_types"
                                :key="adm_type.id"
                                :value="adm_type.id"
                              >
                                {{ adm_type.admission }}
                              </option>
                            </select>
                          </div>
                      <input
                        type="submit"
                        value="Check Required Fees"
                        class="btn btn-success"
                      />
                    </form>
                </div>
              </div>
            </div>
          </div>
          <div v-if="!prepare_payment" class="white_shd full margin_bottom_30">
            <div class="full graph_head">
              <div class="d-flex justify-content-between">
                <div class="heading1 margin_0"><h2>Add Payments</h2></div>
                <!--button v-on:click="this.parentExist" class="btn btn-success ml-0">Add Parent</button-->
              </div>
            </div>
            <div class="full progress_bar_inner">
              <div class="row">
                <div class="col-12">
                  <div class="pt-3 pr-3 pl-3 d-flex justify-content-between">
                    <h5 class="text-camelcase">Balance</h5>
                    <h5 class="text-camelcase">TZS: {{ student_balance.amount }}</h5>
                  </div>
                  <div class="p-3">
                    
                  <form @submit.prevent="addPayment">
                    <div class="row">
                      <div class="col-sm-12">
                        <div class="form-group">
                          <label  for="pfeez">Choose Fee Type</label>
                          <select
                            v-on:change="setPayAmount()"
                            v-model=" pay_selected_fee"
                            class="form-control"
                            @change="this.feeSelect"
                            id="pfeez"
                            required
                          >
                            <option  v-for="feepay in feepays" :key="feepay.id" :value="feepay">{{ feepay.fee }}</option>
                            
                          </select>
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label for="pay_amount">Amount (Tsh)</label>
                          <input
                            class="form-control"
                            type="number"
                            v-model="pay_amount"
                            name="fee_amount"
                            id="pay_amount"
                            required
                          />
                        </div>
                        
                      </div>
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label for="date_to">Valid To</label> 
                          <input
                            class="form-control"
                            type="date"
                            name="valid_to"
                            id="date_to"
                            v-model="pay_valid_to"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <button type="submit" class="btn btn-success">
                      Add Payments
                    </button>
                  </form>
                  <hr/>
                 </div> 
                  <h5 class="text-center">Fees and Contribution Required to be Paid</h5>
                  <!--table ya to pay feees-->
                  <div class="">
                    <div class="inbox-body">
                    <div class="mail-option">
                      <table class="table table-inbox table-hover">
                        <thead>
                          <th><b>Fee Name</b></th>
                          <th><b>Amount</b></th>
                          <th><b>Paid</b></th>
                        
                          <th style="width:20px"><b></b></th>
                        </thead>
                        <tbody>
                          <tr v-for="feepay in feepays" :key="fee.id" class="">
                            <td class="">
                              {{ feepay.fee }}
                            </td>
                            <td class="">
                              {{ feepay.amount }}
                            </td>
                            <td class="">
                              {{ feepay.paid_amount }}
                            </td>
                            <td class="view-message" >
                              <div>
                                <i v-if="feepay.status == 0" class="fa fa-exclamation-triangle text-danger"></i>
                                <i v-else class="fa fa-check text-success"></i>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                       
                      </table>
                     
                    </div>
                    
                  </div>
                
                  </div>
                  
                  <h5 class="text-center">Add other Required Fees to be Paid</h5>
                  <!--table ya to add feees-->
                  <div class="">
                    <div class="inbox-body">
                    <div class="mail-option">
                      <table class="table table-inbox table-hover">
                        <thead>
                          <th><b>Fee Name</b></th>
                          <th><b>Amount</b></th>
                    
                        
                          <th style="width:50px"><b></b></th>
                        </thead>
                        <tbody>
                          <tr v-for="feepay in o_fees" :key="feepay.id" class="">
                            <td class="">
                              {{ feepay.fee }}
                            </td>
                            <td class="">
                              {{ feepay.amount }}
                            </td>
                           
                            <td class="view-message" >
                              <div>
                                <button @click="addFeeToStudent(feepay.id, feepay.amount)" class="btn btn-success"><i class="fa fa-plus"></i>Add Fee</button>
                              </div>
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
        <div class="col-sm-6">
          <!--deposit slip-->
          <div v-if="!prepare_payment" class="white_shd full margin_bottom_30">
            <div class="full graph_head">
              <div class="d-flex justify-content-between">
                <div class="heading1 margin_0"><h2>Deposit Slip</h2></div>
              </div>
            </div>
            <div class="full progress_bar_inner">
              <form @submit.prevent="updateClass" class="p-3">
            <p v-for="error in edit_errors" :key="error" class="text-danger">
              {{ error[0] }}
            </p>
            <div class="form-group">
              <label for="damount">Amount*</label>
              <input
                type="text"
                id="damount"
                min="1000"
                class="form-control"
                v-model="this.deposit_amount"
                required
              />
            </div>
            <div class="form-group">
              <label for="dnumber">Transaction No*</label>
              <input
                type="text"
                id="dnumber"
                class="form-control"
                v-model="this.deposit_number"
                required
              />
            </div>
            <div class="form-group">
              <label for="ddescription">Description*</label>
              <textarea required class="form-control" v-model="this.deposit_description" id="ddescription" rows="3">
              </textarea>
            </div>
              <button type="submit" class="btn btn-success">Add Slip</button>
          </form>
            </div>
          </div>    
          <!--student details-->
          <div class="white_shd full margin_bottom_30">
            <div class="full graph_head">
              <div class="d-flex justify-content-between">
                <div class="heading1 margin_0"><h2>Students Found</h2></div>
                <button
                  v-on:click="this.refleshPage"
                  class="btn btn-success ml-0"
                >
                  Back
                </button>
              </div>
            </div>
            <div class="full progress_bar_inner m-3">
              <div class="d-flex justify-content-left">
                <div class="">
                  <img
                    src="/assets/images/layout_img/user.png"
                    style="width: 130px; height: 140px"
                    alt=""
                  />
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
      <!--contents heaa-->
    </div>
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
      prepare_payment: true,
      ////futa chini
      balance: 12000,
      total_paid: 0,
      n_balance: "",
      fee: 0,
      fee_amount: 0,
      name: "",
      amount: "",
      payments: [],
      p_fees:[],
      o_fees:[],
      ////above futa
      user_id:"",
      role_id:"",
      accademic_year: new Date().getFullYear(),
      student:{},
      levels: [],
      claszs: [],
      clasz: [],
      adm_types:[],
      selected_class:{},
      level_id:"",
      search_index_no:"",
      index_no_erro:"",
      admission_id:"",
      feepays:[],
      o_fees:[],
      student_balance:{'amount':0},
      ////deposite slip
      deposit_amount:"",
      deposit_description:"",
      deposit_number:"",
      ///////add payment
      pay_selected_fee:{},
      pay_amount:"",
      pay_valid_to:""
    };
  },
  methods: {
    levelClass() {
        console.log(this.clasz)
        let level = this.levels.find((i) => i.id === this.level_id);
        let clazs = this.claszs.filter((i) => i.level === level.level);
        this.clasz = clazs;
        console.log(this.clasz)
    },
    getAdmissionType() {
      axios.get(this.$store.state.api_url + "/admissions").then((response) => {
        //console.log(response.data);
        this.adm_types = response.data;
      });
    },
    refleshPage(){
      window.location.reload();
    },
    searchStudentIndex() {
      this.index_no_erro = ""
      var index_no = this.search_index_no

      if(index_no > 0 && index_no < 10000){
        
        axios.post(this.$store.state.api_url + "/search_student_index_no",{'index_no':index_no}).then((response) => {
        var student = response.data.student;

        if(student){
          this.student = student
          this.level_id = student.level_id
          if(student.level_id == 0){
            this.selected_class = {}
            this.admission_id = student.admission
            this.find_student = !this.find_student;
          }else{
            this.admission_id = student.admission
            let level = this.levels.find((i) => i.id === this.level_id);
            let clazs = this.claszs.filter((i) => i.level === level.level);

            this.clasz = clazs;
            let clas = clazs.find((i) => i.id === student.classroom_id);
            this.selected_class = clas

            this.find_student = !this.find_student;
          }
        }else{
          this.index_no_erro = "Not student found, Enter correct index no"
        }
        });
      
      }else{
        this.index_no_erro = "Enter correct index no "+this.search_index_no
      }
    },
    checkRequiredFees(){

        var class_id = this.selected_class.id;
        var fees = this.selected_class.fees;
        var student_id = this.student.id;
        var user_id = this.user_id;
        var role_id = this.role_id;
        var level_id = this.level_id;
        var admission_id = this.admission_id;
        var year = this.accademic_year

        axios.post(this.$store.state.api_url + "/check_required_fees",{student_id,class_id,year,fees,level_id,user_id,role_id,admission_id}).then((response) => {
        console.log(response.data);
        if (response.data.success) {
            this.feepays = response.data.feepay;
            this.o_fees = response.data.o_fees;
            this.student_balance = response.data.student_balance;
            this.prepare_payment = false;
        } else {
            alert(response.data.message);
        }

        }).catch((errors) => {
          console.log(errors);
          alert("Something goes wrong try again");
        });

    },
    setPayAmount(){
      this.pay_amount = this.pay_selected_fee.amount - this.pay_selected_fee.paid_amount
    },
    addPayment(){
      alert('wowowowowowowo')
    },
    addFeeToStudent(fee_id, fee_amount){
      
      var class_id = this.selected_class.id;
        var fees = this.selected_class.fees;
        var student_id = this.student.id;
        var user_id = this.user_id;
        var role_id = this.role_id;
        var level_id = this.level_id;
        var admission_id = this.admission_id;
        var year = this.accademic_year

        axios.post(this.$store.state.api_url + "/check_required_fees",{student_id,class_id,year,fees,level_id,user_id,role_id,admission_id}).then((response) => {
        console.log(response.data);
        if (response.data.success) {
            this.feepays = response.data.feepay;
            this.o_fees = response.data.o_fees;
        } else {
            alert(response.data.message);
        }

        }).catch((errors) => {
          console.log(errors);
          alert("Something goes wrong try again");
        });
    },
    allLevel() {
      axios.get(this.$store.state.api_url + "/levels").then((response) => {
        //console.log(response.data);
        this.levels = response.data;
      });
    },
    allClaszs() {
      axios.get(this.$store.state.api_url + "/class").then((response) => {
        console.log(response.data);
        this.claszs = response.data;
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
  },
  created() {
   
    this.getAdmissionType();
    this.allLevel();
    this.allClaszs();
    this.isAuth();
  },
};
</script>
