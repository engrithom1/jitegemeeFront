import { createRouter, createWebHistory } from 'vue-router'
//import * as CryptoJS from 'crypto-js';

//var user_cry = localStorage.getItem("rich")  || "";
//var user = CryptoJS.AES.decrypt(user_cry, 'rich').toString(CryptoJS.enc.Utf8) || null
//user = JSON.parse(user)

import Dashbord from "../views/Dashbord.vue"
///admission
import AddStudent from "../views/admission/AddStudent.vue"
import AllStudent from "../views/admission/AllStudents.vue"
import Graduates from "../views/admission/Graduates.vue"
import Parents from "../views/admission/Parents.vue"

//acaademic
import Class from "../views/accademic/Class.vue"
import Course from "../views/accademic/Course.vue"
import Grades from "../views/accademic/Grades.vue"
import Subjects from "../views/accademic/Subjects.vue"
import Exams from "../views/accademic/Exams.vue"
import ExamMarks from "../views/accademic/StudentMarks.vue"
import ExamResults from "../views/accademic/ExamResults.vue"
import Attendance from "../views/accademic/Attendance.vue"

//finance
import StudentFees from "../views/finance/StudentFees.vue"
import StudentPayments from "../views/finance/StudentPayments.vue"
import PaymentReports from "../views/finance/PaymentReports.vue"
import Reconciliation from "../views/finance/Reconciliation.vue"

//statff
import AllStaff from "../views/staff/AllStaff.vue"

//Department
import Department from "../views/department/Department.vue"

//student info
import StudentInfo from "../views/student_pages/StudentInfo.vue"

//students pages
import Teachers from "../views/student_pages/Teachers.vue"
import Mates from "../views/student_pages/Mates.vue"
import Results from "../views/student_pages/Results.vue"
import Payments from "../views/student_pages/Payments.vue"

//othrs
import Controls from "../views/others/Controls.vue"
import Profile from "../views/others/ProfilePage.vue"

import Dev from "../views/Dev.vue"

const routes = [
  {
    path: '/jmis/dev',
    name: 'dev',
    component: Dev
  },
  {
    path: '/jmis/',
    name: 'dashbord',
    component: Dashbord
  },
  /*{
    path: '/jmis/dashbord',
    name: 'dashbord',
    component: Dashbord
  },*/
  {
    path: '/jmis/addstudent',
    name: 'Addstudent',
    component: AddStudent
  },
  {
    path: '/jmis/parents',
    name: 'Parents',
    component: Parents
  },
  {
    path: '/jmis/allstudents',
    name: 'Allstudent',
    component: AllStudent
  },
  {
    path: '/jmis/graduates',
    name: 'Graduates',
    component: Graduates
  },
  {
    path: '/jmis/classroom',
    name: 'Class',
    component: Class
  },
  {
    path: '/jmis/courses',
    name: 'Course',
    component: Course
  },
  {
    path: '/jmis/subjects',
    name: 'Subjects',
    component: Subjects
  },
  {
    path: '/jmis/exams',
    name: 'Exams',
    component: Exams
  },
  {
    path: '/jmis/grades',
    name: 'Grades',
    component: Grades
  },
  {
    path: '/jmis/student-fees',
    name: 'StudentFees',
    component: StudentFees
  },
  {
    path: '/jmis/student-payments',
    name: 'StudentPayments',
    component: StudentPayments
  },
  {
    path: '/jmis/payment-reports',
    name: 'PaymentReports',
    component: PaymentReports
  },
  {
    path: '/jmis/all-staff',
    name: 'AllStaff',
    component: AllStaff
  },
  {
    path: '/jmis/department',
    name: 'Department',
    component: Department
  },
  {
    path: '/jmis/exams-marks',
    name: 'ExamMarks',
    component: ExamMarks
  },
  {
    path: '/jmis/exams-results',
    name: 'ExamResults',
    component: ExamResults
  },
  {
    path: '/jmis/attendance',
    name: 'Attendance',
    component: Attendance
  },

  {
    path: '/jmis/reconciliation',
    name: 'Reconciliation',
    component: Reconciliation
  },
  ///students pages student-fees-payments
  {
    path: '/jmis/student-info',
    name: 'StudentInfo',
    component: StudentInfo
  },
  {
    path: '/jmis/student-fees-payments',
    name: 'Payments',
    component: Payments
  },
  {
    path: '/jmis/student-class-mates',
    name: 'Mates',
    component: Mates
  },
  {
    path: '/jmis/student-exam-results',
    name: 'Results',
    component: Results
  },
  {
    path: '/jmis/student-teachers',
    name: 'Teachers',
    component: Teachers
  },

  ///other
  {
    path: '/jmis/controls',
    name: 'Controls',
    component: Controls
  },
  {
    path: '/jmis/profile',
    name: 'Profile',
    component: Profile
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
