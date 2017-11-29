/**
 * @author ethan
 * @param {int} w 画布宽
 * @param {int} h 画布高
 * @param {int} maxStars 最大数
 */
var Star = function (w = 800, h = 600, maxStars = 100) {
    this.random = function random(min, max) {
        if (arguments.length < 2) {
            max = min;
            min = 0;
        }
        if (min > max) {
            var hold = max;
            max = min;
            min = hold;
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function maxOrbit(x, y) {
        var max = Math.max(x, y);
        return Math.round(Math.sqrt(max * max + max * max)) / 1.7;
    }

    this.orbitRadius = this.random(maxOrbit(w, h));  // 整体轨道边界半径
    this.radius = this.random(10, this.orbitRadius) / 40; //半径,越远越细 orbitRadius越细

    this.orbitX = w / 2; //中心点X坐标
    this.orbitY = h / 2; //中心点y坐标

    this.timePassed = this.random(0, maxStars);
    this.speed = this.random(this.orbitRadius) / 9000000; //旋转速度
    this.alpha = this.random(.1, 10) / 10; //开始透明度

}

/**
 * @author ethan
 * @param {Canvas} ctx  或者图片
 */
Star.prototype.draw = function (ctx, img) {
    var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX;
    var y = Math.cos(this.timePassed) * (this.orbitRadius / 3.5) + this.orbitY;
    var twinkle = this.random(50);

    if (twinkle === 1 && this.alpha > 0) {
        this.alpha -= 0.35;
    } else if (twinkle === 2 && this.alpha < 1) {
        this.alpha += 0.35;
    }

    ctx.globalAlpha = this.alpha;
    ctx.drawImage(img, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);

    this.timePassed += this.speed;
}

