// 使用zepto实现轮播图
$(function(){
  /*
  实现轮播图 步骤：
  1.添加首尾两张图片
  2.重新设置图片盒子宽度和图片的宽度
  3.开启定时器 实现自动轮播
  4.添加移动端的滑动事件 实现手动轮播
  5.添加过渡效果结束之后的监听
  
  */
 //1.添加首尾两张图片
 //获取轮播图元素
  var banner = $(".jd_banner");
  var bannerWidth= banner.width();
  //获取图片盒子
  var imgBox = banner.find("ul:first-of-type");
  //获取点标记
  var indicators = banner.find("ul:eq(1)");//使用jq选择器
  //获取首尾两个元素
  var first = imgBox.find("li:first-of-type");
  var last = imgBox.find("li:last-of-type");
  // 添加图片到指定位置
  imgBox.append(first.clone())
  // first.clone()：将first复制一份
  last.clone().insertBefore(first);

  // 设置图片盒子的宽度
  var lis = imgBox.find("li");
  var count = lis.length;
  imgBox.width(count*bannerWidth)
  // 设置图片的宽度
  lis.each(function(index,value){
    $(lis[index]).width(bannerWidth);
  })
  // 设置默认偏移
  imgBox.css("left",-bannerWidth);

  // 定义索引
  index =1;
  // 封装切换效果
  var imgAnimation =function(){
    // 动画执行完毕执行
        // 判断当前索引是否为最后一张或者为第一张
        if(index==count-1){
          // 最后一张
          index = 1;
          //让它瞬间偏移到索引1的位置--非过渡
          imgBox.css("left",-index*bannerWidth)
        }else if(index == 0){
          index=count-2;
          imgBox.css("left",-index*bannerWidth);
        }
        // 设置点标记
        indicators.removeClass("active").eq(index-1).addClass("active");
  }
  // 开启定时器
  var timeId = setInterval(function(){
    index++;  
    // 在zepto中 使用animate函数
    // 参数1 需要添加动画效果的样式 -对象
    // 参数2 动画的耗时
    // 参数3 动画的速度函数
    // 参数4 回调函数
    imgBox.animate(
      {"left":-index*bannerWidth},
      200,
      "ease-in-out",
      // imgAnimation()
      )
  },2000);
  // 谷歌中无法正确的触发swipe事件 模拟器中
  // 左滑动
  imgBox.on("swipeLeft",function(){
    clearInterval(timeId);
    index++;
    imgAnimation();
  })
  //右滑动
  imgBox.on("swipeRight",function(){
    clearInterval(timeId);
    index++;
    imgAnimation();
  })
})

/*
  zepto事件
  tap 单击
    singleTap,doubleTap,longTap
  swipe
  swipeLeft,swipeRight,swipeUp,swipeDown
*/