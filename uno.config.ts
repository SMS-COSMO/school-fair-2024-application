import { defineConfig } from 'unocss';
import presetUno from '@unocss/preset-uno';

export default defineConfig({
  presets: [
    presetUno(),
  ],
  theme: {
    breakpoints: {
      sm: '320px',
      md: '640px',
    },
  }
});
