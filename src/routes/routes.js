import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'


import HomeProvider from 'src/components/Dashboard/Views/HomeProvider.vue'
import Login from 'src/components/Dashboard/Views/Pages/Login.vue'
import Register from 'src/components/Dashboard/Views/Pages/Register.vue'
import User from 'src/components/Dashboard/Views/Pages/UserProfile.vue'
import Lock from 'src/components/Dashboard/Views/Pages/Lock.vue'

import Operators from 'src/components/Dashboard/Views/Operators.vue'
import HouseHolders from 'src/components/Dashboard/Views/HouseHolders.vue'
import Houses from 'src/components/Dashboard/Views/Houses.vue'
import House from 'src/components/Dashboard/Views/House.vue'
import Messenger from 'src/components/Dashboard/Views/Messenger.vue'
import TechProc from 'src/components/Dashboard/Views/TechProc.vue'


let loginPage = {
  path: '/login',
  name: 'Login',
  component: Login
}

let registerPage = {
  path: '/register',
  name: 'Register',
  component: Register
}

let lockPage = {
  path: '/lock',
  name: 'Lock',
  component: Lock
}

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/provider/home',
    children: [
      {
        path: '/provider/home',
        name: 'Главная',
        component: HomeProvider
      },
      {
        path: '/provider/operators',
        name: 'Операторы',
        component: Operators
      },
      {
        path: '/provider/householders',
        name: 'Домовладельцы',
        component: HouseHolders
      },
      {
        path: '/provider/houses',
        name: 'Дома',
        component: Houses
      },
      {
        path: '/provider/house',
        name: 'Карточка дома',
        component: House
      },
      {
        path: '/provider/user',
        name: 'Профиль пользователя',
        component: User
      },
      {
        path: '/provider/messenger',
        name: 'Сообщения пользователей',
        component: Messenger
      },
      {
        path: '/provider/techproc',
        name: 'Тех.процессы',
        component: TechProc
      }
    ]
  },
  loginPage,
  registerPage,
  lockPage,
  {path: '*', component: NotFound}
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
 function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
