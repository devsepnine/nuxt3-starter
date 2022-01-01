<template>
  <div class='sample-main'>
    <div class='sample-i18n'>
      {{ $t('Common.Hello') }}
      <div>
        <select v-model='$i18n.locale'>
          <option value='en'>en</option>
          <option value='ko'>ko</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      minHeight: '0px',
    };
  },
  beforeMount() {
    this.calcMainHeight();
  },
  mounted() {
    window.addEventListener('resize', this.calcMainHeight)
  },
  methods: {
    calcMainHeight() {
      this.minHeight = window.innerHeight - 200 + 'px';
    }
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.calcMainHeight)
  }
};
</script>

<style scoped lang='scss'>
.sample-main {
  min-height: v-bind(minHeight);
  background-color: $bodyColor;
}

.sample-i18n {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 100%;
  text-align: center;

  select {
    margin: 0 10px;
  }
}
</style>