/**
 * @author Ethan
 * 肥粒子
 */
function Particle() {
    this.x = 0;
    this.y = 0;
    this.xVelocity = 0; // X速度
    this.yVelocity = 0; // Y速度
    // 圆角大小
    this.radius = 100;
    this.sizeRatio = 2;
}

// 设置大小比率
Particle.prototype.setSizeRatio = function (ratio) {
    this.sizeRatio = ratio;
};

// 设置粒子位置方法
Particle.prototype.setPosition = function (x, y) {
    this.x = x;
    this.y = y;
};

// 设置速度方法
Particle.prototype.setVelocity = function (x, y) {
    this.xVelocity = x;
    this.yVelocity = y;
};

// 设置图片
Particle.prototype.setImage = function (image) {
    this.imageWidth = image.width;
    this.imageHeight = image.height;
    this.image = image;
}

/**
 * @author ethan
 * @param {context} ctx  或者图片
 */
Particle.prototype.draw = function (ctx,canvasWidth,canvasHeight) {
    // 如果图片，则绘制
    if (this.image) {
        ctx.globalAlpha = this.alpha;
        // 烟雾缭绕就看这里了
        var fillWidth = canvasWidth / this.sizeRatio;  // 这是宽度，是动态的
        fillHeight = fillWidth - fillWidth * (this.x / canvasWidth * this.y / canvasHeight);
        ctx.drawImage(this.image, 0, 0, this.imageWidth, this.imageHeight, this.x, this.y, fillWidth, fillHeight);
    }
}

// 刷新粒子
Particle.prototype.update = function (canvasWidth,canvasHeight) {
    // 改变粒子的
    this.x += this.xVelocity;
    this.y += this.yVelocity;

    // 如果到了右边缘
    if (this.x >= canvasWidth) {
        this.xVelocity = -this.xVelocity;
        this.x = canvasWidth;
    }
    // 检测是否到了左边缘
    else if (this.x <= 0) {
        this.xVelocity = -this.xVelocity;
        this.x = 0;
    }

    // 底边缘
    if (this.y >= canvasHeight) {
        this.yVelocity = -this.yVelocity;
        this.y = canvasHeight;
    }

    // 是否上边缘
    else if (this.y <= 0) {
        this.yVelocity = -this.yVelocity;
        this.y = 0;
    }

    // 越靠近边缘，透明度越低
    // 纵向透明度变化要比横向的明显
    this.alpha = (.6 - Math.abs(canvasWidth * 0.5 - this.x) / canvasWidth) * (.9 - Math.abs(canvasHeight * 0.5 - this.y) / canvasHeight);
};
