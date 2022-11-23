import glob from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import clear from 'rollup-plugin-clear';
import { eslint } from "rollup-plugin-eslint";
import { terser } from "rollup-plugin-terser";
import excludeDependenciesFromBundle from "rollup-plugin-exclude-dependencies-from-bundle";
import typescript from '@rollup/plugin-typescript';
import tsconfig from "./tsconfig.json";

const input = Object.fromEntries(
    glob.sync('src/**/*.ts').map(file => [
        path.relative('src', file.slice(0, file.length - path.extname(file).length)),
        fileURLToPath(new URL(file, import.meta.url))
    ])
);

export default [
    {
        input,
        plugins: [
            nodeResolve({ preferBuiltins: false }),
            excludeDependenciesFromBundle({
                peerDependencies: true,
            }),
            eslint({}),
            clear({ targets: ['dist/cjs'] }),
            copy({
                targets: [
                    {
                        src: 'src/index.css', dest: 'dist/cjs'
                    }
                ]
            }),
            typescript({
                ...tsconfig,
                "outDir": "./dist/cjs",
                "declaration": true
            }),
            terser({ toplevel: true }),
        ],
        output: {
            assetFileNames: "dist/cjs/[name]-[hash][extname]",
            dir: 'dist/cjs',
            format: 'cjs'
        }
    },
    {
        input,
        plugins: [
            nodeResolve({ preferBuiltins: false }),
            excludeDependenciesFromBundle({
                peerDependencies: true,
            }),
            eslint({}),
            clear({ targets: ['dist/esm'] }),
            copy({
                targets: [
                    {
                        src: 'src/index.css', dest: 'dist/esm'
                    }
                ]
            }),
            typescript({
                ...tsconfig,
                "outDir": "./dist/esm",
                "declaration": true
            }),
            terser({ module: true }),
        ],
        output: {
            assetFileNames: "dist/esm/[name]-[hash][extname]",
            dir: 'dist/esm',
            format: 'module'
        }
    },
]
