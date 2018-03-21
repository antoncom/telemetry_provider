<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <h4 class="title">Добро пожаловать!</h4>
          <p class="category">Вы находитесь на портале учёта энергоресурсов.<br /><br /></p>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <chart-card :chart-data="salesChart.data" :chart-options="salesChart.options">
        <div slot="header">
          <h4 class="card-title">Результаты обследования 2018/2019</h4>
          <p class="category">Отопительный сезон 2018-2019 гг</p>
        </div>
        <div class="stats" slot="footer-title">
          <i class="ti-check"></i> Data information certified
        </div>
        <div slot="footer">
          <div class="chart-legend">
            <i class="fa fa-circle text-info"></i> t&deg; окружающей среды
            <i class="fa fa-circle text-warning"></i> t&deg; элеватора на входе
          </div>
          <hr>
          <div class="stats">
            <i class="ti-check"></i> По данным статистики сервера
          </div>
        </div>
      </chart-card>
    </div>
    <div class="col-md-6">
      <chart-card :chart-data="usersChart.data" :chart-options="usersChart.options">
        <div slot="header">
          <h4 class="card-title">Подача / расход теплоэнергии</h4>
          <p class="category">Данные за сутки в среднем</p>
        </div>

        <div class="stats" slot="footer-title">
          <i class="ti-reload"></i> Обновлено в 12:00
        </div>
        <div slot="footer">
          <div class="chart-legend">
            <i class="fa fa-circle text-info"></i> Подача, кДж/ч
            <i class="fa fa-circle text-warning"></i> Расход, кДж/ч
          </div>
          <hr>
          <div class="stats">
            <i class="ti-reload"></i> Обновлено в 12:00
          </div>
        </div>
      </chart-card>
    </div>
  </div>
</template>
<script type="text/babel">
  import TimeLine from './Stats/TimeLine.vue'
  import TimeLineItem from './Stats/TimeLineItem.vue'
  import TaskList from './Stats/TaskList'
  import ChartCard from 'src/components/UIComponents/Cards/ChartCard.vue'

  export default {
    components: {
      TimeLine,
      TimeLineItem,
      ChartCard,
      TaskList
    },
    data () {
      return {
        salesChart: {
          data: {
            labels: ['Сен`18', 'Окт`18', 'Дек`18', 'Янв`19', 'Фев`19', 'Мар`19', 'Апр`19', 'Май`19'],
            series: [
              [7, 6, 14, 12, 14, -4, 8, 24],
              [-7, 18, 4, 5, 7, 10, 14, 20]
            ]
          },
          options: {
            low: -30,
            high: 30,
            seriesBarDistance: 10,
            axisX: {
              showGrid: false
            },
            height: '245px'
          }
        },
        usersChart: {
          data: {
            labels: ['9AM', '12AM', '3PM', '6PM', '9PM', '12PM', '3AM', '6AM'],
            series: [
              [287, 385, 490, 562, 594, 626, 698, 895, 952],
              [67, 152, 193, 240, 387, 435, 535, 642, 744]
            ]
          },
          options: {
            low: 0,
            high: 1000,
            showArea: true,
            height: '245px',
            axisX: {
              showGrid: false
            },
            showLine: true,
            showPoint: false
          }
        }
      }
    }
  }
</script>
<style>
</style>
