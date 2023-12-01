import {createStore} from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    api_url:"http://localhost:8000/api",
    //api_url:"https://jitegemeesec.ac.tz/jmisback/api",
    user:{},
    errors:"",
  },

  getters: {
  },

  mutations: {
    setUser(state,user){
      state.user = user
    },
    setErrors(state,value){
        state.errors=value
    },
    setZeroErrors(state){
        state.errors = ""
    },
  },

  actions: {
    async loginUser({state,commit},user){
      commit('setZeroErrors');
      
      var response = await axios.post(state.api_url+'/login',user)
      .catch(errors =>{
        console.log(errors)
        commit('setErrors',"Network or Server Errors");
     })

        if(response.data.success) {

          commit('setUser',response.data.data.user)
          localStorage.setItem('user',JSON.stringify(response.data.data.user))
          localStorage.setItem('user_token',response.data.data.token)
          window.location.replace('/');

        } else { 
          commit('setErrors',response.data.message);
        }
         
  },
  logOut({state,commit},id){

    localStorage.removeItem("user_token")
    localStorage.removeItem("user")
    commit('setUser',{})
    window.location.replace('/');
    /*axios
  .post(state.api_url+'/logout/',id)
  .then(response => {

  if(response.data.success){
      //console.log("loged succsessfuly")
      localStorage.removeItem("user_token")
      localStorage.removeItem("user")
      commit('setUser',{})
      window.location.replace('/');
     
  }
  
   });*/
}
  },
  
  modules: {
  }
})
