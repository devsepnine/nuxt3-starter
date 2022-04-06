<template>
  <div class="main">
    <layout-header />
    <slot />
    <layout-footer />
  </div>
</template>

<script setup lang="ts">
import LayoutFooter from '~/components/LayoutFooter.vue';
import LayoutHeader from '~/components/LayoutHeader.vue';
import {useI18n} from 'vue-i18n';

const theme = useCookie('theme');
const {locale} = useI18n();

useHead({
  bodyAttrs: {
    'data-theme': theme.value,
  },
});

onMounted(() => {
  let lo = navigator.language.substring(0, 2);

  switch (lo) {
    case 'ko':
      break;
    default:
      lo = 'en';
  }
  locale.value = lo;
});
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  height: 100%;
}
</style>
