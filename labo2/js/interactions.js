
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

function swapTextureColor(isChecked) {
    if(isChecked) {
        texturesVector[0] = 1.0;
    } else {
        texturesVector[0] = 0.0;
    }
}

function swapTextureNormal(isChecked) {
    if(isChecked) {
        texturesVector[1] = 1.0;
    } else {
        texturesVector[1] = 0.0;
    }
}

function swapTextureSpecular(isChecked) {
    if(isChecked) {
        texturesVector[2] = 1.0;
    } else {
        texturesVector[2] = 0.0;
    }
}

function swapTextureBackground(isChecked) {
    if(isChecked) {
        texturesVector[3] = 1.0;
    } else {
        texturesVector[3] = 0.0;
    }
}

function swapBasicHalo(isChecked) {
    if(isChecked) {
        halosVector[0] = 1.0;
    } else {
        halosVector[0] = 0.0;
    }
}

function swapLuminousHalo(isChecked) {
    if(isChecked) {
        halosVector[1] = 1.0;
    } else {
        halosVector[1] = 0.0;
    }
}

function swapPerlinHalo(isChecked) {
    if(isChecked) {
        halosVector[2] = 1.0;
    } else {
        halosVector[2] = 0.0;
    }
}

function changebasicHaloMult(value) {
    halosMult[0] = -value;
}

function changeLuminousHaloMult(value) {
    halosMult[1] = -value;
}

function changePerlinNoiseHaloMult(value) {
    halosMult[2] = -value;
}