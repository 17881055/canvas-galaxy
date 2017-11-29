/**
 * @author Ethan
 * 流星
 */
var Meteor = function () {

    this.defaults = {
        radius: 1, //大小
        radiusScaleMin: .5, //变换最小
        radiusScaleMax: 1.5, //变换最大
        position: { x: mouseX, y: mouseY },  //起点
        shift: { x: mouseX, y: mouseY }, //目标点
        angle: 0,
        speed: 0.01 + Math.random() * 0.01, //数度
        fillColor: '#' + (Math.random() * 0x404040 + 0xaaaaaa | 0).toString(16),
        orbit: RADIUS * .5 + (RADIUS * .5 * Math.random()),  //轨道
        shadowBlur: 20,
        shadowColor: '#' + (Math.random() * 0x404040 + 0xaaaaaa | 0).toString(16),
    };

}

/**
 * @author ethan
 */
Particle.prototype.draw = function (ctx) {
    // 如果图片，则绘制
    if (this.image) {
        ctx.globalAlpha = this.alpha;
        // 烟雾缭绕就看这里了
        var fillWidth = canvasWidth / this.sizeRatio;  // 这是宽度，是动态的
        fillHeight = fillWidth - fillWidth * (this.x / canvasWidth * this.y / canvasHeight);
        ctx.drawImage(this.image, 0, 0, this.imageWidth, this.imageHeight, this.x, this.y, fillWidth, fillHeight);
    }
}