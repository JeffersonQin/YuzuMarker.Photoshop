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
		onSuccess(req, res, {}, '????????????');
	});

	/*
	* [Deprecated] Old API Section Start
	*/

	app.get('/existLayerSet', function (req, res) {
		var params = req.query;
		csInterface.evalScript("existLayerSet('" + repr(params['layerSetName']) + "')", (ret) => {
			if (ret == 'true') {
				onSuccess(req, res, {'exist': true}, '???????????????: ' + params['layerSetName']);
			} else {
				onSuccess(req, res, {'exist': false}, '??????????????????: ' + params['layerSetName']);
			}
		});
	});

	app.get('/existArtLayer', function (req, res) {
		var params = req.query;
		csInterface.evalScript("existArtLayer('" + repr(params['layerSetName']) + "', '" + repr(params['artLayerName']) + "')", (ret) => {
			if (ret == 'true') {
				onSuccess(req, res, {'exist': true}, '????????????: ' + params['layerSetName'] + '/' + params['artLayerName']);
			} else {
				onSuccess(req, res, {'exist': false}, '???????????????: ' + params['layerSetName'] + '/' + params['artLayerName']);
			}
		});
	});

	app.get('/createFile', function (req, res) {

	});

	app.get('/addlayerset', function (req, res) {
		var params = req.query;
		csInterface.evalScript("addLayerSet('" + repr(params['layerSetName']) + "')", (ret) => {
			if (ret == 'success') {
				onSuccess(req, res, {}, '?????????????????????: ' + params['layerSetName']);
			} else {
				onFail(req, res, ret, '?????????????????????');
			}
		});
	});

	app.get('/addArtLayer', function (req, res) {
		var params = req.query;
		csInterface.evalScript("addArtLayer('" + repr(params['layerSetName']) + "', '" + repr(params['artLayerName']) + "')", (ret) => {
			if (ret == 'success') {
				onSuccess(req, res, {}, '??????????????????: ' + params['layerSetName'] + '/' + params['artLayerName']);
			} else {
				onFail(req, res, ret, '??????????????????');
			}
		});
	});

	app.get('/removeLayerSet', function (req, res) {
		var params = req.query;
		csInterface.evalScript("removeLayerSet('" + repr(params['layerSetName']) + "')", (ret) => {
			if (ret == 'success') {
				onSuccess(req, res, {}, '?????????????????????: ' + params['layerSetName']);
			} else {
				onFail(req, res, ret, '?????????????????????');
			}
		});
	});

	app.get('/removeArtLayer', function (req, res) {
		var params = req.query;
		csInterface.evalScript("removeArtLayer('" + repr(params['layerSetName']) + "', '" + repr(params['artLayerName']) + "')", (ret) => {
			if (ret == 'success') {
				onSuccess(req, res, {}, '??????????????????: ' + params['layerSetName'] + '/' + params['artLayerName']);
			} else {
				onFail(req, res, ret, '??????????????????');
			}
		});
	});

	app.get('/addTextLayer', function (req, res) {
		var params = req.query;
		csInterface.evalScript("addTextLayer('" + repr(params['layerSetName']) + "', '" + repr(params['artLayerName']) + "')", (ret) => {
			if (ret == 'success') {
				onSuccess(req, res, {}, '????????????????????????: ' + params['layerSetName'] + '/' + params['artLayerName']);
			} else {
				onFail(req, res, ret, '????????????????????????');
			}
		});
	});

	app.get('/setTextLayer', function (req, res) {
		var params = req.query;
		csInterface.evalScript("setTextLayer('" + repr(params['layerSetName']) + "', '" + repr(params['artLayerName']) + "')", (ret) => {
			if (ret == 'success') {
				onSuccess(req, res, {}, '????????????????????????: ' + params['layerSetName'] + '/' + params['artLayerName']);
			} else {
				onFail(req, res, ret, '????????????????????????');
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
				onSuccess(req, res, {'exist': true}, '????????????: ' + params['artLayerPath']);
			} else {
				onSuccess(req, res, {'exist': false}, '???????????????: ' + params['artLayerPath']);
			}
		});
	});

	app.get('/existLayerSetURI', function (req, res) {
		var params = req.query;
		csInterface.evalScript("existLayerSetURI('" + repr(params['layerSetPath']) + "')", (ret) => {
			if (ret == 'true') {
				onSuccess(req, res, {'exist': true}, '???????????????: ' + params['layerSetPath']);
			} else {
				onSuccess(req, res, {'exist': false}, '??????????????????: ' + params['layerSetPath']);
			}
		});
	});

	app.get('/createArtLayerIfNotExistByURI', function (req, res) {
		var params = req.query;
		csInterface.evalScript("createArtLayerIfNotExistByURI('" + repr(params['artLayerPath']) + "')", (ret) => {
			if (ret == 'success') {
				onSuccess(req, res, {}, '??????????????????: ' + params['artLayerPath']);
			} else {
				onFail(req, res, ret, '??????????????????: ' + params['artLayerPath']);
			}
		});
	});

	app.get('/createLayerSetIfNotExistByURI', function (req, res) {
		var params = req.query;
		csInterface.evalScript("createLayerSetIfNotExistByURI('" + repr(params['layerSetPath']) + "')", (ret) => {
			if (ret == 'success') {
				onSuccess(req, res, {}, '?????????????????????: ' + params['layerSetPath']);
			} else {
				onFail(req, res, ret, '?????????????????????: ' + params['layerSetPath']);
			}
		});
	});

	app.get('/openFile', function (req, res) {
		var params = req.query;
		csInterface.evalScript("openFile('" + repr(params['path']) + "')", (ret) => {
			if (ret == 'success') {
				onSuccess(req, res, {}, '??????????????????: ' + params['path']);
			} else {
				onFail(req, res, ret, '??????????????????: ' + params['path']);
			}
		});
	});

	app.get('/saveFileAs', function (req, res) {
		var params = req.query;
		csInterface.evalScript("saveFileAs('" + repr(params['path']) + "')", (ret) => {
			if (ret == 'success') {
				onSuccess(req, res, {}, '?????????????????????: ' + params['path']);
			} else {
				onFail(req, res, ret, '?????????????????????: ' + params['path']);
			}
		});
	});

	app.get('/applyMask', function (req, res) {
		csInterface.evalScript("applyMask()", (ret) => {
			if (ret == 'success') {
				onSuccess(req, res, {}, '??????????????????');
			} else {
				onFail(req, res, ret, '??????????????????');
			}
		});
	});

	app.get('/performSelection', function (req, res) {
		var params = req.query;
		csInterface.evalScript("performSelection('" + repr(params['points']) + "')", (ret) => {
			if (ret == 'success') {
				onSuccess(req, res, {}, '??????????????????');
			} else {
				onFail(req, res, ret, '??????????????????');
			}
		});
	});

	app.get('/performRasterization', function (req, res) {
		csInterface.evalScript("performRasterization()", (ret) => {
			if (ret == 'success') {
				onSuccess(req, res, {}, '???????????????????????????');
			} else {
				onFail(req, res, ret, '???????????????????????????');
			}
		});
	});

	app.get('/performChannelSelection', function (req, res) {
		csInterface.evalScript("performChannelSelection()", (ret) => {
			if (ret == 'success') {
				onSuccess(req, res, {}, '????????????????????????');
			} else {
				onFail(req, res, ret, '????????????????????????');
			}
		});
	});

	app.get('/renameBackgroundTo', function (req, res) {
		var params = req.query;
		csInterface.evalScript("renameBackgroundTo('" + repr(params['newName']) + "')", (ret) => {
			if (ret == 'success') {
				onSuccess(req, res, {}, '???????????????????????????');
			} else {
				onFail(req, res, ret, '???????????????????????????');
			}
		});
	});

	app.get('/deleteArtLayerByURI', function (req, res) {
		var params = req.query;
		csInterface.evalScript("deleteArtLayerByURI('" + repr(params['artLayerPath']) + "')", (ret) => {
			if (ret == 'success') {
				onSuccess(req, res, {}, '??????????????????: ' + params['artLayerPath']);
			} else {
				onFail(req, res, ret, '??????????????????: ' + params['artLayerPath']);
			}
		});
	});

	app.get('/deleteLayerSetByURI', function (req, res) {
		var params = req.query;
		csInterface.evalScript("deleteLayerSetByURI('" + repr(params['layerSetPath']) + "')", (ret) => {
			if (ret == 'success') {
				onSuccess(req, res, {}, '?????????????????????: ' + params['layerSetPath']);
			} else {
				onFail(req, res, ret, '?????????????????????: ' + params['layerSetPath']);
			}
		});
	});

	app.get('/selectArtLayerByURI', function (req, res) {
		var params = req.query;
		csInterface.evalScript("selectArtLayerByURI('" + repr(params['artLayerPath']) + "')", (ret) => {
			if (ret == 'success') {
				onSuccess(req, res, {}, '??????????????????: ' + params['artLayerPath']);
			} else {
				onFail(req, res, ret, '??????????????????: ' + params['artLayerPath']);
			}
		});
	});

	app.get('/selectLayerSetByURI', function (req, res) {
		var params = req.query;
		csInterface.evalScript("selectLayerSetByURI('" + repr(params['layerSetPath']) + "')", (ret) => {
			if (ret == 'success') {
				onSuccess(req, res, {}, '?????????????????????: ' + params['layerSetPath']);
			} else {
				onFail(req, res, ret, '?????????????????????: ' + params['layerSetPath']);
			}
		});
	});

	app.get('/importImage', function (req, res) {
		var params = req.query;
		csInterface.evalScript("importImage('" + repr(params['fileName']) + "')", (ret) => {
			if (ret == 'success') {
				onSuccess(req, res, {}, '??????????????????: ' + params['fileName']);
			} else {
				onFail(req, res, ret, '??????????????????: ' + params['fileName']);
			}
		});
	});

	app.get('/duplicateAndSelectArtLayerByURI', function (req, res) {
		var params = req.query;
		csInterface.evalScript("duplicateAndSelectArtLayerByURI('" + repr(params['sourcePath']) + "', '" + repr(params['targetDir']) + "', '" + repr(params['targetName']) + "')", (ret) => {
			if (ret == 'success') {
				onSuccess(req, res, {}, '???????????????????????????: \n' + params['sourcePath'] + " => " + params['targetDir'] + '/' + params['targetName']);
			} else {
				onFail(req, res, ret, '???????????????????????????: ' + params['sourcePath'] + " => " + params['targetDir'] + '/' + params['targetName']);
			}
		});
	});

	app.get('/performRgbChannelSelection', function (req, res) {
		csInterface.evalScript("performRgbChannelSelection()", (ret) => {
			if (ret == 'success') {
				onSuccess(req, res, {}, '??????RGB????????????');
			} else {
				onFail(req, res, ret, '??????RGB????????????');
			}
		});
	});

	server = app.listen(port, function () {
		alert('?????????????????? http://localhost:' + port);
	});
}
