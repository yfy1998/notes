/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    if(strs.length===0)return '';
    //strs.sort();
    const firststr=strs[0];
    let i=0,flag=true;
    while(i<firststr.length){
        for(let j=1;j<strs.length;j++){
            if(firststr[i]!==strs[j][i]) {
                flag=false;
                break;
            }
        }
        if(!flag) break;
        i++;
    }
    return firststr.substring(0,i);
};