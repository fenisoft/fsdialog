//const esbuild = require('esbuild');
import * as esbuild from 'esbuild'



await esbuild.build({
    entryPoints: [{ in: 'src/index.ts', out: "fsdialog" }, { in: 'src/fsdialogs.css', out: 'fsdialogs' }],
    outdir: 'dist',
    bundle: true,
    sourcemap: true,
    minify: false,
    splitting: true,
    format: 'esm',
    target: ['ES2022']
})

await esbuild.build({
    entryPoints: [
        { out: 'fsdialog.min', in: 'src/index.ts' },
    ],
    outdir: 'dist',
    bundle: true,
    sourcemap: false,
    minify: true,
    format: 'esm',
    target: ['ES2022']
})


await esbuild.build({
    entryPoints: [
        { out: 'fsdialog.global', in: 'src/index.ts' },
    ],
    outdir: 'dist',
    bundle: true,
    sourcemap: false,
    minify: false,
    globalName: 'fsdialog',
    format: 'iife',
    target: ['ES2022']
})

await esbuild.build({
    entryPoints: [
        { out: 'fsdialog.global.min', in: 'src/index.ts' },
    ],
    outdir: 'dist',
    bundle: true,
    sourcemap: false,
    minify: true,
    globalName: 'fsdialog',
    format: 'iife',
    target: ['ES2022']
})
// .catch(() => process.exit(1));