<template>
  <div class='main'>
    <Header />
    <slot />
    <Footer />
  </div>
</template>

<script setup>
import Footer from '~/components/Footer.vue';
import Header from '~/components/Header.vue';
</script>
<script>
export default {
  mounted() {
    let locale = navigator.language.substring(0, 2);
    switch (locale) {
      case 'ko':
        break;
      default:
        locale ='en';
    }
    this.$i18n.locale = locale;
  },
};
</script>
<style scoped lang='scss'>
.main {
  width: 100%;
  height: 100%;
}
</style>
