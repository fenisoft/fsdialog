//const esbuild = require('esbuild');
import * as esbuild from 'esbuild'

// import pkg from 'esbuild';
// const { esbuild } = pkg;
// //import { esbuild } from 'esbuild';
//import process from 'node:process';

await esbuild.build({
    entryPoints: ['src/fsdialogs.ts', 'src/fsdialogs.css'],
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
        { out: 'fsdialog.min', in: 'src/fsdialogs.ts' },
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
        { out: 'fsdialog.global', in: 'src/fsdialogs.ts' },
    ],
    outdir: 'dist',
    bundle: true,
    sourcemap: false,
    minify: false,
    globalName:'fsdialog',
    format: 'iife',
    target: ['ES2022']
})

await esbuild.build({
    entryPoints: [
        { out: 'fsdialog.global.min', in: 'src/fsdialogs.ts' },
    ],
    outdir: 'dist',
    bundle: true,
    sourcemap: false,
    minify: true,
    globalName:'fsdialog',
    format: 'iife',
    target: ['ES2022']
})
// .catch(() => process.exit(1));