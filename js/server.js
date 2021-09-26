const port = 4016;

var csInterface = new CSInterface();

var server;

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

function repr(val) {
	return val.replace(/\\/g, '\\\\').replace(/\'/g, '\\\'').replace(/\"/g, '\\\"').replace(/\n/g, '\\n').replace(/\t/g, '\\t').replace(/\r/g, '\\r').replace(/\&/g, '\\\&');
}

function clearLog() {
	document.getElementById('log-panel').innerHTML = '';
}

function onSuccess(req, res, data, desc) {
	res.writeHead(200);
	res.end(JSON.stringify({
		'status': 'success',
		'error': '',
		'data': data
	}));
	addLog(req.url, "success", desc, null);
}

function onFail(req, res, err, desc) {
	res.writeHead(200);
	res.end(JSON.stringify({
		'status': 'failed',
		'error': err,
		'data': {}
	}));
	addLog(req.url, "error", desc, err);
}

function startServer() {
	var express = require('express');
	var app = express();

	app.get('/', function (req, res) {
		onSuccess(req, res, {}, '通信测试');
	});

	app.get('/openFile', function (req, res) {
		var params = req.query
		csInterface.evalScript("openFile('" + repr(params['path']) + "')", (ret) => {
			if (ret == 'success') {
				onSuccess(req, res, {}, '打开文件成功');
			} else {
				onFail(req, res, ret, '打开文件失败');
			}
		})
	});

	app.get('/createFile', function (req, res) {

	});

	app.get('/addlayerset', function (req, res) {
		var params = req.query
		csInterface.evalScript("addLayerSet('" + repr(params['layerSetName']) + "')", (ret) => {
			if (ret == 'success') {
				onSuccess(req, res, {}, '增加图层组成功: ' + params['layerSetName']);
			} else {
				onFail(req, res, ret, '增加图层组失败');
			}
		})
	});

	app.get('/addArtLayer', function (req, res) {

	});

	app.get('/removeLayerSet', function (req, res) {
		var params = req.query
		csInterface.evalScript("removeLayerSet('" + repr(params['layerSetName']) + "')", (ret) => {
			if (ret == 'success') {
				onSuccess(req, res, {}, '移除图层组成功: ' + params['layerSetName']);
			} else {
				onFail(req, res, ret, '移除图层组失败');
			}
		})
	});

	app.get('/removeArtLayer', function (req, res) {

	});

	app.get('/addTextLayer', function (req, res) {

	});

	app.get('/setTextLayer', function (req, res) {

	});

	server = app.listen(port, function () {
		alert('服务成功启动 http://localhost:' + port)
	});
}
