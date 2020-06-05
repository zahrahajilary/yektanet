/**
 * add item to a localStorage
 * @param {*} id 
 */
export const addToLocalStorage = (id) => {
    let items = JSON.parse(localStorage.getItem('itemList')) || [];
    console.log(localStorage,'items')
    items.push(id);
    localStorage.setItem('itemList', JSON.stringify(items)); 
}
/**
 * remove Item from localStorage
 * @param {*} id 
 */
export const removeFromLocalStorage = (id)=>{
    let items = JSON.parse(localStorage.getItem('itemList')) || []
   items=items.filter(item => item !== id)
   localStorage.setItem('itemList', JSON.stringify(items)); 
}