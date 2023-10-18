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
                  <div class="inbox-head">
                    <h3>Index Number</h3>
                    <form action="#" class="pull-right position search_inbox">
                      <div class="input-append">
                        <input
                          type="text"
                          class="sr-input"
                          placeholder="23-0000"
                        />
                        <button
                          v-on:click="this.studentExist"
                          class="btn sr-btn"
                          type="button"
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
                  v-on:click="this.studentExist"
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
                  <p>Index Number: 23-4321</p>
                  <p>Name: Sambokile Kindeki Komba</p>
                  <p>Class: Form II</p>
                  <p>Status: Continue</p>
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
export default {
  data() {
    return {
      find_student: false,
      balance: 12000,
      total_paid: 0,
      n_balance: "",
      fee: 0,
      fee_amount: 0,
      name: "",
      amount: "",
      payments: [],
    };
  },
  methods: {
    studentExist() {
      this.find_student = !this.find_student;
    },
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
  },
  computed: {
    newBalance() {
      this.n_balance = this.balance + this.total_paid;
      return 0;
    },
  },
};
</script>
