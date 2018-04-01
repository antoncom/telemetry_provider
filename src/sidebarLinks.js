export default [
  {
    name: 'Главная',
    icon: 'ti-gift',
    path: '/provider/home'
  },
  {
    name: 'Операторы',
    icon: 'ti-gift',
    path: '/provider/operators'
  },
  {
    name: 'Домовладельцы',
    icon: 'ti-gift',
    path: '/provider/householders'
  },
  {
    name: 'Дома',
    icon: 'ti-gift',
    path: '/provider/houses',
    children: [
      {
        name: 'Список домов',
        path: '/provider/houses'
      },
      {
        name: 'Каточка дома',
        path: '/provider/house'
      }]
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
