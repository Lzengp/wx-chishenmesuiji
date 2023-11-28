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
      timeText: '',
    },

    adLoad() {
        console.log('Banner 广告加载成功')
      },
    adError(err) {
        console.error('Banner 广告加载失败', err)
      },
    adClose() {
        console.log('Banner 广告关闭')
    },

    onLoad() {
        const that = this;
        const foodNameStr = wx.getStorageSync('foodNameStr');
        const date = new Date();
        let timeStr = '';
        if (date.getHours() >= 6 && date.getHours() < 12) {
            timeStr = '早上';
        } else if (date.getHours() >= 12 && date.getHours() < 18) {
            timeStr = '中午';
        } else if (date.getHours() >= 18 && date.getHours() < 24) {
            timeStr = '晚上';
        } else if (date.getHours() >= 0 && date.getHours() < 6) {
            timeStr = '夜宵';
        }
        this.setData({
            textAreaValue: foodNameStr || this.data.textAreaValueList.join('，'),
            textAreaValueList: foodNameStr ? foodNameStr.split('，') : this.data.textAreaValueList,
            timeText: timeStr,
        });
        // wx.startAccelerometer({
        //     interval: 'game',
        //     success: () => {
        //         wx.onAccelerometerChange((res) => {
        //             if (res.x > 3 || res.y > 3 || res.z > 3) {
        //                 that.start();
        //                 setTimeout(() => {
        //                     that.stop();
        //                 }, 3000);
        //             }
        //         })
        //     }
        // })
    },

    start() {
        wx.vibrateShort();
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
        this.data.timer && clearInterval(this.data.timer);
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
      },

      // 退出程序
      onHide() {
          clearInterval(this.data.timer);
          wx.stopAccelerometer();
          this.setData({
            showBtn: false,
            changeBtn: false,
            foodName: '',
            timer: null,
            visible: false,
            textAreaValue: '',
          })
      },

      // 设置分享
      onShareAppMessage() { }
  });
  
