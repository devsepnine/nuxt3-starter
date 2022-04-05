<template>
  <footer>
    Footer
    <button @click="toggleTheme">
      {{ theme ? 'dark' : 'light' }}
    </button>
  </footer>
</template>
<script lang="ts">
export default {
  data() {
    return {
      theme: '',
      matchTheme: null,
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.updateTheme();
      this.matchTheme = window.matchMedia('(prefers-color-scheme: dark)');
      this.matchTheme.addEventListener('change', this.logON);
    });
  },

  methods: {
    updateTheme: function (): void {
      this.theme = this.getTheme;
    },
    toggleTheme: function (): void {
      this.theme = !this.theme;
      const t = useCookie('theme');
      t.value = this.theme ? 'dark' : 'light';
      useMeta({
        bodyAttrs: {
          'data-theme': t.value,
        },
      });
    },
  },

  computed: {
    getTheme(): boolean {
      if (typeof window !== undefined) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      } else {
        return false;
      }
    },
  },

  beforeUnmount() {
    this.matchTheme.removeEventListener('change', this.logON);
  },
};
</script>
<style scoped lang="scss">
footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  min-height: 100px;
  background-color: hsl(var(--ui-color_subbg));
  transition: background-color 200ms linear;

  button {
    padding: 5px;
    border: 2px solid hsl(var(--ui-color_bg));
    color: hsl(var(--ui-color_text));
    background-color: hsl(var(--ui-color_subbg));
  }
}
</style>
