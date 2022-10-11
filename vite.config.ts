import { UserConfig, defineConfig, splitVendorChunkPlugin } from 'vite'
import { resolve } from 'path'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'
import timeReporter from 'vite-plugin-time-reporter'
import { config, DDEV_HMR_PORT } from './vite.website.js'

const configuration: UserConfig = {
    /**
     * Using /dist/ since we also serve TYPO3 inside /public
     * and using the build.emptyOutDir option, TYPO3-related files
     * might be wiped out as well during development/production builds.
     * Thus you shouldn't touch this unless you know what you're about to do.
     */
    base: '/dist/',

    plugins: [
        viteCommonjs(),
        splitVendorChunkPlugin(),
        timeReporter(),
    ],

    css: {
        postcss: {
            plugins: [
                require('autoprefixer'),
            ],
        },
    },

    build: {
        target: config.target,
        outDir: resolve(__dirname, config.outDir),
        emptyOutDir: true,
        manifest: true,
        sourcemap: true,
        watch: {
            include: config.watchIncludes
        },
        rollupOptions: {
            input: [`./${config.entry}`],
            output: {
                inlineDynamicImports: false,
                chunkFileNames: '[name].js',
                entryFileNames: 'iife.js',

                manualChunks(id) {
                    if (id.includes('/src/JavaScript/')) {
                        return ''
                    }
                }
            }
        },
    },

    // HMR server-port which is exposed by ddev-local in .ddev/docker-compose.hmr.yaml
    server: {
        port: DDEV_HMR_PORT,

        // WSL2 support
        watch: {
            usePolling: true,
        },
    },
}

export default defineConfig(configuration)
