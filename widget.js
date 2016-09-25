// WidgetSlider
// ＝＝＝＝＝＝
// 1.默认变量
// boundingBox: 父容器
// ＝＝＝＝＝＝＝＝＝＝
// 2.接口
// renderUI: 添加dom节点
// bindUI: 监听者
// initUI: 初始化属性
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// 3.方法
// render: 渲染组件
function WidgetSlider() {
    this.boundingBox = null;
}
WidgetSlider.prototype = {
    renderUI: function() {},
    bindUI: function() {},
    initUI: function() {},
    render: function(container) {
        this.handlers = {};
        this.renderUI();
        this.bindUI();
        this.initUI();
        container.innerHTML = '';
        container.appendChild(this.boundingBox);
    }
}
window.WidgetSlider = WidgetSlider;