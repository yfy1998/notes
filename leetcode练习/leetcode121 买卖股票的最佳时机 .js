/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let res=0;
    let minindex,minprice,maxprice,rightindex=prices.length-1;
    while(rightindex>0){
        minprice=Math.min(...prices.slice(0,rightindex+1));
        for(let i=0;i<prices.length;i++){
            if(prices[i]===minprice) {
                minindex=i;
                break;
            }
        }
        if(minindex===rightindex) {
            rightindex--;
            continue;
        }
        maxprice=Math.max(...prices.slice(minindex+1,rightindex+1));
        res=res>maxprice-minprice?res:maxprice-minindex;
        rightindex=minindex-1;
    }
    return res;
};

maxProfit([7,1,5,3,6,4]);