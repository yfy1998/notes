/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function(triangle) {
    //动态规划
    if(triangle.length===0) return 0;
    const n=triangle.length;
    const dp=[];
    for(let i=0;i<n;i++){
        dp.push([]);
    }
    
    dp[0][0]=triangle[0][0];
    let m=2;
    let res=Number.MAX_VALUE;
    for(let i=1;i<n;i++){
        for(let j=0;j<m;j++){
            if(j===0) dp[i][j]=dp[i-1][j]+triangle[i][j];
            if(j===m-1) dp[i][j]=dp[i-1][j-1]+triangle[i][j];
            if(j>0&&j<m-1)dp[i][j]=triangle[i][j]+Math.min(dp[i-1][j-1],dp[i-1][j]);
            if(i===n-1){
                res=Math.min(res,dp[i][j]);
            }
        }
        m++;
    }
    return res;
};

minimumTotal([[2],[3,4],[6,5,7],[4,1,8,3]]);