module.exports = {
    configureWebpack: (config) => {
        config.module.rules.push(
            {
                test: /\.vue$/,
                use: [
                    // {
                    //     loader: 'vue-loader',
                    //     options: {}
                    // },
                    {
                        loader: 'iview-loader',
                        options: {
                            prefix: false
                        }
                    }
                ]
            }
        )
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: []
        }
    }
}
