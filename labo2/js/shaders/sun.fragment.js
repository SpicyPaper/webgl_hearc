var sunFragment = `
#ifdef GL_ES
  precision highp float;
#endif

#define M_PI 3.1415926535897932384626433832795

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

//
// GLSL textureless classic 2D noise "cnoise",
// with an RSL-style periodic variant "pnoise".
// Author:  Stefan Gustavson (stefan.gustavson@liu.se)
// Version: 2011-08-22
//
// Many thanks to Ian McEwan of Ashima Arts for the
// ideas for permutation and gradient selection.
//
// Copyright (c) 2011 Stefan Gustavson. All rights reserved.
// Distributed under the MIT license. See LICENSE file.
// https://github.com/stegu/webgl-noise
//

vec4 mod289(vec4 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x)
{
  return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec2 fade(vec2 t) {
  return t*t*t*(t*(t*6.0-15.0)+10.0);
}

// Classic Perlin noise
float cnoise(vec2 P)
{
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod289(Pi); // To avoid truncation effects in permutation
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;

  vec4 i = permute(permute(ix) + iy);

  vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0 ;
  vec4 gy = abs(gx) - 0.5 ;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;

  vec2 g00 = vec2(gx.x,gy.x);
  vec2 g10 = vec2(gx.y,gy.y);
  vec2 g01 = vec2(gx.z,gy.z);
  vec2 g11 = vec2(gx.w,gy.w);

  vec4 norm = taylorInvSqrt(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));
  g00 *= norm.x;
  g01 *= norm.y;
  g10 *= norm.z;
  g11 *= norm.w;

  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));

  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}

// Classic Perlin noise, periodic variant
float pnoise(vec2 P, vec2 rep)
{
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod(Pi, rep.xyxy); // To create noise with explicit period
  Pi = mod289(Pi);        // To avoid truncation effects in permutation
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;

  vec4 i = permute(permute(ix) + iy);

  vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0 ;
  vec4 gy = abs(gx) - 0.5 ;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;

  vec2 g00 = vec2(gx.x,gy.x);
  vec2 g10 = vec2(gx.y,gy.y);
  vec2 g01 = vec2(gx.z,gy.z);
  vec2 g11 = vec2(gx.w,gy.w);

  vec4 norm = taylorInvSqrt(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));
  g00 *= norm.x;
  g01 *= norm.y;
  g10 *= norm.z;
  g11 *= norm.w;

  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));

  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
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
   //   Retrives the color for the current fragment
     finalColor = vec4(colorFromTextures(L, planetPosition.z, planetPosition.x, planetPosition.y, rotationVector), 1.0);
   //   If we are not on "the sun"
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
       //Calc angle 
       float angle = atan(newY,newX)+M_PI;
       float intensity = pnoise(vec2(angle/M_PI*5.0,iGlobalTime/2000.0),vec2(10.0,250.0))*2.0;

       float luminosity1 = (intensity+1.0)/2.0*0.5+0.5;
       float luminosity2 = (intensity+1.0)/2.0*0.7+0.3;

       vec2 normalized = normalize(vec2(newX,newY));
       rotationVector = rotYMatrix * rotXMatrix * vec4(normalized.x, normalized.y, 0.01, 1.0);
       vec4 textureColor = vec4(colorFromTextures(L, planetPosition.z, planetPosition.x, planetPosition.y, rotationVector), 1.0);

       // Final add halo
       float dissipationValue = 8.0;
       finalColor += luminosity1 * vec4(1.0, 1.0, 0.0, 0.6) / pow(abs(dist), dissipationValue) / 2.0;
       finalColor += luminosity2 * textureColor / pow(abs(dist), dissipationValue);
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
