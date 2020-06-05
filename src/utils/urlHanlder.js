/**
 * set query params to url
 * @param {*} _k 
 * @param {*} _v 
 */
export const SetParamUrl = (_k, _v) => {// replace and add new parameters
    let arrParams = window.location.search !== '' ? decodeURIComponent(window.location.search.substr(1)).split('&').map(_v => _v.split('=')) : Array();
    let index = arrParams.findIndex((_v) => _v[0] === _k);
    index = index !== -1 ? index : arrParams.length;
    _v === null ? arrParams = arrParams.filter((_v, _i) => _i != index) : arrParams[index] = [_k, _v];
    let _search = decodeURIComponent(arrParams.map(_v => _v.join('=')).join('&'));

    let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + (arrParams.length > 0 ? '?' + _search : '');
    if (window.history.pushState) { // without reload  
        window.history.pushState({ path: newurl }, null, newurl);
    }

};
/**
 * get queryParams from url
 * @param {*} _k 
 */
export const GetParamUrl = (_k) => {
    let urlParams = new URLSearchParams(window.location.search)
    return urlParams.get(_k)

};