<template>
  <div v-if="show" class="sample-main">
    <div class="sample-i18n">
      {{ $t('Common.Hello') }}
    </div>
    <div class="fetch-data">{{ data }}</div>
    <div class="selector">
      {{ $t('Common.Language') }} :
      <select v-model="$i18n.locale">
        <option value="en">English</option>
        <option value="ko">한국어</option>
      </select>
    </div>
  </div>
  <div v-else></div>
</template>

<script setup lang="ts">
import {useI18n} from 'vue-i18n';

const res = await useFetch('/api/hello');

const {locale} = useI18n();
const minHeight = ref('0px');
const show = ref(false);
const data = ref(null);
data.value = res.data.value;

function init(): void {
  show.value = true;
  changeLanguage();
}

function calcMainHeight(): void {
  minHeight.value = window.innerHeight - 200 + 'px';
}

async function changeLanguage(): Promise<void> {
  const res = await useFetch(`/api/hello?lang=${locale.value}`);
  data.value = res.data.value;
}

watch(locale, async () => {
  await changeLanguage();
});

onBeforeMount(() => {
  calcMainHeight();
});

onMounted(async () => {
  await nextTick(() => {
    window.addEventListener('resize', calcMainHeight);
    init();
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', calcMainHeight);
});
</script>

<style scoped lang="scss">
.sample-main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: v-bind(minHeight);
  background-color: hsl(var(--ui-color_bg));
  transition: background-color 200ms linear;
}

.sample-i18n {
  padding: 10px;
  width: 100%;
  text-align: center;
  font-size: 50px;
}
.fetch-data {
  margin-bottom: 10px;
  font-size: 25px;
}
.selector {
  font-size: 20px;

  select {
    padding: 5px;
    border: none;
    border-radius: 5px;
    background-color: hsl(var(--ui-color_bg1));
    color: hsl(var(--ui-color_text));
    transition: background-color 200ms linear, color 200ms linear;

    &:focus {
      border: none;
      border-radius: 5px;
      outline: none;
    }
  }
}
</style>
