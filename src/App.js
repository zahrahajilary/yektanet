import React from 'react';
import data from './resource/data.json'
import {BinarySearchTree} from './utils/BST'
import Table from './components/Table/Table'
function App() {
  let tree = new BinarySearchTree()
  data.forEach((item)=> {
    const itemDate = new Date(item.date).setHours(0,0,0,0)
     tree.insert(itemDate, item)
  })

  const header = [
      {key:'name',value:'نام تغییر دهنده'},
      {key:'date',value:'تاریخ'},
      {key:'title', value:'نام آگهی'},
      {key: 'field', value:'فیلد' },
      {key: 'old_value', value:'مقدار قدیمی' },
      {key: 'new_value', value:'مقدار جدید' },
      {key: 'favorite', value:' نشان شده' },
  ]

  return (
    <div className="App">
      <Table BST={tree} header={header}/>
    </div>
  );
}

export default App;
