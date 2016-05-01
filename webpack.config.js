module.exports = {
	entry: './client/components/game.jsx',
	output: {filename: './client/bundle.js'},
	module: {
		loaders: [
			{
				test: /\.jsx?/, 
				loader: 'babel-loader', 
				exclude:/node_modules/,
				query: {
					presets:['es2015', 'react']
				},
				watch: true
			}
		]
	}
};