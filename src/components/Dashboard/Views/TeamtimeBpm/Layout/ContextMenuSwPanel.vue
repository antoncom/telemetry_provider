<template>
  <ul class="context-menu-list context-menu-root" :style="mStyle">
    <li class="context-menu-item  icon icon-paste"><span>Добавить новую колонку</span></li>
    <li class="context-menu-item  icon icon-delete"><span>Удалить эту колонку</span></li>
  </ul>
</template>

<script type="text/babel">
  export default {
    data () {
      return {
        mStyle: {
          x: 0,
          y: 0,
          w: 160,
          z: 1000
        }
      }
    }
  }
</script>

<style></style>