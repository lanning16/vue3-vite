<template>
  <!-- 头部 -->
  <div class="user-header">
    <el-button type="primary" @click="handleAdd">+新增</el-button>
    <el-form :inline="true" :model="formInline">
      <el-form-item label="请输入">
        <el-input v-model="formInline.keyword" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSerch">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>

  <!-- 表格部分 -->
  <div class="table">
    <el-table :data="userData" stripe style="width: 100%" height="450">
      <el-table-column v-for="(item, index) in user" :key="index" :prop="item.prop" :label="item.label" :width="item.width ? item.width : 0" />

      <el-table-column fixed="right" label="操作" width="180">
        <template #default="scope">
          <!-- scope.row 就是这一行的数据 -->
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 页码 -->
    <div class="page">
      <el-pagination small :page-size="20" :pager-count="5" layout="prev, pager, next" :total="config.total" @current-change="changePage" />
    </div>
  </div>

  <!-- 模态框 -->
  <el-dialog v-model="dialogVisible" :title="action == 'add' ? '新增用户' : '编辑用户'" width="40%" :before-close="handleClose">
    <el-form :inline="true" :model="formUser" ref="userForm" :rules="rules">
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="formUser.name" placeholder="请输入姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年龄" prop="age">
            <el-input v-model="formUser.age" placeholder="请输入年龄" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="性别" prop="sex">
            <el-select v-model="formUser.sex" placeholder="请选择性别">
              <el-option label="男" value="0" />
              <el-option label="女" value="1" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出生日期" prop="birth">
            <el-date-picker v-model="formUser.birth" type="date" label="出生日期" placeholder="请输入" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="formUser.addr" placeholder="请输入地址" />
        </el-form-item>
      </el-row>

      <el-row style="justify-content: flex-end">
        <el-form-item>
          <el-button type="primary" @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <!-- <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确定</el-button>
      </span>
    </template> -->
  </el-dialog>
</template>
<script>
import { getCurrentInstance, onMounted, ref, reactive } from 'vue'

export default {
  name: 'User',

  setup() {
    const { proxy } = getCurrentInstance()

    // 表头
    const user = reactive([
      {
        prop: 'name',
        label: '姓名'
      },
      {
        prop: 'age',
        label: '年龄'
      },
      {
        prop: 'sex',
        label: '性别'
      },
      {
        prop: 'birth',
        label: '出生日期',
        width: 200
      },
      {
        prop: 'addr',
        label: '地址',
        width: 320
      }
    ])

    // 获取用户数据
    const userData = ref([])
    const config = reactive({
      total: 0,
      page: 1,
      name: ''
    })
    const getUserData = async config => {
      // 二次封装 axios
      let res = await proxy.$api.getUserList(config)
      config.total = res.count
      userData.value = res.list.map(item => {
        if (item.sex === 0) {
          item.sex = '女'
        } else {
          item.sex = '男'
        }
        return item
      })
    }

    // 页码数
    const changePage = page => {
      config.page = page
      getUserData(config)
    }

    const formInline = reactive({
      keyword: ''
    })

    // 搜索用户函数
    const handleSerch = () => {
      config.name = formInline.keyword
      getUserData(config)
    }

    // 控制模态框的显示隐藏
    const dialogVisible = ref(false)

    const handleClose = done => {
      ElMessageBox.confirm('确定关闭吗?')
        .then(() => {
          proxy.$refs.userForm.resetFields() // 重置表单值
          done()
        })
        .catch(() => {
          // catch error
        })
    }

    // 添加用户的 form 数据
    const formUser = reactive({
      name: '', // 添加用户的用户名
      age: '',
      sex: '',
      birth: '',
      addr: ''
    })

    // 格式化日期
    const timeFormat = time => {
      var time = new Date()
      var year = time.getFullYear()
      var month = time.getMonth() + 1
      var date = time.getDate()

      function add(m) {
        return m < 10 ? '0' + m : m
      }

      return year + '-' + add(month) + '-' + add(date)
    }

    // 添加用户
    const onSubmit = () => {
      proxy.$refs.userForm.validate(async valid => {
        if (valid) {
          if (action.value == 'add') {
            formUser.birth = timeFormat(formUser.birth)
            let res = await proxy.$api.addUser(formUser)
            // console.log(res)
            if (res) {
              dialogVisible.value = false // 隐藏模态框
              proxy.$refs.userForm.resetFields() // 重置表单值
              getUserData(config) // 从新调用
            }
          } else {
            // 编辑接口
            formUser.sex == '男' ? (formUser.sex = 1) : (formUser.sex = 0)
            let res = await proxy.$api.editUser(formUser)
            if (res) {
              dialogVisible.value = false // 隐藏模态框
              proxy.$refs.userForm.resetFields() // 重置表单值
              getUserData(config) // 从新调用
            }
          }
        } else {
          ElMessage({
            showClose: true,
            message: '请输入正确的内容',
            type: 'error'
          })
        }
      })
    }

    // 模态框取消的时候不显示校验失败字段
    const handleCancel = () => {
      dialogVisible.value = false
      proxy.$refs.userForm.resetFields() // 重置表单值
    }

    // 校验规则
    const rules = reactive({
      name: [
        {
          required: true,
          message: '请输入姓名',
          trigger: 'blur'
        },
        { min: 2, max: 4, message: '姓名长度在2--4个字符', trigger: 'blur' }
      ],
      age: [
        {
          required: true,
          message: '请输入年龄',
          trigger: 'blur'
        },
        { min: 1, max: 3, message: '年龄长度在1--3个字符', trigger: 'blur' }
      ],
      birth: [
        {
          required: true,
          message: '请输入出生日期',
          trigger: 'blur'
        }
      ]
    })

    // 区分编辑和新增
    const action = ref('add')

    // 编辑用户
    const handleEdit = row => {
      action.value = 'edit'
      dialogVisible.value = true

      proxy.$nextTick(() => {
        // 浅拷贝
        Object.assign(formUser, row)
      })
    }

    // 定义新增用户的显示
    const handleAdd = () => {
      action.value = 'add'
      dialogVisible.value = true
    }

    // 删除用户
    const handleDelete = row => {
      ElMessageBox.confirm('确定删除吗?')
        .then(async () => {
          await proxy.$api.deleteUser({
            id: row.id
          })

          ElMessage({
            showClose: true,
            message: '删除成功',
            type: 'success'
          })

          getUserData(config)
        })
        .catch(() => {
          // catch error
        })
    }

    onMounted(() => {
      getUserData(config)
    })

    return {
      user,
      userData,
      getUserData,
      config,
      changePage,
      formInline,
      handleSerch,
      dialogVisible,
      handleClose,
      formUser,
      onSubmit,
      rules,
      handleCancel,
      handleEdit,
      action,
      handleAdd,
      handleDelete
    }
  }
}
</script>

<style lang="less" scoped>
.user-header {
  display: flex;
  justify-content: space-between;
}
.table {
  width: 100%;

  .page {
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
  }
}
</style>
>
