<template>
    <div class="midde_cont">
      <div class="container-fluid">
        <div class="row column_title">
          <div class="col-md-12">
            <div class="page_title">
              <h2>Academic > Exam Results</h2>
            </div>
          </div>
        </div>

        <!--add payments-->
        <div class="row column4 graph">
          <div class="col-12">
            <div class="white_shd full margin_bottom_30">
            <div class="full progress_bar_inner">
              <div class="row">
                <div class="col-md-12">
                    <form @submit.prevent="searchResults" class="p-3">
                    <div class="row">    
                    <div class="col-md-2 form-group">
                      <label for="pgender"
                        >Exam Type</label
                      >
                      <select
                        class="form-control text-capitalize"
                        v-model="exam_id"
                        required
                      >
                      <option
                          class="text-capitalize"
                          v-for="exms in exams"
                          :key="exms.id"
                          :value="exms.id"
                        >
                          {{ exms.examname }}
                        </option>
                      </select>
                    </div>
                    <div class="col-md-2 form-group">
                          <label for="pgender"
                        >Academic Year</label
                      >
                      <input required minlength="4" maxlength="4" v-model="this.academic_year" type="number" class="form-control"/>  
                        </div>
                    <div class="col-md-2 form-group">
                      <label>Select Level*</label>
                      <select required v-on:change="levelSelected()" class="form-control" v-model="this.level_id">
                        <option
                          v-for="level in levels"
                          :key="level.id"
                          :value="level.id"
                          
                        >
                          {{ level.level }}
                        </option>
                      </select>
                    </div>

                    <div class="col-md-2 form-group">
                      <label>Select Class*</label>
                  <select required class="form-control" v-model="this.selected_class">
                    <option :value="0">All Classes</option>
                    <option
                      v-for="clas in clazzs"
                      :key="clas.id"
                      :value="clas.id"
                    >
                      {{ clas.classname }}
                    </option>
                    </select>
                    </div>
                    <button type="submit" class="btn btn-success"><i class="fa fa-search"> </i> Results</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
        <!--contents heaa-->
        <!-- table section -->
        <div class="row">
          <div class="col-md-12">
            <div class="white_shd full margin_bottom_30">
                <div class="table_section padding_infor_info">
                    <div class="table-responsive-sm">
                      <div v-if="results.length > 0" class="row">
                        <div class="col-sm-6 col-md-10"></div>
                        <div class="col-sm-6 col-md-2">
                          <button :disabled="results.length == 0" type="submit" class="btn btn-dark form-control"><i class="fa fa-file-pdf-o"> </i> Export PDF</button>
                        </div>
                      </div>
                    <table class="table">
                      <thead>
                        <tr>
                          <th><b>Index No</b></th>
                          <th><b>Full Name</b></th>
                          <th><b>Avge</b></th>
                          <th><b>Pnts</b></th>
                          <th><b>Divs</b></th>
                          <th><b>Potn</b></th>
                          <th><b>Subject Detailed</b></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="result in results" :key="result.index_no" class="">
                          <td class="">{{ result.index_no }}</td>
                          <td class="text-capitalize">{{ result.first_name+" "+result.middle_name+" "+result.last_name }}</td>
                          <td class="">{{ (result.total_marks / result.subjects).toFixed(1) }}</td>
                          <td class="">{{ result.points }}</td>
                          <td v-if="result.points <= 17" class="">I</td>
                          <td v-else-if="result.points >= 18 && result.points <= 21" class="">II</td>
                          <td v-else-if="result.points >= 22 && result.points <= 25" class="">III</td>
                          <td v-else-if="result.points >= 26 && result.points <= 33" class="">IV</td>
                          <td v-else class="">FLD</td>
                          <td class=""></td>
                          <td class="">
                            {{ result.details }}
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
      <!-- footer -->
      <div class="container-fluid">
        <div class="footer">
          <p>
            Copyright © 2023 Jitegemee MIS. All rights reserved.<br />
           
          </p>
        </div>
      </div>
      <!-- payment table-->
    </div>
</template> 

<script>
  import axios from "axios";
  export default {
    data() {
      return{
        pos:0,
        levels: [],
        claszs:[],
        clazzs:[],
        academic_year: new Date().getFullYear(),
        user_id:"",
        exam_id:"",
        role_id:"",
        class_id:"",
        level_id:"",
        selected_class:0,
        exams:[],
        search_class:true,
        fail_mark:"",
        results:[]
      }
    },
    methods:{
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
      async refleshStudents(){

        var year = this.academic_year;
        var class_id = this.selected_class;
        var exam_id = this.exam_id;

        var response = await axios.post(this.$store.state.api_url + "/reflesh_students",{'class_id':class_id,'exam_id':exam_id,'year':year})
        .catch((errors) => {
          var message = "Network or Server Errors";
          this.$toast.error(message,{duration: 7000,dismissible: true,})
        });
        //console.log(response.data);
        this.students = response.data.students;
        this.hosted = response.data.hosted;
        //this.find_clas = !this.find_clas

  
        },
      async allLevel() {
        var response = await axios.get(this.$store.state.api_url + "/levels")
        //console.log(response.data);
        this.levels = response.data;

    },
    async allClaszs() {
      var response = await axios.get(this.$store.state.api_url + "/class")
        //console.log(response.data);
        this.claszs = response.data;
   
    },
    async allExams() {
      var response = await axios.get(this.$store.state.api_url + "/exams")
        //console.log(response.data);
        this.exams = response.data;
  
    },
    levelSelected() {
      this.search_class = true;
      //alert('level ni '+this.level_id);
      var level_id = this.level_id;
      if (level_id >= 1 && level_id <= 6) {
        let level = this.levels.find((i) => i.id === level_id);
        let clazs = this.claszs.filter((i) => i.level === level.level);
        this.clazzs = clazs;
      } 
      this.search_class = false;
    },
    async searchResults(){

        var year = this.academic_year;
        var class_id = this.selected_class;
        var exam_id = this.exam_id;
        var level_id = this.level_id;

        //console.log(this.selected_class)

        console.log(year+", "+class_id+" ,"+exam_id+", "+level_id)

        var response = await axios.post(this.$store.state.api_url + "/fetch_exam_results",{'class_id':class_id,'exam_id':exam_id,'year':year,'level_id':level_id})
        .catch((errors) => {
          var message = "Network or Server Errors";
          this.$toast.error(message,{duration: 7000,dismissible: true,})
        });
        //console.log(response.data);
        this.results = response.data.results;
        //this.find_clas = !this.find_clas
    },
    },
      computed:{
    },
    created() {
    this.allExams();
    this.allLevel();
    this.allClaszs();
    this.isAuth();
  },
  }
</script>