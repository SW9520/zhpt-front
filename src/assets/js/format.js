export  function formatTreeTableData(list) {
  function formatData(list) {
    var data = []
    for (let menu of list) {
      let menuId = menu.id;
      let child = list.filter((m) => {
        return m.parentId === menuId
      })
      menu.child = child
      data.push(menu)
    }
    return this.delRepeatData(null, data)
  }

  function delRepeatData(list, tableData) {
    if (!list) {
      list = tableData
    }
    for (let item of list) {
      if (item.child && item.child.length > 0) {
        for (let children of item.child) {
          tableData = tableData.filter((m) => {
            return m.id != children.id //去除数组重复的值
          })
          if (children.child) {
            delRepeatData(children.child, tableData)
          }
        }
      }
    }
    return tableData
  }

  return formatData(list)
}

export  function formatTreeSelectData(list) {
  for(let item of list){
    item.value = item.id;
    item.label = item.name;
  }
  function formatData(list) {
    var data = []
    for (let menu of list) {
      let menuId = menu.id;
      let children = list.filter((m) => {
        return m.parentId === menuId
      })
      menu.children = children
      data.push(menu)
    }
    return delRepeatData(null, data)
  }

  function delRepeatData(list, tableData) {
    if (!list) {
      list = tableData
    }
    for (let item of list) {
      if (item.children && item.children.length > 0) {
        for (let child of item.children) {
          tableData = tableData.filter((m) => {
            return m.id != child.id //去除数组重复的值
          })
          if (child.children) {
            delRepeatData(child.children, tableData)
          }
        }
      }
    }
    return tableData
  }

  return formatData(list)
}
