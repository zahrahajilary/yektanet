
/**
 * assending and dessending
 * @param {*} property 
 */
function dynamicSort(property) {
    var sortOrder = 1;

    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    /**
     * doing sort
     */
    return function (a,b) {
        if(sortOrder == -1){
            return b[property].toString().localeCompare(a[property]);
        }else{
            return a[property].toString().localeCompare(b[property]);
        }        
    }
}
export const SORT = (data,key)=>{ 
   return data.sort(dynamicSort(key))
}
 
