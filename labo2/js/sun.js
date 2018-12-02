class Sun {
  constructor(name, radius, colorTexture, normalTexture, specularTexture, skyTexture) {
    this.name = name;
    this.radius = radius;

    //Initialisation of the buffers within the object for the render area
    this.vertexBuffer = null;
    this.tetraColorsBuffer = null;
    this.textureCoordsBuffer = null;
    this.indexTetraBuffer = null;
    this.indexBuffer = null;

    //We take the pointers to the uploaded textures
    this.colorTexture = colorTexture;
    this.normalTexture = normalTexture;
    this.specularTexture = specularTexture;
    this.skyTexture = skyTexture;

    //Creation of a model view matrix specific for the object
    this.mvMatrix = mat4.create();
    this.nMatrix = mat4.create();

    this._drawTetra = false;

    //Call of the initialisation method
    this.init();
  }


  //Getter/setter for drawTetra
  set drawTetra(draw) {
    this._drawTetra = draw;
  }

  get drawTetra() {
    return this._drawTetra;
  }

  swapDrawTetra() {
    this._drawTetra = !this._drawTetra;
  }

  //Initialisation method of a sun object
  init() {
    //Initialisation of time variables to handle sun rotation
    this.timeBegin = new Date().getTime();

    //Initialisation of the arrays
    this.indices = [0, 1, 3, 2, 0, 1];
    this.indicesTetra = [0, 1, 2, 0, 3, 2, 3, 1];
    this.vertices = [-1.5, -1.5, 1.5,
      1.5, -1.5, -1.5,
      -1.5, 1.5, -1.5,
      1.5, 1.5, 1.5
    ];
    this.textureCoords = [0.0, 0.0,
      0.0, 1.0,
      1.0, 0.0,
      1.0, 1.0
    ];

    this.tetraColors = [0.0, 1.0, 0.0, 1.0,
      0.0, 1.0, 0.0, 1.0,
      0.0, 1.0, 0.0, 1.0,
      0.0, 1.0, 0.0, 1.0
    ];

    //We create the buffers on the GPU and retrive the pointers to it
    this.vertexBuffer = getVertexBufferWithVertices(this.vertices);
    this.tetraColorsBuffer = getArrayBufferWithArray(this.tetraColors);
    this.indexTetraBuffer = getIndexBufferWithIndices(this.indicesTetra);
    this.textureCoordsBuffer = getArrayBufferWithArray(this.textureCoords);
    this.indexBuffer = getIndexBufferWithIndices(this.indices);

  }

  //Draw method of the planet object
  draw() {

    //We enable the depth test
    glContext.enable(glContext.DEPTH_TEST);

    //Tetra vertices
    glContext.bindBuffer(glContext.ARRAY_BUFFER, this.vertexBuffer);
    glContext.vertexAttribPointer(prg.vertexPositionAttribute, 3, glContext.FLOAT, false, 0, 0);

    //Texture coords
    glContext.bindBuffer(glContext.ARRAY_BUFFER, this.textureCoordsBuffer);
    glContext.vertexAttribPointer(prg.textureCoordsAttribute, 2, glContext.FLOAT, false, 0, 0);

    //Tetra colors
    glContext.bindBuffer(glContext.ARRAY_BUFFER, this.tetraColorsBuffer);
    glContext.vertexAttribPointer(prg.colorsAttribute, 4, glContext.FLOAT, false, 0, 0);

    //Sun color texture
    glContext.activeTexture(glContext.TEXTURE6);
    glContext.bindTexture(glContext.TEXTURE_2D, this.colorTexture);
    glContext.uniform1i(prg.colorTextureUniform, 6);
    glContext.texParameteri(glContext.TEXTURE_2D, glContext.TEXTURE_WRAP_S, glContext.REPEAT);

    //Sun normal texture
    glContext.activeTexture(glContext.TEXTURE1);
    glContext.bindTexture(glContext.TEXTURE_2D, this.normalTexture);
    glContext.uniform1i(prg.normalTextureUniform, 1);
    glContext.texParameteri(glContext.TEXTURE_2D, glContext.TEXTURE_WRAP_S, glContext.REPEAT);

    //Sun specular texture
    glContext.activeTexture(glContext.TEXTURE2);
    glContext.bindTexture(glContext.TEXTURE_2D, this.specularTexture);
    glContext.uniform1i(prg.specularTextureUniform, 2);
    glContext.texParameteri(glContext.TEXTURE_2D, glContext.TEXTURE_WRAP_S, glContext.REPEAT);

    //Sky texture
    glContext.activeTexture(glContext.TEXTURE5);
    glContext.bindTexture(glContext.TEXTURE_2D, this.skyTexture);
    glContext.uniform1i(prg.skyTextureUniform, 5);
    glContext.texParameteri(glContext.TEXTURE_2D, glContext.TEXTURE_WRAP_S, glContext.MIRRORED_REPEAT);
    glContext.texParameteri(glContext.TEXTURE_2D, glContext.TEXTURE_WRAP_T, glContext.MIRRORED_REPEAT);

    //Time and radius infos
    glContext.uniform1f(prg.globalTimeUniform, -(new Date().getTime()) + this.timeBegin);
    glContext.uniform1f(prg.radiusUniform, this.radius);

    //Disable primitive drawing to draw the sun
    glContext.uniform1i(prg.drawPrimitveUniform, 0);

    //Index and draw Sun
    glContext.bindBuffer(glContext.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    glContext.drawElements(glContext.TRIANGLE_STRIP, this.indices.length, glContext.UNSIGNED_SHORT, 0);

    //If we are supposed to draw the borders of the tetra
    if (this._drawTetra) {
      //Disable depth test, Index and draw tetra
      glContext.disable(glContext.DEPTH_TEST);
      glContext.uniform1i(prg.drawPrimitveUniform, 1);

      glContext.bindBuffer(glContext.ELEMENT_ARRAY_BUFFER, this.indexTetraBuffer);
      glContext.drawElements(glContext.LINE_STRIP, this.indicesTetra.length, glContext.UNSIGNED_SHORT, 0);
    }
  }
}
