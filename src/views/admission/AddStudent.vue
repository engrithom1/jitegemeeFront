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
        <div class="col-md-7">
          <div v-show="!parent_exist" class="white_shd full margin_bottom_30">
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
                        v-for="error in errors"
                        :key="error"
                        class="text-danger"
                      >
                        {{ error[0] }}
                      </p>
                      <div class="input-append">
                        <input
                          type="text"
                          class="sr-input"
                          v-model="this.search.search_parent"
                          placeholder="Search parent"
                        />
                        <button class="btn sr-btn" type="submit">
                          <i class="fa fa-search"></i>
                        </button>
                      </div>
                    </form>
                  </div>
                  <div class="inbox-body">
                    <div class="mail-option">
                      <ul class="unstyled inbox-pagination mb-3">
                        <li><span>1-50 of 234</span></li>
                        <li>
                          <a class="np-btn" href="#"
                            ><i class="fa fa-angle-left pagination-left"></i
                          ></a>
                        </li>
                        <li>
                          <a class="np-btn" href="#"
                            ><i class="fa fa-angle-right pagination-right"></i
                          ></a>
                        </li>
                      </ul>
                      <div class="table-responsive-md w-100">
                        <table class="table table-hover">
                          <thead>
                            <th><b>Full Name</b></th>
                            <th><b>Phone</b></th>
                            <th><b>Action</b></th>
                          </thead>
                          <tbody>
                            <div v-show="parents.length == 0">
                              <h4 class="text-center">no parents found</h4>
                            </div>
                            <tr
                              v-show="parents"
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="parent_exist" class="row">
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
                      <div class="form-group">
                        <label for="sindex">Index Number*</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="this.form.index_no"
                          minlength="4"
                          maxlength="4"
                          placeholder="0000"
                          required
                        />
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
                        <label for="shome">Home address*</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="this.form.home_address"
                          placeholder="Dege Kigamboni"
                          required
                        />
                      </div>
                      <div class="form-group">
                        <label for="semail">Email address</label>
                        <input
                          type="email"
                          class="form-control"
                          v-model="this.form.email"
                          placeholder="john@gmail.com"
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
                            <label for="sphone">Phone</label>
                            <input
                              type="text"
                              class="form-control"
                              v-model="this.form.phone"
                              placeholder="255768448525"
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
                          <label for="gender">Gender*</label>
                          <select
                            class="form-control"
                            v-model="this.form.gender"
                            id="gender"
                            required
                          >
                            <option
                              class="text-capitalize"
                              v-for="gender in genders"
                              :key="gender.id"
                              :value="gender.id"
                            >
                              {{ gender.gender }}
                            </option>
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
                            <label for="pgender">Accademic Year*</label>
                            <input
                              type="number"
                              v-max="this.c_year+2"
                              maxlength="4"
                              minlength="4"
                              class="form-control"
                              :placeholder="this.c_year"
                              v-model="this.form.accademic_year"
                              aria-describedby="emailHelp"
                              required
                            />
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
                          <div v-show="transfer_in">
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
                          >Hearth and Behavior</label
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
      genders:[],
      entrys:[],
      healths:[],
      levels: [],
      claszs: [],
      clazzs: [],
      parent: {},
      parents: [],
      errors: [],
      relations: [],
      adm_types:[],
      search_errors: [],
      search: {
        search_parent: "",
      },
      form: {
        email: "",
        index_no: "",
        first_name: "",
        last_name: "",
        middle_name: "",
        gender: "",
        phone: "",
        home_address: "",
        nationality: "",
        accademic_year: new Date().getFullYear(),
        birth_date: "",
        behavior: "",
        hearth: "",
        photo: "man.png",
        school_from: "",
        transfer_reason: "",
        relation_to: "",
        level_id: "",
        classroom_id: "",
        user_id: "",
        role_id: "",
        entry: "",
        admission: "",
      },
    };
  },
  methods: {
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
      if (this.form.level_id >= 1 && this.form.level_id <= 6) {
        let level = this.levels.find((i) => i.id === this.form.level_id);
        let clazs = this.claszs.filter((i) => i.level === level.level);
        this.clazzs = clazs;
        this.class_disabled = false;
      } else {
        this.class_disabled = true;
      }
    },
    searchParent() {
      axios
        .post(this.$store.state.api_url + "/search-parent", this.search)
        .then((response) => {
          if (response.data.success) {
            this.parents = response.data.parents;
            console.log(response.data.parents);
          } else {
            this.search_errors = response.data.message;
          }
        })
        .catch((errors) => {
          alert("Network or Server Errors");
        });
    },
    allParents() {
      axios.get(this.$store.state.api_url + "/parents").then((response) => {
        //console.log(response.data);
        this.parents = response.data;
      });
    },
    getGender() {
      axios.get(this.$store.state.api_url + "/genders").then((response) => {
        //console.log(response.data);
        this.genders = response.data;
      });
    },
    getHealthStatus() {
      axios.get(this.$store.state.api_url + "/healths").then((response) => {
        //console.log(response.data);
        this.healths = response.data;
      });
    },
    getRelations() {
      axios.get(this.$store.state.api_url + "/relations").then((response) => {
        //console.log(response.data);
        this.relations = response.data;
      });
    },
    getAdmissionType() {
      axios.get(this.$store.state.api_url + "/admissions").then((response) => {
        //console.log(response.data);
        this.adm_types = response.data;
      });
    },
    getEntryType() {
      axios.get(this.$store.state.api_url + "/entrys").then((response) => {
        //console.log(response.data);
        this.entrys = response.data;
      });
    },
    addStudent() {
      var accademic_year = this.form.accademic_year;
      var birth_date = this.form.birth_date;
      var birth = birth_date.split("-")[0];
      var Yearz = accademic_year - birth;
      if (Yearz < 12) {
        alert("Student is under Age 'only '" + Yearz + "!");
      } else {
        this.errors = [];
        axios
          .post(this.$store.state.api_url + "/create-student", {
            ...this.form,
            parent_id: this.parent.id,
            parent_phone: this.parent.phone,
          })
          .then((response) => {
            if (response.data.success) {
              this.form = {};
              this.parents = response.data.parents;
              this.parent_exist = false;
              this.parent = {};
              alert(response.data.message);
            } else {
              this.errors = response.data.message;
            }
          })
          .catch((errors) => {
            alert("Network or Server Errors");
          });
      }
    },
    imageProcess(e) {
      let file = e.target.files[0];
      let reader = new FileReader();

      alert("well it chabged");

      if (file["size"] < 1111775) {
        reader.onloadend = (file) => {
          console.log("RESULT", reader.result);
          this.form.photo = reader.result;
        };
        reader.readAsDataURL(file);
      } else {
        alert("You have Choose The file more than 2MB");
        //swal("Congrats!", ", Your account is created!", "success");
      }
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
        this.form.user_id = user.id;
        this.form.role_id = user.role_id;
      }
    },
  },
  created() {
    this.allParents();
    this.getGender();
    this.getRelations();
    this.getAdmissionType();
    this.getHealthStatus();
    this.getEntryType();
    this.allLevel();
    this.allClaszs();
    this.isAuth();
  },
};
</script>
