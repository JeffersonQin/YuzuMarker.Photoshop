function createFile() {
	// TODO
}

function openFile(path) {
	try {
		var fileRef = new File(path);
		app.open(fileRef);
		return 'success';
	} catch (err) {
		return err.description;
	}
}

function existLayerSet(layerSetName) {
	try {
		var ref = app.activeDocument.layerSets.getByName(layerSetName);
		if (ref == null) return 'false';
		return 'true';
	} catch (err) {
		return 'false';
	}
}

function existArtLayer(layerSetName, artLayerName) {
	try {
		var ref = app.activeDocument.layerSets.getByName(layerSetName).artLayers.getByName(artLayerName);
		if (ref == null) return 'false';
		return 'true';
	} catch (err) {
		return 'false';
	}
}

function addLayerSet(layerSetName) {
	try {
		var newLayerSetRef = app.activeDocument.layerSets.add();
		newLayerSetRef.name = layerSetName;
		return 'success';
	} catch (err) {
		return err.description;
	}
}

function addArtLayer(layerSetName, artLayerName) {
	try {
		var newArtLayerRef = app.activeDocument.layerSets.getByName(layerSetName).artLayers.add();
		newArtLayerRef.name = artLayerName;
		return 'success'
	} catch (err) {
		return err.description
	}
}

function removeLayerSet(layerSetName) {
	try {
		app.activeDocument.layerSets.getByName(layerSetName).remove();
		return 'success';
	} catch (err) {
		return err.description;
	}
}

function removeArtLayer(layerSetName, artLayerName) {
	try {
		app.activeDocument.layerSets.getByName(layerSetName).artLayers.getByName(artLayerName).remove();
		return 'success'
	} catch (err) {
		return err.description;
	}
}

function addTextLayer(layerSetName, artLayerName) {
	try {
		var newArtLayerRef = app.activeDocument.layerSets.getByName(layerSetName).artLayers.add();
		newArtLayerRef.name = artLayerName;
		newArtLayerRef.kind = LayerKind.TEXT;
		return 'success'
	} catch (err) {
		return err.description
	}
}

function setTextLayer(layerSetName, artLayerName) {
	try {
		app.activeDocument.layerSets.getByName(layerSetName).artLayers.getByName(artLayerName).kind = LayerKind.TEXT;
		return 'success'
	} catch (err) {
		return err.description
	}
}
