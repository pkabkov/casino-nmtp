<template>
    <AppNavBar />
    <main>
        <slot />
    </main>
</template>

<style>
html, body, #app {
  flex: 1;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  font-family: 'Segoe UI';
  color: var(--cyan);
  background: var(--charcoal-grey);
}
</style>