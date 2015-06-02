/*
 *Create by Zoro
 *2015-5-28
 *
 */
//翻转的时候简单处理一下viewport
(function(doc) {

    var addEvent = 'addEventListener',
        type = 'gesturestart',
        qsa = 'querySelectorAll',
        scales = [.5, .5],
        meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];

    function fix() {
        meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
        doc.removeEventListener(type, fix, true);
    }

    if ((meta = meta[meta.length - 1]) && addEvent in doc) {
        fix();
        scales = [.25, 1.6];
        doc[addEvent](type, fix, true);
    }

}(document));

(function() {
    myTest = function() {
    	this.e = null;    
    	this.canvas = null;
    	this.ctx = null;
    	this.isTest2 = false;
    };
    myTest.prototype = {
        init: function() {
        	//console.log('init');
        	//初始化变量
        	this.e = $('#conetent');
        	this.canvas = $('#canvas');
        	this.ctx = document.getElementById('canvas').getContext('2d');
        	//绑定事件
        	this.bindAll();
        },

        bindAll: function () {
        	console.log('bindAll');
        	var that = this;
        	
        	//绑定按钮
        	this.e.delegate('.btn', 'touchend', function(){
        		console.log('touchend');
        		that.e.addClass('run');
        		if ($(this).attr('test') == 1) {
        			that.test1();
        		} else if ($(this).attr('test') == 2) {
					that.test2();
        		}
        	});

        	//绑定返回
        	this.e.find('#back_btn').bind('touchend', function() {
        		console.log('touchend');
        		that.e.removeClass('run');
        		that.isTest2 = false;
        		that.ctx.clearRect(0, 0, 640, 640);
        	});

        	var target = null;
        	this.canvas.bind('touchstart', function(event) {
        		if (that.isTest2) {
        			target = $(this);
        			console.log('start');
        			that.drawCircle(event.touches[0].pageX - that.canvas.offset().left, event.touches[0].pageY +  - that.canvas.offset().top);
        		}
        	});

        	this.canvas.bind('touchmove', function(event) {
        		if (that.isTest2 && target) {
        			console.log('move');
        			that.drawCircle(event.touches[0].pageX - that.canvas.offset().left, event.touches[0].pageY +  - that.canvas.offset().top);
        		}
        	});

        	this.canvas.bind('touchend', function(event) {
        		if (that.isTest2 && target) {
        			console.log('touchend');
        			target = null;
        		}
        	});
        },

        /*绘制圆*/
        drawCircle: function(x, y) {
        	x = x == undefined ? 320 : x;//640 / 2
        	y = y == undefined ? 320 : y;//640 / 2
        	
        	//如果是测试二，设置globalCompositeOperation属性
        	if (this.isTest2) {
        		this.ctx.fillStyle = "#AAAAAA";
				this.ctx.fillRect(70 ,70, 500, 500);//(640 - 500) / 2
				this.ctx.fill();
				this.ctx.globalCompositeOperation = 'source-atop';
			}

        	this.ctx.beginPath();
			this.ctx.arc(x, y, 640 / 2 / 2, 0, Math.PI * 2, true);
			this.ctx.strokeStyle = "#222222";
			this.ctx.stroke();
			this.ctx.fillStyle = "#555555";
			this.ctx.closePath();
			
			this.ctx.fill();
			//this.ctx.clip();
        },

        /*
        	测试方法1
			z. 创建一个640x640的canvas，背影颜色为#FFFFFF
			a. 绘制一个边颜色#222222、填充颜色#555555的2D圆，命名为圆A
			b. 圆的大小为canvas的一半(这里表达不太清楚，姑且认为是圆的直径为canvas宽度的一半)
			c. 使该圆相对于canvas居中
        */
        test1: function() {
        	this.isTest2 = false;
        	
        	this.drawCircle();
        },

        /*
        	测试方法2
        	a. 去掉 1.c 功能，实现可以用鼠标或手指(移动设备)拖拽该圆
			b. 在canvas背景层与圆A层之间绘制一个500x500相对于canvas居中颜色为#AAAAAA的填充正方形B
			c. 当圆A的部分或全部被拖拽到正方形B以外时，隐藏掉圆A不在正方形B内的那部分
  		*/
        test2: function() {
        	this.isTest2 = true;

        	this.drawCircle();
        }
    };
})();
var test = new myTest();
test.init();