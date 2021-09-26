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

function addLayerSet(layerSetName) {
	try {
		var newLayerSetRef = app.activeDocument.layerSets.add();
		newLayerSetRef.name = layerSetName;
		return 'success';
	} catch (err) {
		return err.description;
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
