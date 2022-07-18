Page({

    /**
     * 页面的初始数据
     */
    data: {
      showBtn: false,
      changeBtn: false,
      foodName: '',
      timer: null,
      randomTextList: [],
      visible: false,
      textAreaValueList: ['馄饨', '拉面', '烩面', '热干面', '刀削面', '油泼面', '炸酱面', '火锅','北京烤鸭','兰州拉面','四川串串香','重庆酸辣粉','武汉热干面','西安肉夹馍','长沙小龙虾','广东肠粉','小笼包','广西桂林米粉','柳州螺蛳粉','天津煎饼果子'],
      textAreaValue: '',
    },

    onLoad() {
        const foodNameStr = wx.getStorageSync('foodNameStr');
        this.setData({
            textAreaValue: foodNameStr || this.data.textAreaValueList.join('，'),
            textAreaValueList: foodNameStr ? foodNameStr.split('，') : this.data.textAreaValueList
        });
    },

    start() {
        const timer = setInterval(() => {
            const list = this.data.textAreaValueList;
            const r = Math.ceil(Math.random() * list.length);
            const foodName = list[r - 1];
            let randomTextList = [];
            for(let i = 0; i < 10; i++) {
                const r = Math.ceil(Math.random() * list.length);
                const foodName = list[r - 1];
                const rTop = Math.ceil(Math.random() * wx.getSystemInfoSync().windowHeight);
                const rLeft = Math.ceil(Math.random() * (wx.getSystemInfoSync().windowWidth - 50));
                const rSize = Math.ceil(Math.random() * (37 - 14) + 14);
                const rOpacity = Math.random();
                randomTextList.push({ top: rTop, left: rLeft, fontSize: rSize, opacity: rOpacity, foodName});
            }
            this.setData({
                foodName,
                randomTextList,
            })
        }, 100);
        this.setData({
            showBtn: true,
            changeBtn: false,
            timer
          });
      },

      stop() {
        clearInterval(this.data.timer);
        this.setData({
            showBtn: false,
            changeBtn: true,
            timer: '',
          });
      },

      // 自定义食物名称
      onOk() {
          clearInterval(this.data.timer);
          wx.setStorageSync('foodNameStr', this.data.textAreaValue);
          this.setData({
            showBtn: false,
            changeBtn: false,
            timer: '',
            foodName: '',
            visible: !this.data.visible,
            textAreaValue: this.data.textAreaValue,
            textAreaValueList: this.data.textAreaValue.split('，')
          });
      },

      onModal() {
          this.setData({
            visible: !this.data.visible,
            textAreaValue: this.data.textAreaValueList.join('，')
          })
      }
  });
  
