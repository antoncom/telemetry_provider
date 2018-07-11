export default [
  {
    name: 'Главная',
    icon: 'ti-gift',
    path: '/provider/home'
  },
  {
    name: 'Операторы',
    icon: 'ti-gift',
    path: '/operators',
    children: [
      {
        name: 'Список операторов',
        path: '/operators/list'
      },
      {
        name: 'Добавить оператора',
        path: '/operators/add'
      }]
  },
  {
    name: 'Домовладельцы',
    icon: 'ti-gift',
    path: '/householders',
    children: [
      {
        name: 'Список домовладельцев',
        path: '/householders/list'
      },
      {
        name: 'Добавить домовладельца',
        path: '/householders/add'
      }]
  },
  {
    name: 'Дома',
    icon: 'ti-gift',
    path: '/houses',
    children: [
      {
        name: 'Список домов',
        path: '/houses'
      },
      {
        name: 'Добавить дом',
        path: '/houses/add'
      }]
/*      {
        name: 'Каточка дома',
        path: '/provider/house'
      } */
  },
  {
    name: 'Сообщения',
    icon: 'ti-gift',
    path: '/provider/messenger'
  },
  {
    name: 'Бизнес процессы',
    icon: 'ti-gift',
    path: '/provider/docuproc',
    children: [
      {
        name: 'Документооборот',
        path: '/provider/docuproc'
      },
      {
        name: 'Обследование дома',
        path: '/provider/obsledproc'
      }]
  }
]
