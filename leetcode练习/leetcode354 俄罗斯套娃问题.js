/**
 * @param {number[][]} envelopes
 * @return {number}
 */
var maxEnvelopes = function(envelopes) {
    //高度排序 固定高度  求宽度的最长上升子序列
    if(envelopes.length===0) return 0;
    if(envelopes.length===1) return 1;
    envelopes.sort((a,b)=>{return a[1]-b[1]});
    const dp=[1];
    let res=0;
    for(let i=1;i<envelopes.length;i++){
        dp[i]=1;
        for(let j=0;j<i;j++){
            if(envelopes[i][0]>envelopes[j][0]&&envelopes[i][1]!==envelopes[j][1]){
                dp[i]=Math.max(dp[i],dp[j]+1);
            }
        }
        res=Math.max(res,dp[i]);
    }
    return res;
};

maxEnvelopes([[1,15],[7,18],[7,6],[7,100],[2,200],[17,30],[17,45],[3,5],[7,8],[3,6],[3,10],[7,20],[17,3],[17,45]]);