export default [
  {
    name: 'Главная',
    icon: 'ti-gift',
    path: '/provider/home',
    roles: ['provider', 'operator', 'householder']
  },
  {
    name: 'Операторы',
    icon: 'ti-gift',
    path: '/operators',
    roles: ['provider'],
    children: [
      {
        name: 'Список операторов',
        path: '/operators/list',
        roles: ['provider']
      },
      {
        name: 'Добавить оператора',
        path: '/operators/add',
        roles: ['provider']
      }]
  },
  {
    name: 'Домовладельцы',
    icon: 'ti-gift',
    path: '/householders',
    roles: ['operator', 'provider'],
    children: [
      {
        name: 'Список домовладельцев',
        path: '/householders/list',
        roles: ['operator', 'provider']
      },
      {
        name: 'Добавить домовладельца',
        path: '/householders/add',
        roles: ['operator', 'provider']
      }]
  },
  {
    name: 'Дома',
    icon: 'ti-gift',
    path: '/houses',
    roles: ['provider', 'operator', 'householder'],
    children: [
      {
        name: 'Список домов',
        path: '/houses',
        roles: ['provider', 'operator', 'householder']
      },
      {
        name: 'Добавить дом',
        path: '/houses/add',
        roles: ['provider', 'operator']
      }]
/*      {
        name: 'Каточка дома',
        path: '/provider/house'
      } */
  },
  {
    name: 'Оборудование',
    icon: 'ti-gift',
    path: '/equipment',
    roles: ['provider', 'operator'],
    children: [
      {
        name: 'Список оборудования',
        path: '/equipment',
        roles: ['provider', 'operator']
      },
      {
        name: 'Привязать оборудование',
        path: '/equipment/add',
        roles: ['provider', 'operator']
      }]
  },
  {
    name: 'Потребление',
    icon: 'ti-gift',
    path: '/houses/list',
    roles: ['provider', 'operator']
  },
  {
    name: 'Сообщения',
    icon: 'ti-gift',
    path: '/provider/messenger',
    roles: ['provider', 'operator', 'householder']
  },
  {
    name: 'Бизнес процессы',
    icon: 'ti-gift',
    path: '/provider/docuproc',
    roles: ['provider'],
    children: [
      // {
      //  name: 'Документооборот',
      //  path: '/provider/docuproc',
      //  roles: ['provider']
      // },
      // {
      //  name: 'Обследование дома',
      //  path: '/provider/obsledproc',
      //  roles: ['provider']
      // },
      {
        name: 'Обследование дома',
        path: '/provider/ttbpm',
        roles: ['provider']
      }]
  }
]
