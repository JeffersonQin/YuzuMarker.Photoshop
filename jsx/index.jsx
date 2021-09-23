function createDocument() {
	// TODO
}

function openDocument(path) {
	var fileRef = new File(path);
	app.open(fileRef);
}

function addArtLayerSet(layerSetName) {
	var newLayerSetRef = app.activeDocument.layerSets.add();
	newLayerSetRef.name = layerSetName;
}

function removeArtLayerSet(layerSetName) {
	app.activeDocument.layerSets.getByName(layerSetName).remove();
}

function test() {
	var layers = app.activeDocument.layers;
	for (var i = 0; i < layers.length; i ++) {
		alert(layers[i].name);
	}
	app.activeDocument.artLayers.add();
}
