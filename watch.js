import * as esbuild from 'esbuild';

let ctx = await esbuild.context({
  entryPoints: ['app.ts'],
  entryPoints: [{ in: 'src/index.ts', out: "fsdialogs" }, { in: 'src/fsdialogs.css', out: 'fsdialogs' }],
  outdir: 'dist',
  bundle: true,
  format: 'esm',
  target: ['ES2022']
})

//await ctx.watch();
const host = "127.0.0.1";

let { port } = await ctx.serve({
  servedir: './',
  host
});

console.log(`server start: http://${host}:${port}`);