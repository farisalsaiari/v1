import { defineConfig, PluginOption } from 'vite';
import dts from 'vite-plugin-dts';
import preact from '@preact/preset-vite';

export default defineConfig({
    plugins: [
        preact() as PluginOption,
        dts({
            insertTypesEntry: true,
        }) as PluginOption,
    ],
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'UiShared',
            formats: ['es', 'cjs'],
            fileName: (format) => `index.${format}.js`,
        },
        rollupOptions: {
            external: ['preact', 'clsx'],
            output: {
                globals: {
                    preact: 'Preact',
                    clsx: 'clsx',
                },
            },
        },
    },
});
