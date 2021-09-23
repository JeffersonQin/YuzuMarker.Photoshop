const port = 4016;

var csInterface = new CSInterface();

function addLog(url, status, desc, inf) {
	var logCell = document.createElement('div');

	var timeSpan = document.createElement('span')
	timeSpan.className = 'log-time';
	timeSpan.textContent = new Date().toLocaleString() + ': ';
	var titleSpan = document.createElement('span');
	titleSpan.className = 'log-title';
	titleSpan.textContent = desc;
	
	var titleDiv = document.createElement('div');
	titleDiv.appendChild(timeSpan);
	titleDiv.appendChild(titleSpan);
	
	var urlDiv = document.createElement('div');
	urlDiv.textContent = url;
	urlDiv.className = 'log-url';

	var statusDiv = document.createElement('div');
	statusDiv.textContent = status;
	if (status == 'success') statusDiv.className = 'log-success';
	else if (status == 'error') statusDiv.className = 'log-error';

	logCell.appendChild(titleDiv);
	logCell.appendChild(urlDiv);
	logCell.appendChild(statusDiv);

	if (inf != null) {
		var infDiv = document.createElement('div');
		infDiv.textContent = inf;
		infDiv.className = 'log-inf'
		logCell.appendChild(infDiv);
	}

	logCell.appendChild(document.createElement('hr'));

	document.getElementById('log-panel').appendChild(logCell);
	window.scrollTo(0, document.documentElement.scrollHeight);
}

function clearLog() {
	document.getElementById('log-panel').innerHTML = '';
}

function startServer() {
	var express = require('express');
	var app = express();

	app.get('/', function (req, res) {
		res.writeHead(200);
		res.end(JSON.stringify({
			'status': 'success',
			'message': 'Hello World!',
			'data': {}
		}));
		addLog(req.url, "success", "通信测试", null);
	})

	app.get('/')

	var server = app.listen(port, function () {
		alert('服务成功启动 http://localhost:' + port)
	})
}
