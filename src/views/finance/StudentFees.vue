<template>
  <div class="midde_cont">
    <div class="container-fluid">
      <div class="row column_title">
        <div class="col-md-12">
          <div class="page_title">
            <h2>Finance > Student Fees</h2>
          </div>
        </div>
      </div>
      <!--contents heaa-->
      <div class="row column4 graph">
        <div class="col-sm-12 col-md-5">
          <div class="white_shd full margin_bottom_30">
            <div class="full graph_head">
              <div class="d-flex justify-content-between">
                <div class="heading1 margin_0"><h2>Add Fee</h2></div>
                <!--button v-on:click="this.parentExist" class="btn btn-success ml-0">Add Parent</button-->
              </div>
            </div>
            <div class="full progress_bar_inner">
              <form @submit.prevent="addNewFee" class="p-3">
                <p v-for="error in errors" :key="error" class="text-danger">
                  {{ error[0] }}
                </p>
                <div class="form-group">
                  <label for="cname">Fee Name*</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="this.form.fee"
                    placeholder="Tuition Fees"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div class="form-group">
                  <label>Select Level*</label>
                  <select v-on:change="levelSelected()" class="form-control" required v-model="this.form.level_id">
                    <option
                      v-for="level in levels"
                      :key="level.id"
                      :value="level.id"
                    >
                      {{ level.level }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="famount">Amount TZS*</label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="this.form.amount"
                    min="1"
                    placeholder="230000"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div class="form-group">
                  <label>Select Status*</label>
                  <select v-on:change="levelSelected()" class="form-control" required v-model="this.form.fstatus">
                    <option
                      v-for="fstatus in fstatuses"
                      :key="fstatus.id"
                      :value="fstatus.id"
                    >
                      {{ fstatus.status }}
                    </option>
                  </select>
                </div>
                <!--div class="form-group">
                  <label for="famount">Payment Duration*</label>
                  <select
                    v-model="this.form.duration"
                    v-on:change="payDuration()"
                    class="form-control"
                    required
                  >
                  <option class="text-capitalize" value="1">1</option>
                  <option class="text-capitalize" value="2">2</option>
                  <option class="text-capitalize" value="3">3</option>
                  <option class="text-capitalize" value="4">4</option>
                  </select>
                </div>
                <div v-show="min_amount_bool" class="form-group">
                  <label for="famount">Minimum Amount*</label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="this.form.min_amount"
                    min="1"
                    placeholder="230000"
                    aria-describedby="emailHelp"
                  />
                </div-->
                <button :disabled="this.form.role_id != 4" class="btn btn-success">Submit</button>
              </form>
            </div>
          </div>
        </div>
        <div class="col-sm-12 col-md-12">
          <div class="white_shd full margin_bottom_30">
            <div class="full graph_head">
              <div class="d-flex justify-content-between">
                <div class="heading1 margin_0"><h2>Fees</h2></div>
                <!--button v-on:click="this.parentExist" class="btn btn-success ml-0">Add Parent</button-->
              </div>
            </div>
            <div class="full progress_bar_inner">
              <div class="row">
                <div class="col-md-12">
                  <div class="inbox-body">
                    <div class="mail-option">
                      <div v-if="this.loading" class="container mt-5 mb-5">
                          <div class="row">
                            <div class="span2"></div>
                            <div class="span4">
                              <img class="center-block" width="500" src="/assets/images/loading/cupertino.gif" alt="#" />
                            </div>
                            <div class="span4"></div>
                          </div>
                      </div>
                      <table v-if="!this.loading" class="table table-responsive-sm table-hover">
                        <thead>
                          <th><b>Fee Name</b></th>
                          <th><b>Amount</b></th>
                          <th><b>Level</b></th>
                          <th><b>Status</b></th>
                          <th style="width:100px"><b>Action</b></th>
                        </thead>
                        <tbody>
                          <tr v-for="fee in fees" :key="fee.id" class="">
                            <td class="">
                              {{ fee.fee }}
                            </td>
                            <td class="">
                              {{ fee.amount }}
                            </td>
                            <td class="">
                              {{ fee.level }}
                            </td>
                            
                            <td v-if="fee.status == 3" class="text-danger">
                               <span></span>{{ fee.status_label }}
                            </td>
                            <td v-if="fee.status == 2" class="text-info">
                              {{ fee.status_label }}
                            </td>
                            <td v-if="fee.status == 1" class="">
                              {{ fee.status_label }}
                            </td>
                           
                            <td class="view-message" >
                              <button :disabled="this.form.role_id != 4"
                                @click="
                                  getEdit(
                                    fee.id,
                                    fee.fee,
                                    fee.amount,
                                    fee.min_amount,
                                    fee.duration,
                                    fee.status
                                  )
                                "
                                class="btn btn-sm btn-primary mr-1"
                                data-toggle="modal"
                                data-target="#edit-modal"
                              >
                                <i class="fa fa-edit"></i>
                              </button>
                              <button :disabled="this.form.role_id != 4"
                                class="btn btn-sm btn-danger"
                                @click="deleteFee(fee.id, fee.fee)"
                              >
                                <i class="fa fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div v-if="!this.loading">
                        <div v-if="this.fees.length == 0" class="container">
                          <div class="row">
                            <div class="span2"></div>
                            <div class="span4">
                              <h5 class="text-capitalize text-danger">Not Fee Found</h5>
                            </div>
                            <div class="span4"></div>
                          </div>
                        </div>
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
    <!-- footer -->
    <div class="container-fluid">
      <div class="footer">
        <p>Copyright © 2023 Jitegemee MIS. All rights reserved.<br /></p>
      </div>
    </div>
  </div>
  <!-- The Modal -->
  <div class="modal fade" data-backdrop="static" data-keyboard="false" id="edit-modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title">Edit fee</h4>
          <button type="button" class="close" data-dismiss="modal">
            &times;
          </button>
        </div>
        <!-- Modal body -->
        <div class="modal-body">
          <form @submit.prevent="updateFee" class="p-3">
            <p v-for="error in edit_errors" :key="error" class="text-danger">
              {{ error[0] }}
            </p>
            <div class="form-group">
              <label for="cname">Fee Name*</label>
              <input
                type="text"
                class="form-control"
                v-model="this.edit_fee"
                placeholder="Tuition Fees"
                aria-describedby="emailHelp"
              />
            </div>
            <div class="form-group">
              <label for="famount">Amount TZS*</label>
              <input
                type="number"
                class="form-control"
                v-model="this.edit_amount"
                min="1"
                placeholder="230000"
                aria-describedby="emailHelp"
              />
            </div>
            <div class="form-group">
              <label>Select Status*</label>
              <select class="form-control" required v-model="this.edit_fstatus">
                <option
                  v-for="fstatus in fstatuses"
                  :key="fstatus.id"
                  :value="fstatus.id"
                >
                  {{ fstatus.status }}
                </option>
              </select>
            </div>
            <!--div class="form-group">
              <label for="famount">Payment Duration*</label>
              <select
                v-model="this.edit_duration"
                v-on:change="payEditDuration()"
                class="form-control"
                required
              >
              <option class="text-capitalize" value="1">1</option>
              <option class="text-capitalize" value="2">2</option>
              <option class="text-capitalize" value="3">3</option>
              <option class="text-capitalize" value="4">4</option>
              </select>
            </div-->
            <!--div>
              <div v-show="min_amount_edit_bool" class="form-group">
              <label for="famount">Minimum Amount*</label>
              <input
                type="number"
                class="form-control"
                v-model="this.edit_min_amount"
                min="1"
                placeholder="230000"
                aria-describedby="emailHelp"
              />
              </div>
            </div-->
            
            <!-- Modal footer -->
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
  <!-- end model popup -->
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      fees: [],
      levels: [],
      fstatuses:[],
      errors: [],
      edit_errors: [],
      loading:true,
      min_amount_bool:false,
      min_amount_edit_bool:false,
      form: {
        fee: "",
        amount: "",
        min_amount: "",
        duration: "",
        role_id: "",
        level_id: "",
        user_id: "",
        fstatus:""
      },
      fee_id: "",
      og_fee: "",
      edit_fee: "",
      edit_fstatus: "",
      edit_amount: "",
      edit_min_amount: "",
      edit_duration: "",
    };
  },
  methods: {

    allLevel() {
      axios.get(this.$store.state.api_url + "/all-levels").then((response) => {
        //console.log(response.data);
        var levels = response.data
        this.levels = levels;
      });
    },
    payDuration() {
      if (this.form.duration >= 2) {
        this.min_amount_bool = true;
      } else {
        this.min_amount_bool = false;
        this.min_amount = this.amount;
      }
    },
    payEditDuration() {
      if (this.edit_duration >= 2) {
        this.min_amount_edit_bool = true;
      } else {
        this.min_amount_edit_bool = false;
        this.edit_min_amount = this.edit_amount;
      }
    },
    allFees() {
      axios.get(this.$store.state.api_url + "/level-fees").then((response) => {
        //console.log(response.data);
        this.fees = response.data;
        this.loading = false;
      });
    },
    feeStatus() {
      axios.get(this.$store.state.api_url + "/fee-status").then((response) => {
        //console.log(response.data);
        this.fstatuses = response.data;
        
      });
    },
    getEdit(id, fee, amount, min_amount, duration,status) {
      this.edit_errors = [];
      this.fee_id = id;
      this.og_fee = fee;
      this.edit_fee = fee;
      this.edit_amount = amount;
      this.edit_min_amount = min_amount;
      this.edit_duration = duration;
      this.edit_fstatus = status;

      if (this.edit_duration >= 2) {
        this.min_amount_edit_bool = true;
      } else {
        this.min_amount_edit_bool = false;
      }
    },
    addNewFee() {
      this.errors = [];
      axios
        .post(this.$store.state.api_url + "/create-fee", this.form)
        .then((response) => {
          if (response.data.success) {
            this.fees = response.data.fees;
           
            var message = response.data.message;
            this.$toast.success(message,{duration: 7000,dismissible: true,})
          } else {
            this.errors = response.data.message;
          }
        })
        .catch((errors) => {
          var message = "Network or Server Errors";
          this.$toast.error(message,{duration: 7000,dismissible: true,})
        });
    },
    updateFee() {
      this.edit_errors = [];
      var data = {
        fee: this.edit_fee,
        amount: this.edit_amount,
        status: this.edit_fstatus,
        min_amount: this.edit_min_amount,
        duration: this.edit_duration,
        fee_id: this.fee_id,
        og_fee: this.og_fee,
        user_id: this.form.user_id,
        role_id: this.form.role_id,
      };
      axios
        .post(this.$store.state.api_url + "/update-fee", data)
        .then((response) => {
          if (response.data.success) {
            this.fees = response.data.fees;
           
            var message = response.data.message;
            this.$toast.success(message,{duration: 7000,dismissible: true,})
          } else {
            this.edit_errors = response.data.message;
          }
        })
        .catch((errors) => {
          var message = "Network or Server Errors";
          this.$toast.error(message,{duration: 7000,dismissible: true,})
        });
    },
    deleteFee(id, fee) {
      this.errors = [];
      var data = {
        fee_id: id,
        fee: fee,
        user_id: this.form.user_id,
        role_id: this.form.role_id,
      };
      axios
        .post(this.$store.state.api_url + "/delete-fee", data)
        .then((response) => {
          if (response.data.success) {
            this.fees = response.data.fees;
            var message = response.data.message;
            this.$toast.success(message,{duration: 7000,dismissible: true,})
          } else {
            var message = response.data.message;
            this.$toast.error(message,{duration: 7000,dismissible: true,})
          }
        })
        .catch((errors) => {
          //console.log(errors);
            var message = "Network or Server Errors";
            this.$toast.success(message,{duration: 7000,dismissible: true,})
        });
    },
    isAuth() {
      var user = localStorage.getItem("user");
      var token = localStorage.getItem("user_token");
      if (user && token) {
        user = JSON.parse(user);
        this.form.user_id = user.id;
        this.form.role_id = user.role_id;
      }
    },
  },
  created() {
    this.allFees();
    this.allLevel();
    this.feeStatus();
    this.isAuth();
    /*axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("user_token");*/
  },
};
</script>
