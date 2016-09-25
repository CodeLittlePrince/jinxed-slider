// 引入 widget控制生命周期
var ws = WidgetSlider;

// Slider 类
function Slider() {
	this.sizeUnit;
	this.sliderBox;
	this.config = {
		container: null,
		startIndex: 1,
		useRem : false,
		width : 870,
		height : 120,
		slidetime : 2000,
		speed: 0.3
	}
}
Slider.prototype = $.extend({}, new ws(), {
	// 添加dom节点并配置其大小样式
	renderUI: function(){
		this.boundingBox = this.config.container.cloneNode(true);
		this.boundingBox.removeAttribute('id');
		this.boundingBox.style.overflow = 'hidden';
		// 设置轮播长宽用rem还是px
		this.sizeUnit = this.config.useRem ? 'rem' : 'px';
		// 容器将图片包裹
		this.sliderBox = document.createElement('div');
		this.sliderBox.innerHTML = this.boundingBox.innerHTML;
		$(this.sliderBox).find('img').css('float', 'left');
		this.boundingBox.innerHTML = '';
		this.boundingBox.appendChild(this.sliderBox);

		// 配置slider的sliderBox大小
		this.boundingBox.style.width = this.config.width + this.sizeUnit;
		this.boundingBox.style.height = this.config.height + this.sizeUnit;
		this.sliderBox.style.width = this.config.width * (this.sliderBox.children.length + 2) + this.sizeUnit;
		// 创建两张图片，插入一头一尾，达到无间隙轮播（所以图片总数加2）
		var firstImg = this.sliderBox.firstElementChild.cloneNode(true),
			lastImg = this.sliderBox.lastElementChild.cloneNode(true);
		// fix 伪第一张图加载出现真第一张图瞬间可看见的情况
		lastImg.style.visibility = 'hidden';
		this.sliderBox.appendChild(firstImg);
		this.sliderBox.insertBefore(lastImg, this.sliderBox.firstElementChild);
	},
	/* 初始化属性 */
	initUI: function(){
		// 一开始直接无动画将图转到伪第一张（DOM第二张）
		this.sliderBox.style.transform = 'translate3d(' + '-' + this.config.width * this.config.startIndex +this.sizeUnit + ', 0, 0)';
		this.sliderBox.style.webkitTransform = 'translate3d(' + '-' + this.config.width * this.config.startIndex +this.sizeUnit + ', 0, 0)';
		// 恢复 真第一张图的可见
		this.sliderBox.firstElementChild.style.visibility = 'visible';
		this.config.startIndex ++;
		// transform其实是一个多线程实现的动画，它的实现和事件差不多，也需要等主程序代码全部执行完才工作
		this.play();
	},
	/* 循环播放 */
	play: function(){
		var that = this;
		var timerID =
		setTimeout(function(){
			that.sliderBox.style.transition = 'transform' + that.config.speed + 's';
			that.sliderBox.style.webkitTransition = 'transform ' + that.config.speed + 's';
			that.sliderBox.style.backfaceVisibility = 'hidden';
			that.sliderBox.style.webkitBackfaceVisibility = 'hidden';
			that.sliderBox.style.transform = 'translate3d(' + '-' + that.config.width * that.config.startIndex +that.sizeUnit + ', 0, 0)';
			that.sliderBox.style.webkitTransform = 'translate3d(' + '-' + that.config.width * that.config.startIndex +that.sizeUnit + ', 0, 0)';

			that.config.startIndex ++;
			// 过渡完成处理
			$(that.sliderBox).one('transitionend webkitTransitionEnd', function(){
				// 当轮播到最后一张的时候，无动画设置轮播容器到第2张图片位置
				if (that.config.startIndex * that.config.width == that.config.width * that.sliderBox.children.length) {
					that.sliderBox.style.transition = '';
					that.config.startIndex = 1;
					that.sliderBox.style.transform = 'translate3d(' + '-' + that.config.width * that.config.startIndex +that.sizeUnit + ', 0, 0)';
					that.sliderBox.style.webkitTransform = 'translate3d(' + '-' + that.config.width * that.config.startIndex +that.sizeUnit + ', 0, 0)';
					that.config.startIndex ++;
				}
				// 继续run
				that.play();
			});
		}, that.config.slidetime);
	},
	// 启动轮播生命周期
	run: function(config){
		$.extend(this.config, config);
		this.render(this.config.container);
	}
});