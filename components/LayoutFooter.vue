<template>
  <footer>
    <span class="desc">Footer</span>
    <button @click="clickToggleTheme">
      {{ theme ? 'dark' : 'light' }}
    </button>
  </footer>
</template>

<script setup lang="ts">
const theme = ref(null);
const matchTheme = ref(null);

const statusTheme = computed(() => {
  if (typeof window !== undefined) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  } else {
    return false;
  }
});

function updateTheme(): void {
  const ct = useCookie('theme');
  if (ct.value) {
    theme.value = ct.value === 'dark';
  } else {
    theme.value = statusTheme.value;
  }
}

function clickToggleTheme(): void {
  matchTheme.value.removeEventListener('change', toggleTheme);
  toggleTheme();
}

function toggleTheme(): void {
  theme.value = !theme.value;
  const t = useCookie('theme');
  t.value = theme.value ? 'dark' : 'light';
  useHead({
    bodyAttrs: {
      'data-theme': t.value,
    },
  });
}

onMounted(() => {
  nextTick(() => {
    updateTheme();
    matchTheme.value = window.matchMedia('(prefers-color-scheme: dark)');
    matchTheme.value.addEventListener('change', toggleTheme);
  });
});

onBeforeUnmount(() => {
  matchTheme.value.removeEventListener('change', toggleTheme);
});
</script>

<style scoped lang="scss">
footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100px;
  background-color: hsl(var(--ui-color_bg1));
  transition: background-color 200ms linear;

  .desc {
    margin-bottom: 5px;
  }

  button {
    padding: 5px 10px;
    border: 2px solid hsl(var(--ui-color_bg));
    color: hsl(var(--ui-color_text));
    background-color: hsl(var(--ui-color_bg2));
    transition: background-color 200ms linear, color 200ms linear, border 200ms linear;
  }
}
</style>
