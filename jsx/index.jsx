/*
 * [Deprecated] Old API Section Start
 */

function createFile() {
	// TODO
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

/*
 * [Deprecated] Old API Section End
 */


/*
 * private helping function Section Start
 */

function getArtLayerInLayerSet(layerSet, artLayerName) {
	try {
		return layerSet.artLayers.getByName(artLayerName);
	} catch (e) {
		return null;
	}
}

function getLayerSetInLayerSet(layerSet, layerSetName) {
	try {
		return layerSet.layerSets.getByName(layerSetName);
	} catch (e) {
		return null;
	}
}

function createArtLayerInLayerSet(layerSet, artLayerName) {
	var newArtLayerRef = layerSet.artLayers.add();
	newArtLayerRef.name = artLayerName;
	return newArtLayerRef;
}

function createLayerSetInLayerSet(layerSet, layerSetName) {
	var newLayerSetRef = layerSet.layerSets.add();
	newLayerSetRef.name = layerSetName;
	return newLayerSetRef; 
}

/*
 * private helping functions Section End
 */


/*
 * public API Section Start
 */

function existArtLayerURI(artLayerPath) {
	try {
		var pathArr = artLayerPath.split('/');
		var nowObject = app.activeDocument;
		for (var i = 0; i < pathArr.length - 1; i ++) {
			nowObject = getLayerSetInLayerSet(nowObject, pathArr[i]);
			if (nowObject == null) return 'false';
		}
		nowObject = getArtLayerInLayerSet(nowObject, pathArr[pathArr.length - 1]);
		if (nowObject == null) return 'false';
		return 'true';
	} catch (err) {
		return 'false';
	}
}

function existLayerSetURI(layerSetPath) {
	try {
		var pathArr = layerSetPath.split('/');
		var nowObject = app.activeDocument;
		for (var i = 0; i < pathArr.length; i ++) {
			nowObject = getLayerSetInLayerSet(nowObject, pathArr[i]);
			if (nowObject == null) return 'false';
		}
		return 'true';
	} catch (err) {
		return 'false';
	}
}

function createArtLayerIfNotExistByURI(artLayerPath) {
	try {
		var pathArr = artLayerPath.split('/');
		var nowObject = app.activeDocument;
		for (var i = 0; i < pathArr.length - 1; i ++) {
			var nextObject = getLayerSetInLayerSet(nowObject, pathArr[i]);
			if (nextObject == null) {
				nextObject = createLayerSetInLayerSet(nowObject, pathArr[i]);
			}
			nowObject = nextObject;
		}
		if (getArtLayerInLayerSet(nowObject, pathArr[pathArr.length - 1]) == null) {
			createArtLayerInLayerSet(nowObject, pathArr[pathArr.length - 1]);
		}
		return 'success';
	} catch (err) {
		return err.description;
	}
}

function createLayerSetIfNotExistByURI(layerSetPath) {
	try {
		var pathArr = layerSetPath.split('/');
		var nowObject = app.activeDocument;
		for (var i = 0; i < pathArr.length; i ++) {
			var nextObject = getLayerSetInLayerSet(nowObject, pathArr[i]);
			if (nextObject == null) {
				nextObject = createLayerSetInLayerSet(nowObject, pathArr[i]);
			}
			nowObject = nextObject;
		}
		return 'success';
	} catch (err) {
		return err.description;
	}
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

function saveFileAs(path) {
	try {
		var photoshopSaveOptions = new PhotoshopSaveOptions();
		photoshopSaveOptions.alphaChannels = true;
		photoshopSaveOptions.annotations = true;
		photoshopSaveOptions.embedColorProfile = true;
		photoshopSaveOptions.layers = true;
		photoshopSaveOptions.spotColors = true;
		app.activeDocument.saveAs(new File(path), photoshopSaveOptions, false, Extension.LOWERCASE);
		return 'success';
	} catch (err) {
		return err.description;
	}
}

/*
 * public API Section End
 */
