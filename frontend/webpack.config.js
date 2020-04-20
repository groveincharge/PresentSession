var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    module: {
        rules: [
              {
                test: /\.jsx?$/,
                loader: 'babel-loader'
               },
               {
                 test: /\.css$/,
                  use: [
                    'style-loader',
                    'css-loader',
                     ],
                  },
                  {
                   test: /\.(png|svg|jpg|JPG|gif)$/,
                    use: [
                      'file-loader',
                      ],
                  }
                ]
             },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    })],
    devServer: {
        historyApiFallback: true
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://localhost:7000'
        })
    }
}