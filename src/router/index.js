import { createRouter, createWebHistory } from 'vue-router'

import Dashbord from "../views/Dashbord.vue"
///admission
import AddStudent from "../views/admission/AddStudent.vue"
import AllStudent from "../views/admission/AllStudents.vue"
import Graduates from "../views/admission/Graduates.vue"
import Parents from "../views/admission/Parents.vue"

//acaademic
import Class from "../views/accademic/Class.vue"
import Grades from "../views/accademic/Grades.vue"
import Subjects from "../views/accademic/Subjects.vue"
import Exams from "../views/accademic/Exams.vue"
import ExamMarks from "../views/accademic/StudentMarks.vue"
import ExamResults from "../views/accademic/ExamResults.vue"

//finance
import StudentFees from "../views/finance/StudentFees.vue"
import StudentPayments from "../views/finance/StudentPayments.vue"
import PaymentReports from "../views/finance/PaymentReports.vue"

//statff
import AllStaff from "../views/staff/AllStaff.vue"

//Department
import Department from "../views/department/Department.vue"

import Dev from "../views/Dev.vue"

const routes = [
  {
    path: '/dev',
    name: 'dev',
    component: Dev
  },
  {
    path: '/',
    name: 'dashbord',
    component: Dashbord
  },
  /*{
    path: '/dashbord',
    name: 'dashbord',
    component: Dashbord
  },*/
  {
    path: '/addstudent',
    name: 'Addstudent',
    component: AddStudent
  },
  {
    path: '/parents',
    name: 'Parents',
    component: Parents
  },
  {
    path: '/allstudents',
    name: 'Allstudent',
    component: AllStudent
  },
  {
    path: '/graduates',
    name: 'Graduates',
    component: Graduates
  },
  {
    path: '/classroom',
    name: 'Class',
    component: Class
  },
  {
    path: '/subjects',
    name: 'Subjects',
    component: Subjects
  },
  {
    path: '/exams',
    name: 'Exams',
    component: Exams
  },
  {
    path: '/grades',
    name: 'Grades',
    component: Grades
  },
  {
    path: '/student-fees',
    name: 'StudentFees',
    component: StudentFees
  },
  {
    path: '/student-payments',
    name: 'StudentPayments',
    component: StudentPayments
  },
  {
    path: '/payment-reports',
    name: 'PaymentReports',
    component: PaymentReports
  },
  {
    path: '/all-staff',
    name: 'AllStaff',
    component: AllStaff
  },
  {
    path: '/department',
    name: 'Department',
    component: Department
  },
  {
    path: '/exams-marks',
    name: 'ExamMarks',
    component: ExamMarks
  },
  {
    path: '/exams-results',
    name: 'ExamResults',
    component: ExamResults
  },
  
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

export default router
