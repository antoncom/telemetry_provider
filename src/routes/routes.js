import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'


import HomeProvider from 'src/components/Dashboard/Views/HomeProvider.vue'
import Login from 'src/components/Dashboard/Views/Pages/Login.vue'
import Register from 'src/components/Dashboard/Views/Pages/Register.vue'
import User from 'src/components/Dashboard/Views/Pages/UserProfile.vue'
import Lock from 'src/components/Dashboard/Views/Pages/Lock.vue'

import Operators from 'src/components/Dashboard/Views/provider/Operators.vue'
import AddOperator from 'src/components/Dashboard/Views/provider/AddOperator.vue'
import EditOperator from 'src/components/Dashboard/Views/provider/EditOperator.vue'

import HouseHolders from 'src/components/Dashboard/Views/operator/HouseHolders.vue'
import AddHouseholder from 'src/components/Dashboard/Views/operator/AddHouseholder.vue'
import EditHouseholder from 'src/components/Dashboard/Views/operator/EditHouseholder.vue'

import Houses from 'src/components/Dashboard/Views/operator/Houses.vue'
import AddHouse from 'src/components/Dashboard/Views/operator/AddHouse.vue'
import EditHouse from 'src/components/Dashboard/Views/operator/EditHouse.vue'
import House from 'src/components/Dashboard/Views/House.vue'

import Equipment from 'src/components/Dashboard/Views/operator/Equipment.vue'
import AddEquipment from 'src/components/Dashboard/Views/operator/AddEquipment.vue'
import BindEquipment from 'src/components/Dashboard/Views/operator/BindEquipment.vue'
import EditEquipment from 'src/components/Dashboard/Views/operator/EditEquipment.vue'
import UnbindEquipment from 'src/components/Dashboard/Views/operator/UnbindEquipment.vue'

// import HeatConsumption from 'src/components/Dashboard/Views/householder/HeatConsumption.vue'

import Messenger from 'src/components/Dashboard/Views/Messenger.vue'
// import TechProc from 'src/components/Dashboard/Views/TechProc.vue'
// import DocuProc from 'src/components/Dashboard/Views/DocuProc.vue'
// import TeamtimeBpm from 'src/components/Dashboard/Views/TeamtimeBpm.vue'
// import TeamtimeDocs from 'src/components/Dashboard/Views/TeamtimeDocs.vue'

let loginPage = {
  path: '/login',
  name: 'Login',
  component: Login,
  meta: {
    from: ''
  }
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
/*

let operatorPages = {
  path: '/operator/home',
  name: 'Оператор - главная',
  component: Operator,
  meta: {
    roles: ['operator'],
    breadcrumbs: false
  },
  children: [
    {
      path: '/operator/householders',
      name: 'Домовладельцы',
      component: Householders,
      meta: {
        roles: ['operator'],
        breadcrumbs: true
      }
    },
    {
      path: '/operator/householder',
      name: 'Домовладелец',
      component: Householder,
      meta: {
        roles: ['operator'],
        breadcrumbs: true
      }
    }
  ]
}
*/

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/provider/home',
    children: [
      {
        path: '/provider/home',
        name: 'Главная',
        component: HomeProvider,
        meta: {
          requiredAuth: true,
          roles: ['provider', 'operator', 'householder'],
          breadcrumbs: false
        }
      },
      {
        path: '/operators',
        name: 'Операторы',
        component: Operators,
        meta: {
          requiredAuth: true,
          roles: ['provider'],
          breadcrumbs: false
        }
      },
      {
        path: '/operators/list',
        name: 'Список оператороа',
        component: Operators,
        meta: {
          requiredAuth: true,
          roles: ['provider'],
          breadcrumbs: false
        }
      },
      {
        path: '/operators/add',
        name: 'Добавить оператора',
        component: AddOperator,
        meta: {
          requiredAuth: true,
          roles: ['provider'],
          breadcrumbs: true
        }
      },
      {
        path: '/operators/edit/:id',
        name: 'Редактировать оператора',
        component: EditOperator,
        meta: {
          requiredAuth: true,
          roles: ['provider'],
          breadcrumbs: true
        }
      },
      {
        path: '/householders',
        name: 'Домовладельцы',
        component: HouseHolders,
        meta: {
          requiredAuth: true,
          roles: ['operator', 'provider'],
          breadcrumbs: false
        }
      },
      {
        path: '/householders/list',
        name: 'Список домовладельцев',
        component: HouseHolders,
        meta: {
          requiredAuth: true,
          roles: ['operator', 'provider'],
          breadcrumbs: false
        }
      },
      {
        path: '/householders/add',
        name: 'Добавить домовладельца',
        component: AddHouseholder,
        meta: {
          requiredAuth: true,
          roles: ['operator', 'provider'],
          breadcrumbs: true
        }
      },
      {
        path: '/householders/edit/:id',
        name: 'Редактировать домовладельца',
        component: EditHouseholder,
        meta: {
          requiredAuth: true,
          roles: ['operator', 'provider'],
          breadcrumbs: true
        }
      },
      {
        path: '/houses',
        name: 'Дома',
        component: Houses,
        meta: {
          requiredAuth: true,
          roles: ['provider', 'operator', 'householder'],
          breadcrumbs: false
        }
      },
      {
        path: '/houses/list',
        name: 'Список домов',
        component: Houses,
        meta: {
          requiredAuth: true,
          roles: ['provider', 'operator', 'householder'],
          breadcrumbs: false
        }
      },
      {
        path: '/houses/add',
        name: 'Добавить дом',
        component: AddHouse,
        meta: {
          requiredAuth: true,
          roles: ['provider', 'operator'],
          breadcrumbs: true
        }
      },
      {
        path: '/houses/edit/:id',
        name: 'Редактировать дом',
        component: EditHouse,
        meta: {
          requiredAuth: true,
          roles: ['provider', 'operator'],
          breadcrumbs: true
        }
      },
      {
        path: '/houses/info/:id',
        name: 'Карточка дома',
        component: House,
        meta: {
          requiredAuth: true,
          roles: ['provider', 'operator', 'householder'],
          breadcrumbs: true
        }
      },
      {
        path: '/equipment',
        name: 'Оборудование',
        component: Equipment,
        meta: {
          requiredAuth: true,
          roles: ['provider', 'operator'],
          breadcrumbs: false
        }
      },
      {
        path: '/equipment/list',
        name: 'Список оборудования',
        component: Equipment,
        meta: {
          requiredAuth: true,
          roles: ['provider', 'operator'],
          breadcrumbs: false
        }
      },
      {
        path: '/equipment/add',
        name: 'Добавить оборудование',
        component: AddEquipment,
        meta: {
          requiredAuth: true,
          roles: ['provider', 'operator'],
          breadcrumbs: true
        }
      },
      {
        path: '/equipment/edit/:id',
        name: 'Переименование линии прибора',
        component: EditEquipment,
        meta: {
          requiredAuth: true,
          roles: ['provider', 'operator'],
          breadcrumbs: true
        }
      },
      {
        path: '/equipment/bind/:id',
        name: 'Привязать прибор',
        component: BindEquipment,
        props: (route) => ({ query: route.query.line }), // e.g.: /equipment/bind/123?line=line1
        meta: {
          requiredAuth: true,
          roles: ['provider', 'operator'],
          breadcrumbs: true
        }
      },
      {
        path: '/equipment/unbind/:id',
        name: 'Отвязка линии прибора',
        component: UnbindEquipment,
        meta: {
          requiredAuth: true,
          roles: ['provider', 'operator'],
          breadcrumbs: true
        }
      },
      {
        path: '/houses/list',
        name: 'Потребление',
        component: Houses,
        meta: {
          requiredAuth: true,
          roles: ['provider', 'operator'],
          breadcrumbs: false
        }
      },
/*      {
        path: '/consumption/heat',
        name: 'Потребление тепла',
        component: HeatConsumption,
        meta: {
          requiredAuth: true,
          roles: ['provider', 'operator'],
          breadcrumbs: false
        }
      },
      {
        path: '/consumption/cwater',
        name: 'Потребление холодной воды',
        component: HeatConsumption,
        meta: {
          requiredAuth: true,
          roles: ['provider', 'operator'],
          breadcrumbs: false
        }
      },
      {
        path: '/consumption/hwater',
        name: 'Потребление горячей воды',
        component: HeatConsumption,
        meta: {
          requiredAuth: true,
          roles: ['provider', 'operator'],
          breadcrumbs: false
        }
      }, */
      {
        path: '/profile',
        name: 'Профиль пользователя',
        component: User,
        meta: {
          requiredAuth: true,
          roles: ['provider', 'operator', 'householder'],
          breadcrumbs: false
        }
      },
      {
        path: '/provider/messenger',
        name: 'Сообщения пользователей',
        component: Messenger,
        meta: {
          requiredAuth: true,
          roles: ['provider', 'operator', 'householder'],
          breadcrumbs: false
        }
      }
      /*
      {
        path: '/provider/docuproc',
        name: 'Бизнес-процессы',
        component: DocuProc,
        meta: {
          requiredAuth: true,
          roles: ['provider'],
          breadcrumbs: false
        }
      },
      {
        path: '/provider/obsledproc',
        name: 'Постановка дома на обследование',
        component: TechProc,
        meta: {
          requiredAuth: true,
          roles: ['provider'],
          breadcrumbs: false
        }
      },
      {
        path: '/provider/ttbpm',
        name: 'TeamtimeBpm',
        component: TeamtimeBpm,
        meta: {
          requiredAuth: true,
          roles: ['provider'],
          breadcrumbs: false
        }
      },
      {
        path: '/provider/ttdocs',
        name: 'Хранилище документов',
        component: TeamtimeDocs,
        meta: {
          requiredAuth: true,
          roles: ['provider', 'operator', 'householder'],
          breadcrumbs: false
        }
      }
      */
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
