var sunFragment = `
#ifdef GL_ES
  precision highp float;
#endif

uniform sampler2D uColorTexture;

uniform sampler2D uNormalTexture;
uniform sampler2D uSpecularTexture;
// uniform sampler2D uNightTexture;
// uniform sampler2D uAtmoTexture;
// uniform sampler2D uAtmoNormalTexture;
uniform sampler2D uSkyTexture;

uniform mat4 uMVMatrix;
uniform float iGlobalTime;
uniform float iRadius;
uniform float iZ;
uniform int uDrawPrimitive;
uniform float iRotX;
uniform float iRotY;

varying vec4 vPosition;
varying vec3 vLightpos;
varying vec2 vTextureCoord;
varying vec4 vColors;

//Retrieves the color on the texture based on the rotation
vec3 colorFromTextures(vec3 L, float oppZ, float newX, float newY, vec4 rotationVector) {
 float time = iGlobalTime * 0.000025;
 float u = time + atan(rotationVector.x, rotationVector.z) / (3.14159 * 2.0);
 float v = 0.5 + asin(rotationVector.y) / 3.14159;
 vec2 mapCoord = vec2(u, v);

 float a = 1.0 / 4096.0;
 float b = 1.0 / 2048.0;

 vec2 moy0 = vec2(mapCoord.x - a, mapCoord.y - b);
 vec2 moy1 = vec2(mapCoord.x, mapCoord.y - b);
 vec2 moy2 = vec2(mapCoord.x + a, mapCoord.y - b);
 vec2 moy3 = vec2(mapCoord.x - a, mapCoord.y);
 vec2 moy4 = vec2(mapCoord.x, mapCoord.y);
 vec2 moy5 = vec2(mapCoord.x + a, mapCoord.y);
 vec2 moy6 = vec2(mapCoord.x - a, mapCoord.y + b);
 vec2 moy7 = vec2(mapCoord.x, mapCoord.y + b);
 vec2 moy8 = vec2(mapCoord.x + a, mapCoord.y + b);
 vec2 moy9 = vec2(mapCoord.x - 2.0 * a, mapCoord.y + 2.0 * b);
 vec2 moy10 = vec2(mapCoord.x - a, mapCoord.y + 2.0 * b);
 vec2 moy11 = vec2(mapCoord.x, mapCoord.y + 2.0 * b);
 vec2 moy12 = vec2(mapCoord.x + a, mapCoord.y + 2.0 * b);
 vec2 moy13 = vec2(mapCoord.x + 2.0 * a, mapCoord.y + 2.0 * b);
 vec2 moy14 = vec2(mapCoord.x - 2.0 * a, mapCoord.y + b);
 vec2 moy15 = vec2(mapCoord.x + 2.0 * a, mapCoord.y + b);
 vec2 moy16 = vec2(mapCoord.x - 2.0 * a, mapCoord.y);
 vec2 moy17 = vec2(mapCoord.x + 2.0 * a, mapCoord.y);
 vec2 moy18 = vec2(mapCoord.x - 2.0 * a, mapCoord.y - b);
 vec2 moy19 = vec2(mapCoord.x + 2.0 * a, mapCoord.y - b);
 vec2 moy20 = vec2(mapCoord.x - 2.0 * a, mapCoord.y - 2.0 * b);
 vec2 moy21 = vec2(mapCoord.x - a, mapCoord.y - 2.0 * b);
 vec2 moy22 = vec2(mapCoord.x, mapCoord.y - 2.0 * b);
 vec2 moy23 = vec2(mapCoord.x + a, mapCoord.y - 2.0 * b);
 vec2 moy24 = vec2(mapCoord.x + 2.0 * a, mapCoord.y - 2.0 * b);

 vec3 txlClr0 = texture2D(uNormalTexture, moy0).rgb;
 vec3 txlClr1 = texture2D(uNormalTexture, moy1).rgb;
 vec3 txlClr2 = texture2D(uNormalTexture, moy2).rgb;
 vec3 txlClr3 = texture2D(uNormalTexture, moy3).rgb;
 vec3 txlClr4 = texture2D(uNormalTexture, moy4).rgb;
 vec3 txlClr5 = texture2D(uNormalTexture, moy5).rgb;
 vec3 txlClr6 = texture2D(uNormalTexture, moy6).rgb;
 vec3 txlClr7 = texture2D(uNormalTexture, moy7).rgb;
 vec3 txlClr8 = texture2D(uNormalTexture, moy8).rgb;
 vec3 txlClr9 = texture2D(uNormalTexture, moy9).rgb;
 vec3 txlClr10 = texture2D(uNormalTexture, moy10).rgb;
 vec3 txlClr11 = texture2D(uNormalTexture, moy11).rgb;
 vec3 txlClr12 = texture2D(uNormalTexture, moy12).rgb;
 vec3 txlClr13 = texture2D(uNormalTexture, moy13).rgb;
 vec3 txlClr14 = texture2D(uNormalTexture, moy14).rgb;
 vec3 txlClr15 = texture2D(uNormalTexture, moy15).rgb;
 vec3 txlClr16 = texture2D(uNormalTexture, moy16).rgb;
 vec3 txlClr17 = texture2D(uNormalTexture, moy17).rgb;
 vec3 txlClr18 = texture2D(uNormalTexture, moy18).rgb;
 vec3 txlClr19 = texture2D(uNormalTexture, moy19).rgb;
 vec3 txlClr20 = texture2D(uNormalTexture, moy20).rgb;
 vec3 txlClr21 = texture2D(uNormalTexture, moy21).rgb;
 vec3 txlClr22 = texture2D(uNormalTexture, moy22).rgb;
 vec3 txlClr23 = texture2D(uNormalTexture, moy23).rgb;
 vec3 txlClr24 = texture2D(uNormalTexture, moy24).rgb;

 vec3 txlClrFinalHigh = vec3(txlClr4);
 vec3 txlClrFinalMid = vec3((txlClr0 + txlClr1 + txlClr2 + txlClr3 + txlClr4 + txlClr5 + txlClr6 + txlClr7 + txlClr8) / 9.0);
 vec3 txlClrFinalLow = vec3((txlClr0 + txlClr1 + txlClr2 + txlClr3 + txlClr4 + txlClr5 + txlClr6 + txlClr7 + txlClr8 + txlClr9 + txlClr10 + txlClr11 + txlClr12 + txlClr13 + txlClr14 + txlClr15 + txlClr16 + txlClr17 + txlClr18 + txlClr19 + txlClr20 + txlClr21 + txlClr22 + txlClr23 + txlClr24) / 25.0);
 vec3 txlClrFinal = txlClrFinalLow;

 if (iZ > 2.0) {
   txlClrFinal = txlClrFinalHigh;
 } else if (iZ > 1.0) {
   txlClrFinal = txlClrFinalMid;
 } else {
   txlClrFinal = txlClrFinalLow;
 }

 float timeClouds = time * 1.6;
 float uClouds = timeClouds + atan(rotationVector.x, rotationVector.z) / (3.14159 * 2.0);
 float vClouds = 0.5 + asin(rotationVector.y) / 3.14159;
 vec2 mapCoordClouds = vec2(uClouds, vClouds);

 vec3 texelColor = texture2D(uColorTexture, mapCoord).rgb;
 vec3 texelSpecular = texture2D(uSpecularTexture, mapCoord).rgb;
 // vec3 texelNight = texture2D(uNightTexture, mapCoord).rgb;
 // vec3 texelAtmo = texture2D(uAtmoTexture, mapCoordClouds).rgb;
 vec3 texelNormal = txlClrFinal * 2.0 - 1.0;
 // float cloudy = sqrt(texelAtmo.x * texelAtmo.x + texelAtmo.y * texelAtmo.y + texelAtmo.z * texelAtmo.z);

 // texelColor += texelAtmo;

 vec3 N = normalize(texelNormal);

 // if (cloudy > 1.0) {
 //   N = vec3(0.0, 0.0, 1.0);
 // }

 vec3 E = normalize(vec3(-newX, -newY, oppZ));
 vec3 R = reflect(-L, N);
 //float shadow = max(dot(R, E), 0.0);

 vec3 finalColor = vec3(1.0, 1.0, 1.0);// * shadow;

 float lambertTerm = max(dot(N, L), 0.0);
 float specular = pow(abs(max(dot(R, E), 0.0)), 32.0) * lambertTerm;

 //if (shadow < 0.2) {
 //   float fade = shadow < 0.0 ? 1.0 - lambertTerm * -10.0 : 1.0;
 //   finalColor += texelNight * length(texelNight) * fade / 1.5;
 //}

 finalColor += specular * texelSpecular;

 finalColor *= texelColor;

 return finalColor;
}

void main(void) {
 //Calculates new x based on z offset
 float newX = vPosition.x * iZ / vPosition.w;
 //Calculates new y based on z offset
 float newY = vPosition.y * iZ / vPosition.w;

 //Calculates new z
 float adjXY = sqrt(newX * newX + newY * newY);
 float oppZ = sqrt(iRadius * iRadius - adjXY * adjXY);

 //Defines a new position for the planet
 vec4 planetPosition = vec4(newX, newY, oppZ, 1.0);

 //Calculates the distance between the camera Z and the planet radius
 float dist = adjXY / iRadius;

 float rotY = iRotY;
 //Handles rotY value to rotate properly
 if (cos(iRotX) <= 0.0) {
   rotY = -iRotY;
 }

 //Calculates a rotation matrix in x
 mat4 rotXMatrix;
 rotXMatrix[0] = vec4(1.0, 0.0, 0.0, 0.0);
 rotXMatrix[1] = vec4(0.0, cos(iRotX), -sin(iRotX), 0.0);
 rotXMatrix[2] = vec4(0.0, sin(iRotX), cos(iRotX), 0.0);
 rotXMatrix[3] = vec4(0.0, 0.0, 0.0, 1.0);

 //Calculates a rotation matrix in y
 mat4 rotYMatrix;
 rotYMatrix[0] = vec4(cos(iRotY), 0.0, sin(rotY), 0.0);
 rotYMatrix[1] = vec4(0.0, 1.0, 0.0, 0.0);
 rotYMatrix[2] = vec4(-sin(rotY), 0.0, cos(iRotY), 0.0);
 rotYMatrix[3] = vec4(0.0, 0.0, 0.0, 1.0);

 //Defines the rotation vector
 vec4 rotationVector = rotYMatrix * rotXMatrix * vec4(planetPosition.x, planetPosition.y, planetPosition.z, 1.0);
 //By default, the final color is white
 vec4 finalColor = vec4(1.0, 1.0, 1.0, 1.0);
 //We define the light vector
 vec3 L = normalize(vLightpos - vec3(planetPosition.x, planetPosition.y, planetPosition.z));
 //If we are meant to draw the planet
 if (uDrawPrimitive == 0) {
   //If we are within the planet
   if (dist <= 1.0) {
     //Retrives the color for the current fragment
     finalColor = vec4(colorFromTextures(L, planetPosition.z, planetPosition.x, planetPosition.y, rotationVector), 1.0);
     //If we are not on "earth"
   } else {
     //We draw the halo (Orange halo) and the skybox
     float skyX = -(vPosition.x / vPosition.w) * 0.7;
     float skyY = -(vPosition.y / vPosition.w) * 0.7;
     float adjSky = sqrt(skyX * skyX + skyY * skyY);
     float skyZ = sqrt(1.0 * 1.0 - adjSky * adjSky);
     vec4 skyVector = rotYMatrix * rotXMatrix * vec4(skyX, skyY, skyZ, 1.0);
     float uSky = 0.5 + atan(skyVector.x, skyVector.z) / (0.5 * 3.14159);
     float vSky = 0.5 + asin(skyVector.y) / (0.25 * 3.14159);
     vec2 mapCoordSky = vec2(uSky, vSky);
     vec3 texelSky = texture2D(uSkyTexture, mapCoordSky).rgb;

     finalColor *= vec4(texelSky, 1.0);

     //Halo lumineux global
     if (dist <= 20.0) {
       finalColor += vec4(0.5, 0.2, 0.1, 0.8) / pow(abs(dist), 2.0);
     }

     if (dist <= 2.0) {
       // iGlobalTime
       float angle = atan(newY,newX)+iGlobalTime/2000.0;
       float luminosity = sin(angle*1.0)+sin(angle*2.0)+cos(angle*3.0)+sin(angle*4.0);
       finalColor += (luminosity+4.0)/8.0 * vec4(1.0, 1.0, 0.0, 0.8) / pow(abs(dist), 5.0);
       //vec2 normalized = normalize(vec2(newX,newY))*iRadius;
       //finalColor = vec4(colorFromTextures(L, planetPosition.z, normalized.x, normalized.y, rotationVector), 1.0);
       //finalColor = vec4(,normalized.y,0.0,1.0);
     }
   }
   //If we are meant to draw the primitives of the tetrahedron, we simply draw it
 } else if (uDrawPrimitive == 1) {
   if (dist < 1.0 && iZ < vPosition.z) {
     finalColor = vec4(colorFromTextures(L, planetPosition.z, planetPosition.x, planetPosition.y, rotationVector), 1.0);
   } else if (dist < 1.0 && iZ > vPosition.z) {
     finalColor = vColors;
   } else {
     finalColor = vColors;
   }
 }
 gl_FragColor = finalColor.rgba;
}
`;
