var earthVertex = `
const vec3 lightpos = vec3(0.0, 0.0, 5.0);

attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec4 aColors;

uniform mat4 uPMatrix;
uniform mat4 uMVMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
varying vec4 vPosition;
varying vec3 vLightpos;
varying vec4 vColors;

void main(void) {
  //Defines position based on mvMatrix and projection matrix
  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);

  //Retrieves texture coordinates
  vTextureCoord = aTextureCoord;
  //Calulcates light vector
  vLightpos = (uMVMatrix * vec4(lightpos, 1.0)).xyz;

  //Calculates color (used for tetrahedral)
  vColors = aColors;

  //Retrives position
  vPosition = gl_Position;
}
`;
