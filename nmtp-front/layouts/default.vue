<template>
    <AppNavBar />
    <main>
        <slot />
    </main>
</template>

<style>
html, body, #app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  font-family: 'Segoe UI';
  color: #10C5E1;
  background: #1C1C1F;
}
</style>