import { defineConfig } from '@rsbuild/core';
import { pluginVue } from '@rsbuild/plugin-vue';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';

export default defineConfig({
  server: {
    port: 3000, // 开发服务器端口
  },
  dev: {
    assetPrefix: 'http://localhost:3000',
  },
  tools: {
    rspack: (config, { appendPlugins }) => {
      config.output.uniqueName = 'remote_vue';
      appendPlugins([
        new ModuleFederationPlugin({
          name: 'remote_vue',
          exposes: {
            './button': './src/Button.vue',
          },
          shared: ['vue'],
        }),
      ]);
    },
  },
  plugins: [pluginVue()],
});
