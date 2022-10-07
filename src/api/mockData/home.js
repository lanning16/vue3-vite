
export default {
  // home页面 左下数据
  getTableData: () => {
    return {
      code: 200,
      data: {
        tableData: [
          {
            name: 'oppo',
            todayBuy: 100,
            monthBuy: 300,
            totalBuy: 800
          },
          {
            name: 'vivo',
            todayBuy: 100,
            monthBuy: 300,
            totalBuy: 800
          },
          {
            name: '苹果',
            todayBuy: 100,
            monthBuy: 300,
            totalBuy: 800
          },
          {
            name: '小米',
            todayBuy: 100,
            monthBuy: 300,
            totalBuy: 800
          },
          {
            name: '三星',
            todayBuy: 100,
            monthBuy: 300,
            totalBuy: 800
          },
          {
            name: '魅族',
            todayBuy: 100,
            monthBuy: 300,
            totalBuy: 800
          }
        ]
      }
    }
  },

  // 右上数据
  getCountData: () => {
    return {
      code: 200,
      data: {
        countData: [
          {
            name: "今日支付订单",
            value: 1234,
            icon: "SuccessFilled",
            color: "#2ec7c9",
          },
          {
            name: "今日收藏订单",
            value: 210,
            icon: "Star",
            color: "#ffb980",
          },
          {
            name: "今日未支付订单",
            value: 1234,
            icon: "Goods",
            color: "#5ab1ef",
          },
          {
            name: "本月支付订单",
            value: 1234,
            icon: "SuccessFilled",
            color: "#2ec7c9",
          },
          {
            name: "本月收藏订单",
            value: 210,
            icon: "Star",
            color: "#ffb980",
          },
          {
            name: "本月未支付订单",
            value: 1234,
            icon: "Goods",
            color: "#5ab1ef",
          },
        ]
      }
    }
  }



}