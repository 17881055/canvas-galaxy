/**
 * 烟雾 
 * 依赖粒子
 * @param {*} canvas 
 * @param {*} options 
 */

var Smoke = function (options = {}) {
    var defaults = {
        canvasWidth: 1920,
        canvasHeight: 500,
        count: 20,
        velocity: 1.2,//速度
        url: 'img/smoke.png'
    };

    this.params = Object.assign({}, options, defaults);
    this.particles = [];
    var particleCount = this.params.count;
    // 每个方向的最大速度
    var maxVelocity = this.params.velocity;

    for (var i = 0; i < particleCount; ++i) {
        var particle = new Particle();
        // 随机位置
        particle.setPosition(random(0, this.params.canvasWidth), random(0, this.params.canvasHeight));
        // 设置随机速度
        particle.setVelocity(random(-maxVelocity, maxVelocity), random(-maxVelocity, maxVelocity));
        // 随机大小
        particle.setSizeRatio(random(0.3, 3));
        this.particles.push(particle);
    }
    // 创建图片对象
    var imageObj = new Image();
    // 一旦图像被下载，然后在所有的颗粒上设置图像
    imageObj.onload = function () {
        this.particles.forEach(function (particle) {
            particle.setImage(imageObj);
        });
    }.bind(this);
    // 烟雾图片地址
    imageObj.src = this.params.url;

    // 生成一个min,max大小之间的随机数
    function random(min, max) {
        return Math.random() * (max - min) + min;
    }
}

// 刷新
Smoke.prototype.update = function (ctx) {
    this.particles.forEach(function (particle) {
        particle.update(this.params.canvasWidth, this.params.canvasHeight);
        particle.draw(ctx, this.params.canvasWidth, this.params.canvasHeight);
    }.bind(this));
};