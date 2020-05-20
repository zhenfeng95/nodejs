/** @format */

import Vue from 'vue'
import { $dataReport } from '@helper'

/**
 * ***************** 按钮数据上报指令 *******************
 */

Vue.directive('dataReportClick', {
  inserted: (el, binding) => {
    if (!binding.value) return
    const { eleId } = binding.value
    if (eleId) {
      el.bindDataReportClick = () => {
        const data = Object.create(null)

        data.eleId = eleId
        // console.log(binding.value)
        $dataReport.reportClick(data)
      }
      el.addEventListener('click', el.bindDataReportClick)
    }
  }
})
