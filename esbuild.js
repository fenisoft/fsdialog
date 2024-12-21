//const esbuild = require('esbuild');
import * as esbuild from 'esbuild'

await esbuild.build({
    entryPoints: [{ in: 'src/index.ts', out: "fsdialogs" }, { in: 'src/fsdialogs.css', out: 'fsdialogs' }],
    outdir: 'dist',
    bundle: true,
    sourcemap: true,
    minify: false,
    splitting: true,
    format: 'esm',
    target: ['ES2022'],
    banner: {
        js: `
/**  
 * @author Alessandro Batisti <fenisoft@gmail.com>  
 * @version 0.2.2
 * {@link https://github.com/fenisoft/fsdialog GitHub}.
 */`,
        css: '/* https://github.com/fenisoft/fsdialog  */',
    },
})

await esbuild.build({
    entryPoints: [
        { out: 'fsdialogs.min', in: 'src/index.ts' },
        { in: 'src/fsdialogs.css', out: 'fsdialogs.min' }
    ],
    outdir: 'dist',
    bundle: true,
    sourcemap: false,
    minify: true,
    format: 'esm',
    target: ['ES2022'],
    banner: {
        js: `
/**  
 * @author Alessandro Batisti <fenisoft@gmail.com>  
 * @version 0.2.2
 * {@link https://github.com/fenisoft/fsdialog GitHub}.
 */`,
        css: '/* https://github.com/fenisoft/fsdialog  */',
    },
})


await esbuild.build({
    entryPoints: [
        { out: 'fsdialogs.global', in: 'src/index.ts' },
    ],
    outdir: 'dist',
    bundle: true,
    sourcemap: false,
    minify: false,
    globalName: 'fsdialog',
    format: 'iife',
    target: ['ES2022'],
    banner: {
        js: `
/**  
 * @author Alessandro Batisti <fenisoft@gmail.com>  
 * @version 0.2.2
 * {@link https://github.com/fenisoft/fsdialog GitHub}.
 */`,
        css: '/* https://github.com/fenisoft/fsdialog  */',
    },
})

await esbuild.build({
    entryPoints: [
        { out: 'fsdialogs.global.min', in: 'src/index.ts' },
    ],
    outdir: 'dist',
    bundle: true,
    sourcemap: false,
    minify: true,
    globalName: 'fsdialog',
    format: 'iife',
    target: ['ES2022'],
    banner: {
        js: `
/**  
 * @author Alessandro Batisti <fenisoft@gmail.com>  
 * @version 0.2.2
 * {@link https://github.com/fenisoft/fsdialog GitHub}.
 */`,
        css: '/* https://github.com/fenisoft/fsdialog  */',
    },
})
// .catch(() => process.exit(1));