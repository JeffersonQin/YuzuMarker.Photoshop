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

	/*
	* [Deprecated] Old API Section Start
	*/

	app.get('/existLayerSet', function (req, res) {
		var params = req.query;
		csInterface.evalScript("existLayerSet('" + repr(params['layerSetName']) + "')", (ret) => {
			if (ret == 'true') {
				onSuccess(req, res, {'exist': true}, '图层组存在: ' + params['layerSetName']);
			} else {
				onSuccess(req, res, {'exist': false}, '图层组不存在: ' + params['layerSetName']);
			}
		});
	});

	app.get('/existArtLayer', function (req, res) {
		var params = req.query;
		csInterface.evalScript("existArtLayer('" + repr(params['layerSetName']) + "', '" + repr(params['artLayerName']) + "')", (ret) => {
			if (ret == 'true') {
				onSuccess(req, res, {'exist': true}, '图层存在: ' + params['layerSetName'] + '/' + params['artLayerName']);
			} else {
				onSuccess(req, res, {'exist': false}, '图层不存在: ' + params['layerSetName'] + '/' + params['artLayerName']);
			}
		});
	});

	app.get('/createFile', function (req, res) {

	});

	app.get('/addlayerset', function (req, res) {
		var params = req.query;
		csInterface.evalScript("addLayerSet('" + repr(params['layerSetName']) + "')", (ret) => {
			if (ret == 'success') {
				onSuccess(req, res, {}, '增加图层组成功: ' + params['layerSetName']);
			} else {
				onFail(req, res, ret, '增加图层组失败');
			}
		});
	});

	app.get('/addArtLayer', function (req, res) {
		var params = req.query;
		csInterface.evalScript("addArtLayer('" + repr(params['layerSetName']) + "', '" + repr(params['artLayerName']) + "')", (ret) => {
			if (ret == 'success') {
				onSuccess(req, res, {}, '增加图层成功: ' + params['layerSetName'] + '/' + params['artLayerName']);
			} else {
				onFail(req, res, ret, '增加图层失败');
			}
		});
	});

	app.get('/removeLayerSet', function (req, res) {
		var params = req.query;
		csInterface.evalScript("removeLayerSet('" + repr(params['layerSetName']) + "')", (ret) => {
			if (ret == 'success') {
				onSuccess(req, res, {}, '移除图层组成功: ' + params['layerSetName']);
			} else {
				onFail(req, res, ret, '移除图层组失败');
			}
		});
	});

	app.get('/removeArtLayer', function (req, res) {
		var params = req.query;
		csInterface.evalScript("removeArtLayer('" + repr(params['layerSetName']) + "', '" + repr(params['artLayerName']) + "')", (ret) => {
			if (ret == 'success') {
				onSuccess(req, res, {}, '移除图层成功: ' + params['layerSetName'] + '/' + params['artLayerName']);
			} else {
				onFail(req, res, ret, '移除图层失败');
			}
		});
	});

	app.get('/addTextLayer', function (req, res) {
		var params = req.query;
		csInterface.evalScript("addTextLayer('" + repr(params['layerSetName']) + "', '" + repr(params['artLayerName']) + "')", (ret) => {
			if (ret == 'success') {
				onSuccess(req, res, {}, '增加文字图层成功: ' + params['layerSetName'] + '/' + params['artLayerName']);
			} else {
				onFail(req, res, ret, '增加文字图层失败');
			}
		});
	});

	app.get('/setTextLayer', function (req, res) {
		var params = req.query;
		csInterface.evalScript("setTextLayer('" + repr(params['layerSetName']) + "', '" + repr(params['artLayerName']) + "')", (ret) => {
			if (ret == 'success') {
				onSuccess(req, res, {}, '设置文字图层成功: ' + params['layerSetName'] + '/' + params['artLayerName']);
			} else {
				onFail(req, res, ret, '设置文字图层失败');
			}
		});
	});

	/*
	* [Deprecated] Old API Section End
	*/

	app.get('/existArtLayerURI', function (req, res) {
		var params = req.query;
		csInterface.evalScript("existArtLayerURI('" + repr(params['artLayerPath']) + "')", (ret) => {
			if (ret == 'true') {
				onSuccess(req, res, {'exist': true}, '图层存在: ' + params['artLayerPath']);
			} else {
				onSuccess(req, res, {'exist': false}, '图层不存在: ' + params['artLayerPath']);
			}
		});
	});

	app.get('/existLayerSetURI', function (req, res) {
		var params = req.query;
		csInterface.evalScript("existLayerSetURI('" + repr(params['layerSetPath']) + "')", (ret) => {
			if (ret == 'true') {
				onSuccess(req, res, {'exist': true}, '图层组存在: ' + params['layerSetPath']);
			} else {
				onSuccess(req, res, {'exist': false}, '图层组不存在: ' + params['layerSetPath']);
			}
		});
	});

	app.get('/createArtLayerIfNotExistByURI', function (req, res) {
		var params = req.query;
		csInterface.evalScript("createArtLayerIfNotExistByURI('" + repr(params['artLayerPath']) + "')", (ret) => {
			if (ret == 'success') {
				onSuccess(req, res, {}, '增加图层成功: ' + params['artLayerPath']);
			} else {
				onFail(req, res, ret, '增加图层失败: ' + params['artLayerPath']);
			}
		});
	});

	app.get('/createLayerSetIfNotExistByURI', function (req, res) {
		var params = req.query;
		csInterface.evalScript("createLayerSetIfNotExistByURI('" + repr(params['layerSetPath']) + "')", (ret) => {
			if (ret == 'success') {
				onSuccess(req, res, {}, '增加图层组成功: ' + params['layerSetPath']);
			} else {
				onFail(req, res, ret, '增加图层组失败: ' + params['layerSetPath']);
			}
		});
	});

	app.get('/openFile', function (req, res) {
		var params = req.query;
		csInterface.evalScript("openFile('" + repr(params['path']) + "')", (ret) => {
			if (ret == 'success') {
				onSuccess(req, res, {}, '打开文件成功: ' + params['path']);
			} else {
				onFail(req, res, ret, '打开文件失败: ' + params['path']);
			}
		});
	});

	app.get('/saveFileAs', function (req, res) {
		var params = req.query;
		csInterface.evalScript("saveFileAs('" + repr(params['path']) + "')", (ret) => {
			if (ret == 'success') {
				onSuccess(req, res, {}, '另存为文件成功: ' + params['path']);
			} else {
				onFail(req, res, ret, '另存为文件失败: ' + params['path']);
			}
		});
	});

	server = app.listen(port, function () {
		alert('服务成功启动 http://localhost:' + port);
	});
}
