<!-- @format -->

<template>
  <div>
    <Header></Header>
    <main class="main-wrapper">
      <Device></Device>
    </main>
  </div>
</template>

<script>
import Header from "@components/header";
import Device from "@components/device";
export default {
  name: "Home",
  components: {
    Header,
    Device
  }
};
</script>

<style lang="scss" scoped>
.main-wrapper {
  margin-top: 80px;
}
</style>
