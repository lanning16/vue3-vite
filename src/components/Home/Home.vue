<template>
  <el-row :gutter="20">

    <!-- 左边内容 -->
    <el-col :span="8">
      <!-- 用户信息部分 -->
      <el-card class="box-card" shadow="hover" style="margin-bottom: 15px">
        <div class="user">
          <img src="../../assets/images/ln.jpg" alt="">
          <div class="user-info">
            <p>Admin</p>
            <p>超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间:<span>2022-9-13</span></p>
          <p>上次登录地点:<span>北京</span></p>
        </div>
      </el-card>
      <!-- 表格部分 -->
      <el-card class="box-card" shadow="hover">
        <el-table :data="tableList" stripe style="width: 100%">
          <el-table-column v-for="(value, key) in tableLabel" :key="key" :prop="key" :label="value" />
        </el-table>
      </el-card>
    </el-col>

    <!-- 右边内容 -->
    <el-col :span="16">
      <div class="num">

        <!-- 右上 -->
        <el-card :body-style="{display: 'flex', padding: 0}" v-for="(item,index) in countData" :key="index">
          <component class="icons" :is="item.icon" :style="{background: item.color}"></component>
          <div class="details">
            <p class="num">￥{{item.value}}</p>
            <p class="txt">{{item.name}}</p>
          </div>
        </el-card>
      </div>

      <!-- 右中 -->
      <el-card style="height: 280px">
        <div ref="echcart" style="height: 280px"></div>

      </el-card>

    </el-col>
  </el-row>
</template>

<script>
import { getCurrentInstance, onMounted, reactive, ref } from 'vue'
import axios from 'axios'

export default {
  name: 'Home',

  setup() {
    // 相当于this
    const { proxy } = getCurrentInstance()
    const tableList = ref([])
    // 定制左下的表头
    const tableLabel = {
      name: '品牌',
      todayBuy: '今日购买',
      monthBuy: '本月购买',
      totalBuy: '总购买'
    }
    // 线上调用 mock
    const getTableData = async () => {
      let { data: res } = await axios.get('https://fastmock.site/mock/16859b6fa5978e8522300bfc21951e7e/api/home/getTableData')
      tableList.value = res.data

      // 本地调用 Mock
      // let data = await axios.get('/home/getTableData')
      // console.log(data)

      // 二次封装axios
      // let res = await proxy.$api.getTableData()
      // console.log(res)
      // tableList.value = res
    }

    // 获取右侧上方数据
    const countData = ref([])
    const getCountData = async () => {
      const { data: res } = await axios.get('https://fastmock.site/mock/16859b6fa5978e8522300bfc21951e7e/api/home/getCountData')
      countData.value = res.data
      // console.log(data)
    }

    // 关于 echart 的配置
    // let xOptions = reactive({})
    // let pipOptions = reactive({})
    // let orderData = reactive({
    //   xData: [],
    //   series: []
    // })

    onMounted(() => {
      getTableData(), getCountData()
    })

    return { tableList, tableLabel, getTableData, getCountData, countData }
  }
}
</script>

<style lang="less" scoped>
.el-row {
  // 左边样式
  .user {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;

    img {
      width: 160px;
      height: 160px;
      border-radius: 50%;
      margin-right: 40px;
      margin-bottom: 10px;
    }

    .user-info {
      p {
        margin-bottom: 10px;
      }
    }
  }

  .login-info {
    p {
      margin-top: 10px;
      line-height: 20px;
      font-size: 14px;
      color: #999;
    }
    span {
      margin-left: 20px;
      color: #666;
    }
  }

  // 右边样式
  .num {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .el-card {
      width: 30%;
      height: 80px;
      margin-bottom: 15px;
      margin-right: 10px;

      .icons {
        width: 80px;
        height: 80px;
        line-height: 80px;
        text-align: center;
        font-size: 30px;
        color: #fff;
      }

      .details {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 15px;

        .num {
          font-size: 30px;
          margin-left: 15px;
          margin-bottom: 10px;
        }

        .txt {
          margin-left: 15px;
          font-size: 14px;
          text-align: center;
          color: #999;
        }
      }
    }
  }
}
</style>>
