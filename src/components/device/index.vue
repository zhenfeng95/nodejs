<!-- @format -->

<template>
  <div class="device">
    <ul>
      <li>
        <div><span>备件编号：</span><span></span></div>
        <div><span>中心备件编号：</span><span></span></div>
        <div><span>所属科室：</span><span></span></div>
        <div><span>所属专业分类：</span><span></span></div>
        <div><span>系统设备分类：</span><span></span></div>
        <div><span>所属主机设备名称：</span><span></span></div>
        <div><span>备件中文名：</span><span></span></div>
        <div><span>备件英文名：</span><span></span></div>
        <div><span>规格型号：</span><span></span></div>
        <div><span>部件号：</span><span></span></div>
        <div><span>序列号：</span><span></span><img src="" alt="" /></div>
        <div><span>产地厂家：</span><span></span></div>
        <div><span>购入价格：</span><span></span></div>
      </li>
      <li>
        <div><span>现存放地：</span><span></span><img src="" alt="" /></div>
        <div><span>保管单位：</span><span></span></div>
        <div><span>登记人：</span><span></span></div>
        <div><span>登记时间：</span><span></span></div>
        <div><span>备件状况：</span><span></span></div>
        <div><span>最后检测时间：</span><span></span></div>
        <div><span>检测人：</span><span></span></div>
        <div><span>来源：</span><span></span></div>
        <div><span>所属系统编号：</span><span></span></div>
        <div><span>其它合用系统：</span><span></span></div>
        <div><span>其它合同系统编号：</span><span></span></div>
        <div><span>状态分类：</span><span></span></div>
        <div><span>入库时间：</span><span></span></div>
        <div><span>入帐时间：</span><span></span></div>
        <div><span>原值：</span><span></span></div>
        <div><span>税额</span><span></span></div>
      </li>
      <li>
        <div><span>所属固定资产设备编号：</span><span></span></div>
        <div><span>备注说明：</span><span></span></div>
        <div><span>履历表：</span><span></span></div>
        <div>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="date" label="时间" align="center">
            </el-table-column>
            <el-table-column prop="name" label="操作人" align="center">
            </el-table-column>
            <el-table-column prop="address" label="动作" align="center">
            </el-table-column>
            <el-table-column prop="status" label="状态" align="center">
            </el-table-column>
          </el-table>
        </div>
        <div class="button">
          <el-button type="primary">返回</el-button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '入库',
          status: '备用'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '入库',
          status: '备用'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '入库',
          status: '备用'
        }
      ]
    }
  },
  methods: {},
  mounted() {
    this.$apis.menu.getMenuList()
  }
}
</script>

<style lang="scss" scoped>
.device {
  ul {
    display: flex;
    text-align: left;
    li {
      position: relative;
      div {
        margin: 10px 0;
      }
    }
    .button {
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }
}
</style>
