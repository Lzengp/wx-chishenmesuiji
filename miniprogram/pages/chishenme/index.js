Page({

    /**
     * 页面的初始数据
     */
    data: {
      showBtn: false,
      changeBtn: false,
      foodName: '',
      timer: null,
    },

    start() {
        // wx.showLoading({
        //     title: '别选了',
        //   });
        const timer = setInterval(() => {
            const list = ['馄饨', '拉面', '烩面', '热干面', '刀削面', '油泼面', '炸酱面', '火锅','北京烤鸭','兰州拉面','四川串串香','重庆酸辣粉','武汉热干面','西安肉夹馍','长沙小龙虾','广东肠粉','小笼包','广西桂林米粉','柳州螺蛳粉','天津煎饼果子','山东煎饼','东北锅包肉','福建佛跳墙','河南烩面','山西刀削面','南昌瓦罐汤','河北驴肉火烧','杨文婵', '刘晓媛'];
            const r = Math.ceil(Math.random() * list.length);
            this.setData({
                foodName: list[r - 1]
            })
        }, 100);
        this.setData({
            showBtn: true,
            changeBtn: false,
            timer
          });

  
          const rTop = Math.ceil(Math.random() * wx.getSystemInfoSync().windowHeight);
          const rLeft = Math.ceil(Math.random() * (wx.getSystemInfoSync().windowWidth - 50));
          const rSize = Math.ceil(Math.random() * (37 - 14) + 14);
          console.log(rTop, rLeft, rSize);
      },

      stop() {
        clearInterval(this.data.timer)
        this.setData({
            showBtn: false,
            changeBtn: true,
          });
      }
  });
  
