<template>
  <div class="midde_cont">
    <div class="container-fluid">
      <div class="row column_title">
        <div class="col-md-12">
          <div class="page_title">
            <h2>Admission > Add Student</h2>
          </div>
        </div>
      </div>
      <!--contents heaa-->
      <div class="row column4 graph">
        <!--search parent-->
        <div class="col-md-12">
          <div v-if="!parent_exist" class="white_shd full margin_bottom_30">
            <div class="full graph_head">
              <div class="d-flex justify-content-between">
                <div class="heading1 margin_0"><h2>Search Parent</h2></div>
              </div>
            </div>
            <div class="full progress_bar_inner">
              <div class="row">
                <div class="col-md-12">
                  <div class="inbox-head">
                    <h3>found ({{ this.parents.length }})</h3>
                    <form
                      @submit.prevent="searchParent"
                      class="pull-right position search_inbox"
                    >
                      <p
                        v-for="error in search_errors"
                        :key="error"
                        class="text-danger"
                      >
                        {{ error }}
                      </p>
                      <div class="input-append">
                        <input
                          type="text"
                          class="sr-input"
                          v-model="this.search.search_parent"
                          placeholder="Search phone / name"
                          required
                        />
                        <button :disabled="this.loading" class="btn sr-btn" type="submit">
                          <i class="fa fa-search"></i>
                        </button>
                      </div>
                    </form>
                  </div>
                  <div class="inbox-body">
                    <div class="mail-option">
                      <div class="table-responsive-md w-100">

                        <div v-if="this.loading" class="container mt-5 mb-5">
                          <div class="row">
                            <div class="span2"></div>
                            <div class="span4">
                              <img class="center-block" width="500" src="/assets/images/loading/cupertino.gif" alt="#" />
                            </div>
                            <div class="span4"></div>
                          </div>
                        </div>

                        <table v-if="!this.loading" class="table table-hover">
                          <thead>
                            <th><b>Full Name</b></th>
                            <th><b>Phone</b></th>
                            <th><b>Action</b></th>
                          </thead>
                          <tbody>
                            <tr
                              v-if="parents"
                              v-for="parent in parents"
                              :key="parent.id"
                              class=""
                            >
                              <td class="">
                                {{
                                  parent.first_name +
                                  " " +
                                  parent.middle_name +
                                  " " +
                                  parent.last_name
                                }}
                              </td>
                              <td class="">{{ parent.phone }}</td>
                              <td class="">
                                <button
                                  v-on:click="
                                    selectParent(
                                      parent.id,
                                      parent.first_name,
                                      parent.middle_name,
                                      parent.last_name,
                                      parent.phone,
                                      parent.photo,
                                      parent.home_address,
                                      parent.gender
                                    )
                                  "
                                  class="btn btn-sm btn-primary btn-table mr-1"
                                >
                                  <i class="fa fa-user"></i> Select
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <div v-if="!this.loading">
                          <div v-if="this.parents.length == 0" class="container">
                            <div class="row">
                              <div class="span2"></div>
                              <div class="span4">
                                <h5 class="text-capitalize text-danger">Not Parent Found</h5>
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
        <!--student parent detail panel-->
        <div v-if="parent_exist" class="row">
          <div class="col-md-7">
            <div class="white_shd full margin_bottom_30">
              <div class="full graph_head">
                <div class="heading1 margin_0">
                  <h2>Student Details</h2>
                </div>
              </div>
              <div class="full progress_bar_inner">
                <div class="row">
                  <div class="col-sm-12 text-center">
                    <div class="form-group">
                      <p
                        v-for="error in errors"
                        :key="error"
                        class="text-danger"
                      >
                        {{ error[0] }}
                      </p>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <form @submit.prevent="addStudent" class="p-3">
                      <div class="row">
                        <div class="col-sm-6 col-md-6">
                          <div class="form-group">
                            <label for="sindex">PREM Number</label>
                            <input
                              type="text"
                              class="form-control"
                              v-model="this.form.prem_no"
                              placeholder="0000"
                              
                            />
                          </div>
                        </div>
                        <div class="col-sm-6 col-md-6">
                          <div class="form-group">
                            <label for="sindex">Admission Number* <span class="text-danger">{{ this.proposed_index_no }}</span></label>
                            <input
                              type="text"
                              class="form-control"
                              v-model="this.form.index_no"
                              minlength="6"
                              maxlength="6"
                              placeholder="400000"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="sfname">First Name*</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="this.form.first_name"
                          placeholder="john"
                          required
                        />
                      </div>
                      <div class="form-group">
                        <label for="smname">Middle Name*</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="this.form.middle_name"
                          placeholder="juvenal"
                          required
                        />
                      </div>
                      <div class="form-group">
                        <label for="slname">Last Name*</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="this.form.last_name"
                          placeholder="Bongo"
                          required
                        />
                      </div>
                      <div class="form-group">
                        <label for="shome">Residence*</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="this.form.home_address"
                          placeholder="Dege Kigamboni"
                          required
                        />
                      </div>
                      
                      <div class="row">
                        <div class="col-sm-12 col-md-6">
                          <div class="form-group">
                            <label for="sphone">Nationality*</label>
                            <input
                              type="text"
                              class="form-control"
                              v-model="this.form.nationality"
                              placeholder="Tanzania"
                              required
                            />
                          </div>
                          <div class="form-group">
                            <label for="sphone">Religion*</label>
                            <input
                              type="text"
                              class="form-control"
                              v-model="this.form.religion"
                              placeholder="free"
                              required
                            />
                          </div>
                          <div class="form-group">
                            <label for="sphone">Phone</label>
                            <input
                              type="text"
                              class="form-control"
                              v-model="this.form.phone"
                              placeholder="0768448525"
                              minlength="10"
                              maxlength="10"
                            />
                          </div>
                          <div class="form-group">
                            <label for="sdate">Birth Date*</label>
                            <input
                              type="date"
                              class="form-control"
                              v-model="this.form.birth_date"
                              aria-describedby="emailHelp"
                              required
                            />
                          </div>
                          <div class="form-group">
                            <label for="sdate">Birth Place*</label>
                            <input
                              type="text"
                              class="form-control"
                              v-model="this.form.birth_place"
                              aria-describedby="emailHelp"
                              required
                            />
                          </div>
                          <div class="form-group">
                          <label for="gender">Gender*</label>
                          <select
                            class="form-control"
                            v-model="this.form.gender"
                            id="gender"
                            required
                          >
                            <option class="text-capitalize" value="1">Male</option>
                            <option class="text-capitalize" value="2">Female</option>
                          </select>
                        </div>
                          <div class="form-group">
                            <label for="sgender">Relation To*</label>
                            <select
                              v-model="this.form.relation_to"
                              class="form-control"
                              required
                            >
                             
                              <option
                                class="text-capitalize"
                                v-for="relation in relations"
                                :key="relation.id"
                                :value="relation.id"
                              >
                                {{ relation.relation }}
                              </option>
                            </select>
                          </div>
                          <div class="form-group">
                            <label for="pgender">Parental Status*</label>
                            <select
                              v-model="this.form.parent_status_id"
                              class="form-control"
                              required
                            >
                              <option
                                class="text-capitalize"
                                v-for="parent_s in parent_ss"
                                :key="parent_s.id"
                                :value="parent_s.id"
                              >
                                {{ parent_s.parent_status }}
                              </option>
                            </select>
                          </div>
                          
                          
                        </div>
                        <div class="col-sm-12 col-md-6">
                          <div class="form-group">
                            <label for="sgender">Admission Type*</label>
                            <select
                              v-model="this.form.admission"
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
                          <div class="form-group">
                            <label for="sgender">Entry Type*</label>
                            <select
                              v-model="this.form.entry"
                              v-on:change="entryType()"
                              class="form-control"
                              required
                            >
                            <option
                                class="text-capitalize"
                                v-for="entry in entrys"
                                :key="entry.id"
                                :value="entry.id"
                              >
                                {{ entry.entry }}
                              </option>
                            </select>
                          </div>
                          <div v-if="!transfer_in" class="form-group">
                            <label for="sphone">Former School*</label>
                            <input
                              v-model="this.form.former_school"
                              type="text"
                              class="form-control"
                              required
                              placeholder="Msamala secondary"
                            />
                          </div>
                          <div v-if="transfer_in">
                            <div class="form-group">
                              <label for="sphone">School From*</label>
                              <input
                                v-model="this.form.school_from"
                                type="text"
                                class="form-control"
                                :required="this.transfer_in"
                                placeholder="Msamala secondary"
                              />
                            </div>
                            <div class="form-group">
                              <label for="exampleFormControlTextarea1"
                                >Reason for Transfer*</label
                              >
                              <textarea
                                class="form-control"
                                v-model="this.form.transfer_reason"
                                :required="this.transfer_in"
                                rows="3"
                                maxlength="200"
                                placeholder="follow parents"
                              ></textarea>
                            </div>
                          </div>
                          <!--img
                            class="mt-2"
                            src=""
                            id="s_photo"
                            style="width: 130px; height: 140px"
                            alt=""
                          />
                          <div class="form-group">
                            <label for="sphoto">Photo*</label>
                            <input
                              type="file"
                              class="form-control"
                              id="sphoto"
                              aria-describedby="emailHelp"
                            />
                          </div-->
                          <div class="form-group">
                            <label for="sgender">Hearth Status*</label>
                            <select
                              v-model="this.form.hearth"
                              class="form-control"
                              required
                            >
                            <option
                                v-for="health in healths"
                                :key="health.id"
                                :value="health.id"
                              >
                                {{ health.health }}
                              </option>
                            </select>
                          </div>
                          <div class="form-group">
                            <label for="pgender">Accademic Year*</label>
                            <input
                              type="number"
                              :max="this.c_year+1"
                              :min="this.c_year-1"
                              maxlength="4"
                              minlength="4"
                              class="form-control"
                              :placeholder="this.c_year"
                              v-model="this.form.accademic_year"
                              aria-describedby="emailHelp"
                              required
                            />
                          </div>
                          <div class="form-group">
                            <label for="pgender">Level*</label>
                            <select
                              class="form-control"
                              v-on:change="levelClass()"
                              v-model="this.form.level_id"
                              required
                            >
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
                            <label for="pgender">Class*</label>
                            <select
                              :disabled="this.class_disabled"
                              v-model="this.form.classroom_id"
                              class="form-control"
                              required
                            >
                              <option
                                v-for="clasz in clazzs"
                                :key="clasz.id"
                                :value="clasz.id"
                              >
                                {{ clasz.classname }}
                              </option>
                            </select>
                          </div>
                          
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="exampleFormControlTextarea1"
                          >Physical disabilities and Behavior</label
                        >
                        <textarea
                          class="form-control"
                          v-model="this.form.behavior"
                          rows="3"
                          placeholder="Hana tatizo la kiafya. nimtoro ingawa maendeleo yake siomabaya"
                        ></textarea>
                      </div>
                      <input
                        type="submit"
                        value="Submit"
                        class="btn btn-success"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-5">
            <div class="white_shd full margin_bottom_30">
              <div class="full graph_head">
                <div class="d-flex justify-content-between">
                  <div class="heading1 margin_0"><h2>Parent Details</h2></div>
                  <button
                    v-on:click="this.selectBack"
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
                    <p>
                      Name:
                      {{
                        this.parent.first_name +
                        " " +
                        this.parent.middle_name +
                        " " +
                        this.parent.last_name
                      }}
                    </p>
                    <p>Phone: {{ this.parent.phone }}</p>
                    <p>Home Address: {{ this.parent.home_address }}</p>
                    <p>Gender: {{ this.parent.gender }}</p>
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
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      parent_exist: false,
      transfer_in: false,
      class_disabled: true,
      c_year: new Date().getFullYear(),
      proposed_index_no:"433123",
      genders:[],
      entrys:[],
      healths:[],
      levels: [],
      claszs: [],
      clazzs: [],
      parent: {},
      parents: [],
      parent_ss: [],
      errors: [],
      relations: [],
      adm_types:[],
      search_errors: [],
      fees:[],
      loading:true,
      search: {
        search_parent: "",
      },
      form: {
        email: "",
        index_no: "",
        prem_no:'0',
        first_name: "",
        last_name: "",
        middle_name: "",
        gender: "",
        phone: "",
        religion: "",
        birth_place: "",
        former_school: "",
        home_address: "",
        nationality: "",
        accademic_year: "",
        regist_year: new Date().getFullYear(),
        birth_date: "",
        behavior: "",
        hearth: "",
        photo: "man.png",
        school_from: "",
        transfer_reason: "",
        relation_to: "",
        level_id: 0,
        classroom_id: 0,
        user_id: "",
        parent_status_id:"",
        role_id: "",
        entry: "",
        admission: "",
        department_id: "" 
      },
    };
  },
  methods: {
    async allFees() {
      var response = await axios.get(this.$store.state.api_url + "/level-fees")
        //console.log(response.data);
        this.fees = response.data;
    },
    async proposedIndexNo(){
      var response = await axios.get(this.$store.state.api_url + "/proposed-index-no")
        //console.log(response.data);
        this.proposed_index_no = response.data; 
    },
    selectParent(
      id,
      first_name,
      middle_name,
      last_name,
      phone,
      photo,
      home_address,
      gender
    ) {
      this.parent = {
        id,
        first_name,
        middle_name,
        last_name,
        phone,
        photo,
        home_address,
        gender,
        
      };
      this.parent_exist = true;
    },
    selectBack() {
      this.parent_exist = false;
      this.parent = {};
    },
    entryType() {
      if (this.form.entry == "2") {
        this.transfer_in = true;
      } else {
        this.transfer_in = false;
      }
    },
    levelClass() {
      var level_id = this.form.level_id;
      
      if (level_id >= 1 && level_id <= 6) {
        let level = this.levels.find((i) => i.id === level_id);
        let clazs = this.claszs.filter((i) => i.level === level.level);
        this.clazzs = clazs;
        this.class_disabled = false;
      } else {
        this.class_disabled = true;
      }
    },
    async searchParent() {
      this.loading = true;
      var response = await axios
        .post(this.$store.state.api_url + "/search-parent", this.search)
        .catch((errors) => {
          var message = "Network or Server Errors";
          this.$toast.error(message,{duration: 7000,dismissible: true,})
        });

          if (response.data.success) {
            this.parents = response.data.parents;
            //console.log(response.data.parents);
            this.loading = false;
          } else {
            this.search_errors = response.data.message;
          }
        
    },
    async allParents() {
      var response = await axios.get(this.$store.state.api_url + "/parents")
        //console.log(response.data);
        this.parents = response.data;
        this.loading = false;
    },
    async allParentStatus() {
      var response = await axios.get(this.$store.state.api_url + "/parent-status")
        //console.log(response.data);
        this.parent_ss = response.data;
    
    },
    async getGender() {
      var response = await axios.get(this.$store.state.api_url + "/genders")
        //console.log(response.data);
        this.genders = response.data;
    },
    async getHealthStatus() {
      var response = await axios.get(this.$store.state.api_url + "/healths")
        //console.log(response.data);
        this.healths = response.data;
    },
    async getRelations() {
      var response = await axios.get(this.$store.state.api_url + "/relations")
        //console.log(response.data);
        this.relations = response.data;
    },
    async getAdmissionType() {
      var response = await axios.get(this.$store.state.api_url + "/admissions")
        //console.log(response.data);
        this.adm_types = response.data;
    },
    async getEntryType() {
      var response = await axios.get(this.$store.state.api_url + "/entrys")
        //console.log(response.data);
        this.entrys = response.data;
    },
    async addStudent() {
      
      var accademic_year = this.form.accademic_year;
      var birth_date = this.form.birth_date;
      var birth = birth_date.split("-")[0];
      var Yearz = accademic_year - birth;

      var level_id = parseInt(this.form.level_id)

      
      var fees = this.fees
      var feef = []

      if(level_id < 5){
        fees.forEach(el => {
        if(el.level_id == level_id && el.status == 1 || el.level_id == 0 && el.status == 1 || el.level_id == 7 && el.status == 1){
          feef.push(el.id)
        }
      });
      }
      if(level_id > 4){
        fees.forEach(el => {
        if(el.level_id == level_id && el.status == 1 || el.level_id == 0 && el.status == 1 || el.level_id == 8 && el.status == 1){
          feef.push(el.id)
        }
      });
      }

      var fees = feef.toString()

      if(this.form.role_id == 4 || this.form.department_id == 2){
          if (Yearz < 10) {
        var message = "Student is under Age 'only '" + Yearz + " !"
          this.$toast.error(message,{duration: 7000,dismissible: true,})
      } else {
        this.errors = [];
        if(this.transfer_in){
          this.form.former_school = this.form.school_from
        }
        var response = await axios
          .post(this.$store.state.api_url + "/create-student", {
            ...this.form,
            parent_id: this.parent.id,
            parent_phone: this.parent.phone,
            fees
          })
          .catch((errors) => {
            var message = "Network or Server Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
          });

            if (response.data.success) {
              this.form = {};
              this.parents = response.data.parents;
              this.parent_exist = false;
              this.parent = {};
            
              var message = response.data.message;
              this.$toast.success(message,{duration: 7000,dismissible: true,})
              window.location.reload();
            } else {
              this.errors = [response.data.message];
            }
          
      }
      }else{
        var message = "Your not belong to Admission Deptartiment";
        this.$toast.error(message,{duration: 7000,dismissible: true,})
      }
    },
    async allLevel() {
      var response = await axios.get(this.$store.state.api_url + "/levels")
        //console.log(response.data);
        this.levels = response.data;
     
    },
    async allClaszs() {
      var response = await axios.get(this.$store.state.api_url + "/class")
        console.log(response.data);
        this.claszs = response.data;

    },

    isAuth() {
      var user = localStorage.getItem("user");
      var token = localStorage.getItem("user_token");
      if (user && token) {
        user = JSON.parse(user);
        this.form.user_id = user.id;
        this.form.role_id = user.role_id;
        this.form.department_id = user.department_id;
      }
    },
  },
  created() {
    this.isAuth();
    this.allFees();
    this.allParents();
    this.getGender();
    this.getRelations();
    this.getAdmissionType();
    this.getHealthStatus();
    this.getEntryType();
    this.allLevel();
    this.allClaszs();
    this.allParentStatus();
    this.proposedIndexNo();
  },
};
</script>
