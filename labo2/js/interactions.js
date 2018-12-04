
/**
 * Reset all the checkbox to their default value
 */
function resetTexturesAndHalosValues() {
    document.getElementById("showContainerCheckbox").checked = false;
    document.getElementById("textureColorCheckbox").checked = true;
    document.getElementById("textureNormalCheckbox").checked = true;
    document.getElementById("textureSpecularCheckbox").checked = true;
    document.getElementById("basicHaloCheckbox").checked = true;
    document.getElementById("luminousHaloCheckbox").checked = true;
    document.getElementById("perlinHaloCheckbox").checked = true;
    document.getElementById("textureBackgroundCheckbox").checked = true;
    document.getElementById("perlinNoiseHaloRange").value = -1.5;
    document.getElementById("luminousHaloRange").value = -1.5;
    document.getElementById("basicHaloRange").value = -1.5;

    texturesVector = vec4.fromValues(1.0, 1.0, 1.0, 1.0);
    halosVector = vec3.fromValues(1.0, 1.0, 1.0);
    halosMult = vec3.fromValues(1.5, 1.5, 1.5);
    if(isContainerActivated)
    {
        showContainer();
    }
}

/**
 * Enable / Disable the color texture
 * @param {boolean} isChecked : true if enable, false otherwise
 */
function swapTextureColor(isChecked) {
    if(isChecked) {
        texturesVector[0] = 1.0;
    } else {
        texturesVector[0] = 0.0;
    }
}

/**
 * Enable / Disable the normal texture
 * @param {boolean} isChecked : true if enable, false otherwise
 */
function swapTextureNormal(isChecked) {
    if(isChecked) {
        texturesVector[1] = 1.0;
    } else {
        texturesVector[1] = 0.0;
    }
}

/**
 * Enable / Disable the specular texture
 * @param {boolean} isChecked : true if enable, false otherwise
 */
function swapTextureSpecular(isChecked) {
    if(isChecked) {
        texturesVector[2] = 1.0;
    } else {
        texturesVector[2] = 0.0;
    }
}

/**
 * Enable / Disable the background texture
 * @param {boolean} isChecked : true if enable, false otherwise
 */
function swapTextureBackground(isChecked) {
    if(isChecked) {
        texturesVector[3] = 1.0;
    } else {
        texturesVector[3] = 0.0;
    }
}

/**
 * Enable / Disable the basic halo
 * @param {boolean} isChecked : true if enable, false otherwise
 */
function swapBasicHalo(isChecked) {
    if(isChecked) {
        halosVector[0] = 1.0;
    } else {
        halosVector[0] = 0.0;
    }
}

/**
 * Enable / Disable the lumious halo
 * @param {boolean} isChecked : true if enable, false otherwise
 */
function swapLuminousHalo(isChecked) {
    if(isChecked) {
        halosVector[1] = 1.0;
    } else {
        halosVector[1] = 0.0;
    }
}

/**
 * Enable / Disable the perlin halo
 * @param {boolean} isChecked : true if enable, false otherwise
 */
function swapPerlinHalo(isChecked) {
    if(isChecked) {
        halosVector[2] = 1.0;
    } else {
        halosVector[2] = 0.0;
    }
}

/**
 * Change the basic halo value mult
 * @param {float} value : new multiplicator
 */
function changebasicHaloMult(value) {
    halosMult[0] = -value;
}

/**
 * Change the lumious halo value mult
 * @param {float} value : new multiplicator
 */
function changeLuminousHaloMult(value) {
    halosMult[1] = -value;
}

/**
 * Change the Perlin halo value mult
 * @param {float} value : new multiplicator
 */
function changePerlinNoiseHaloMult(value) {
    halosMult[2] = -value;
}