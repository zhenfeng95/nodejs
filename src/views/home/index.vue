<!-- @format -->

<template>
  <div>
    <Header></Header>
    <main class="main-wrapper">
      <Device></Device>
    </main>
    <!-- <Test></Test> -->
  </div>
</template>

<script>
import Header from '@components/header'
import Device from '@components/device'
import Test from '@components/test'
export default {
  name: 'Home',
  components: {
    Header,
    Device,
    Test
  }
}
</script>

<style lang="scss" scoped>
.main-wrapper {
  margin-top: 80px;
}
</style>
