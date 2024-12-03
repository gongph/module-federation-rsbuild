<template>
  <div class="content">
    <h1>Host vue</h1>
    <remote-vue></remote-vue>
    <Hello />
  </div>
</template>

<script setup>
import { ref, h } from 'vue';
import remoteVue from 'remote_vue/button';
import Hello from './hello';
// const ele = h(React.createElement('div', null, 'Hello, React!'));
console.log('ele :>> ', Hello);
</script>

<style scoped>
.content {
  display: flex;
  min-height: 100vh;
  line-height: 1.1;
  text-align: center;
  flex-direction: column;
  justify-content: center;
}

.content h1 {
  font-size: 3.6rem;
  font-weight: 700;
}

.content p {
  font-size: 1.2rem;
  font-weight: 400;
  opacity: 0.5;
}
</style>
