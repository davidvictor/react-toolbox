const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.development');

const app = express();
const compiler = webpack(config);

const port     = 4000;

app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function (req, res) {
	res.sendFile(path.join(__dirname, './spec/index.html'));
});

app.listen(port, '0.0.0.0', function (err) {
	if (err) {
		console.log(err);
		return;
	}

	console.log('Listening at http://0.0.0.0:' + port);
});
