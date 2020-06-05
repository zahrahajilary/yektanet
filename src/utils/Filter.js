
/**
 * doing dynamic and multiple filters in same time
 * @param {*} data 
 * @param {*} filterBy 
 */
export const DynamicFilter = (data,filterBy) => {
   return data.filter(o =>{
        return Object.keys(filterBy).every(k => filterBy[k].some(f => o[k] === f))});
}

