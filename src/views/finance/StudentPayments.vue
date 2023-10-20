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
      <div v-show="!find_student" class="row column4 graph">
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
      <div v-show="find_student" class="row column4 graph">
        <div class="col-sm-6">
          <div class="white_shd full margin_bottom_30">
            <div class="full graph_head">
              <div class="d-flex justify-content-between">
                <div class="heading1 margin_0"><h2>Prepare for Payments</h2></div>
                <!--button v-on:click="this.parentExist" class="btn btn-success ml-0">Add Parent</button-->
              </div>
            </div>
            <div class="full progress_bar_inner">
              <div class="row">
                <div class="col-12 p-3">
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
          <div class="white_shd full margin_bottom_30">
            <div class="full graph_head">
              <div class="d-flex justify-content-between">
                <div class="heading1 margin_0"><h2>Add Payments</h2></div>
                <!--button v-on:click="this.parentExist" class="btn btn-success ml-0">Add Parent</button-->
              </div>
            </div>
            <div class="full progress_bar_inner">
              <div class="row">
                <div class="col-12">
                  <div class="p-3">
                    <div class="form-group">
                      <label>Total Paid (Tsh)</label>
                      <input
                        class="form-control"
                        type="number"
                        v-model="total_paid"
                        name="total_paid"
                        id=""
                      />
                    </div>
                    <div class="form-group">
                      <label>Balance (Tsh)</label>
                      <input
                        class="form-control"
                        type="number"
                        v-model="balance"
                        name="balance"
                        disabled
                        id=""
                      />
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label>Fee Type</label>
                          <select
                            name="fee"
                            v-model="fee"
                            class="form-control"
                            @change="this.feeSelect"
                            id="pgender"
                          >
                            <option value="0">Select Fee</option>
                            <option
                              v-bind:value="
                                JSON.stringify({
                                  label: 'Tuition Fee',
                                  amount: 200000,
                                })
                              "
                            >
                              Tuition Fee
                            </option>
                            <option
                              v-bind:value="
                                JSON.stringify({
                                  label: 'Food',
                                  amount: 120000,
                                })
                              "
                            >
                              Food
                            </option>
                            <option
                              v-bind:value="
                                JSON.stringify({
                                  label: 'Liblaly',
                                  amount: 30000,
                                })
                              "
                            >
                              Libraly fee
                            </option>
                            <option
                              v-bind:value="
                                JSON.stringify({
                                  label: 'Registration Fee',
                                  amount: 10000,
                                })
                              "
                            >
                              Registration fee
                            </option>
                          </select>
                        </div>
                        <div class="form-group">
                          <label>Valid From</label>
                          <input
                            class="form-control"
                            type="date"
                            name="valid_to"
                            id=""
                          />
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label>Amount (Tsh)</label>
                          <input
                            class="form-control"
                            type="number"
                            v-model="fee_amount"
                            name="fee_amount"
                            id=""
                          />
                        </div>
                        <div class="form-group">
                          <label>To</label>
                          <input
                            class="form-control"
                            type="date"
                            name="valid_to"
                            id=""
                          />
                        </div>
                      </div>
                    </div>

                    <div class="form-group">
                      <label>New Balance (Tsh {{ this.newBalance }})</label>
                      <input
                        class="form-control"
                        type="number"
                        v-model="n_balance"
                        disabled
                        id=""
                      />
                    </div>
                    <button @click="this.onPayment" class="btn btn-success">
                      Add Payments
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
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
      <div v-if="payments.length > 0" class="row column4 graph">
        <div class="col-12">
          <div class="white_shd full margin_bottom_30">
            <div class="full progress_bar_inner">
              <div class="row">
                <div class="col-md-12">
                  <div class="inbox-body">
                    <div class="mail-option">
                      <div class="btn-group hidden-phone">
                        <button
                          @click="this.completePayments"
                          class="btn btn-info"
                        >
                          Complete Payments
                        </button>
                      </div>

                      <table class="table table-inbox table-hover">
                        <thead>
                          <th><b>Fee Name</b></th>
                          <th><b>Amount</b></th>
                          <th><b>Valid From</b></th>
                          <th><b>Valid To</b></th>
                          <th><b>Action</b></th>
                        </thead>
                        <tbody>
                          <tr
                            v-for="payment in payments"
                            :key="payment.amount"
                            class=""
                          >
                            <td class="view-message">{{ payment.name }}</td>
                            <td class="view-message">{{ payment.amount }}</td>
                            <td class="view-message">23-3489</td>
                            <td class="view-message inbox-small-cells">
                              Sambokile kandenga kindeki
                            </td>
                            <td class="view-message">
                              <button class="btn btn-danger mr-1">
                                <i class="fa fa-trash"></i>
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
      ////futa chini
      find_student: false,
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
      admission_id:""
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

        //this.students = response.data.students;
        //this.subjects = response.data.subjects;
        //this.hosted = response.data.hosted;

        //this.find_clas = !this.find_clas
        });

    },
    ///zakufuta izoooooooooo
    completePayments() {
      alert("Payments Completed Successfull !");
      this.find_student = !this.find_student;
      this.payments = [];
    },
    onPayment() {
      this.n_balance = this.total_paid - this.fee_amount;
      var name = this.name;
      var amount = this.amount;

      //alert(name+", "+amount)

      this.payments = [...this.payments, { name, amount }];
    },
    feeSelect() {
      var selectedFee = JSON.parse(this.fee);
      //console.log(selectedFee)
      this.fee_amount = selectedFee.amount;
      this.name = selectedFee.label;
      this.amount = selectedFee.amount;
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
  computed: {
    newBalance() {
      this.n_balance = this.balance + this.total_paid;
      return 0;
    },
  },
};
</script>
