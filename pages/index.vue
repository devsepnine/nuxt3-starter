<template>
  <div v-if="show" class="sample-main">
    <div class="sample-i18n">
      {{ $t('Common.Hello') }}
    </div>
    <div class="fetch-data">{{ data }}</div>
    <div class="selector">
      language :
      <select v-model="$i18n.locale">
        <option value="en">en</option>
        <option value="ko">ko</option>
      </select>
    </div>
  </div>
  <div v-else></div>
</template>

<script setup>
const {data} = await useFetch('/api/hello');
</script>

<script>
export default {
  data() {
    return {
      minHeight: '0px',
      data: '',
      show: false,
    };
  },
  beforeMount() {
    this.calcMainHeight();
  },
  async mounted() {
    await this.$nextTick(() => {
      window.addEventListener('resize', this.calcMainHeight);
      this.init();
    });
  },
  methods: {
    init() {
      this.changeLanguage();
      this.show = true;
    },

    calcMainHeight() {
      this.minHeight = window.innerHeight - 200 + 'px';
    },

    async changeLanguage() {
      const {data} = await useFetch(`/api/hello?lang=${this.$i18n.locale}`);
      this.data = data.value;
    },
  },
  watch: {
    '$i18n.locale': async function () {
      await this.changeLanguage();
    },
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.calcMainHeight);
  },
};
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
}
</style>
