/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    //     滑动窗口  [i,j) 左闭右开
        let hashmap={};
        let i=0,j=0;
        let maxle=0;
        while(j<s.length){
            if(hashmap[s[j]]===undefined){
                hashmap[s[j]]=j;
                j++;
            }
            else{
                maxle=Math.max(maxle,j-i);
                let newi=hashmap[s[j]]+1;
                while(i<newi){
                    delete hashmap[s[i]];
                      i++;
                      }
            }
        }
        maxle=Math.max(maxle,j-i);
        return maxle;
    };

lengthOfLongestSubstring(" ");

/**
 * @param {string} 
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let str = '', max = 0, in_i = -1, i = 0, len = s.length
    for (i = 0; i < len; i++) {
        in_i = str.indexOf(s[i])
        str += s[i]
        if (in_i > -1) {
            str = str.substring(in_i + 1)
        }
        max = max > str.length ? max : str.length
    }
    return max
};