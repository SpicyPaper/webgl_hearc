/**
* scene.js - This class handles the whole scene. It contains the initialisation of the gl context, the objects displayed, handles the js interactions on the page and draws the scene
	Original version by Kevin Laipe
*/

//Creation of 2 global matrix for the model view (mvMatrix) and for the projection (pMatrix)
var mvMatrix = mat4.create();
var pMatrix = mat4.create();

//Creation of a global array to store the objectfs drawn in the scene
var sceneObjects = [];

var rotationX = 0.0;
var rotationY = 0.0;

var tz = 2.0;

//Initialisation of the shader parameters, this very important method creates the links between the javascript and the shader.
function initShaderParameters(prg) {
  //Attributes
  prg.vertexPositionAttribute = glContext.getAttribLocation(prg, "aVertexPosition");
  glContext.enableVertexAttribArray(prg.vertexPositionAttribute);
  prg.textureCoordsAttribute = glContext.getAttribLocation(prg, "aTextureCoord");
  glContext.enableVertexAttribArray(prg.textureCoordsAttribute);
  prg.colorsAttribute = glContext.getAttribLocation(prg, "aColors");
  glContext.enableVertexAttribArray(prg.colorsAttribute);

  //Matrices
  prg.pMatrixUniform = glContext.getUniformLocation(prg, 'uPMatrix');
  prg.mvMatrixUniform = glContext.getUniformLocation(prg, 'uMVMatrix');
  //Textures
  prg.colorTextureUniform = glContext.getUniformLocation(prg, "uColorTexture");
  prg.normalTextureUniform = glContext.getUniformLocation(prg, "uNormalTexture");
  prg.specularTextureUniform = glContext.getUniformLocation(prg, "uSpecularTexture");
  prg.nightTextureUniform = glContext.getUniformLocation(prg, "uNightTexture");
  prg.atmoTextureUniform = glContext.getUniformLocation(prg, "uAtmoTexture");
  prg.skyTextureUniform = glContext.getUniformLocation(prg, "uSkyTexture");

  //Various uniforms
  prg.drawPrimitveUniform = glContext.getUniformLocation(prg, 'uDrawPrimitive');
  prg.globalTimeUniform = glContext.getUniformLocation(prg, "iGlobalTime");
  prg.radiusUniform = glContext.getUniformLocation(prg, "iRadius");
  prg.tzUniform = glContext.getUniformLocation(prg, "iZ");
  prg.rotXUniform = glContext.getUniformLocation(prg, "iRotX");
  prg.rotYUniform = glContext.getUniformLocation(prg, "iRotY");

  //Ajout des paramètres
  //TODO
}

//Initialisation of the scene
function initScene() {
  //Loading of textures
  var sunTextureTab = [];
  var skyTextureTab = [];

  //New textures
  initTextureWithImage("ressources/sky.jpg", skyTextureTab); // Loads the sky texture (background)

  initTextureWithImage("ressources/4k_sun.jpg", sunTextureTab); // laods the base sun texture
  initTextureWithImage("ressources/4k_sun_normal_map.jpg", sunTextureTab); // Loads the normal sun texture
  initTextureWithImage("ressources/4k_sun_specular_map.jpg", sunTextureTab); // Loads the specular sun texture

  //Creation of the sun instance
  let sun = new Sun("The Sun", 1.0, sunTextureTab[0], sunTextureTab[1], sunTextureTab[2], skyTextureTab[0]);

  //adding the sun to the scene objects
  sceneObjects.push(sun);

  //Enabling the depth test
  glContext.enable(glContext.DEPTH_TEST);

  //Sets the color black for the clear of the scene
  glContext.clearColor(0.0, 0.0, 0.0, 1.0);

  //Setting the projection matrix as an identity matrix
  mat4.identity(pMatrix);

  //Defining the viewport as the size of the canvas
  glContext.viewport(0.0, 0.0, c_width, c_height);

  //Starts the renderloop
  renderLoop();
}

function showContainer() {
  for (var i = 0; i < sceneObjects.length; i++) {
    //Swaping the drawing of the tetra
    sceneObjects[i].swapDrawTetra();
  }

}

function drawScene() {
  //Clearing the previous render based on co
  glContext.clear(glContext.COLOR_BUFFER_BIT | glContext.DEPTH_BUFFER_BIT);

  cameraFct();

  //Calling draw for each object in our scene
  for (var i = 0; i < sceneObjects.length; i++) {
    //Calling draw on the object with the model view matrix as parameter
    sceneObjects[i].draw();
  }
}

$(function() {
  $(document.getElementById("webgl-canvas")).on('wheel', function(e) {
    var delta = e.originalEvent.deltaY;
    if (delta > 0) {
      tz *= 1.05;
    }
    else {
      tz /= 1.05;
    }
    return false;
  });
});

function cameraFct() {
  translationMat = mat4.create();
  mat4.identity(translationMat);
  mat4.identity(pMatrix);
  mat4.perspective(pMatrix, degToRad(60), c_width / c_height, 0.1, 1000.0);
  mat4.translate(pMatrix, pMatrix, [0.0, 0.0, -tz]);
  glContext.uniform1f(prg.tzUniform, tz);

  rotateModelViewMatrixUsingQuaternion(true);
  rotationX += rx;
  rotationY += ry;
  glContext.uniform1f(prg.rotXUniform, rotationX);
  glContext.uniform1f(prg.rotYUniform, rotationY);
  glContext.uniformMatrix4fv(prg.pMatrixUniform, false, pMatrix);
  glContext.uniformMatrix4fv(prg.mvMatrixUniform, false, mat4.multiply(mat4.create(), translationMat, mvMatrix));
}

//Initialisation of the webgl context
function initWebGL() {
  //Initilisation on the canvas "webgl-canvas"
  glContext = getGLContext('webgl-canvas');
  //Initialisation of the programme
  initProgram(sunFragment, sunVertex);
  //Initialisation of the scene
  initScene();
}
