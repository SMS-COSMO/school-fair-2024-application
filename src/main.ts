import './assets/main.css';
import 'virtual:uno.css';

import { createApp } from 'vue';
import { MotionPlugin } from '@vueuse/motion';
import App from './App.vue';

const app = createApp(App);

app.use(MotionPlugin);

app.mount('#app');
