import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
export default {
    input: './src/index.js',
    output: {
        format: 'umd',
        name: 'Vue',
        file: 'dist/umd/vue.js',
        sourcemap: true
    },
    plugins: [
        babel({
            exclude: 'node_mudules/**'
        }),
        serve({
            open: true,
            port: 8080,
            contentBase: '',
            openPage: '/index.html'
        }),
        commonjs()
    ]
}