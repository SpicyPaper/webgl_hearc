class Spike
{
  constructor(angle, direction, scale = 1, ds = 0.0075)
  {
    this.angle = angle;
    this.direction = direction;
    this.scale = scale;
    this.ds = ds;
  }

	//Draw a Spike somewhere around the origin
	draw()
	{
	  mat4.fromRotation(tMatrix, this.angle, this.direction);

	  let scaleMatrix = mat4.create();
	  mat4.scale(scaleMatrix, scaleMatrix, [1, this.scale, 1]);
	  mat4.multiply(tMatrix, tMatrix, scaleMatrix);

	  glContext.uniformMatrix4fv(prg.tMatrixUniform, false, tMatrix);
	  glContext.drawElements(glContext.TRIANGLES, indices.length, glContext.UNSIGNED_SHORT, 0);
	}

  update()
  {
    this.scale += this.ds;

    if(this.scale <= SMIN)
    {
      this.scale = SMIN;
      this.ds = -this.ds;
    }

    if(this.scale >= SMAX)
    {
      this.scale = SMAX;
      this.ds = -this.ds;
    }
  }
}
