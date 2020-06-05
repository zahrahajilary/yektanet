import React from 'react';
import './Filter.css'
const Filter = (props)=> {
        const {nameHandler,name,title,field,filedHandler,titleHandler,dateHandler,date,filterHandler} = props
        return(
          <div className="layout">
                <input type="text" id="name" name="name" placeholder="نام" value={name} onChange = {nameHandler} />
                <input type="date" id="changeDate" name="changeDate" value ={date} onChange ={dateHandler} />
                <input type="text" id="title" name="title" placeholder="عنوان" value={title} onChange = {titleHandler} />
                    <input type="text" id="field" name="field" placeholder="قیلد" value={field} onChange = {filedHandler} />
                <input type="submit" onClick={filterHandler} />
          </div>
        )
}
export default Filter