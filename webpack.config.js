module.exports = {
    entry: './src/index.tsx',
    output: {
        path: __dirname + '/public',
        filename: 'build/index.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', 'css', 'svg'],
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'ts-loader' },
            {
                test: /\.css?$/,
                use: [
                    // The `injectType`  option can be avoided because it is default behaviour
                    { loader: 'style-loader' },
                    'css-loader',
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {},
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader'],
            },
        ],
    },
};
