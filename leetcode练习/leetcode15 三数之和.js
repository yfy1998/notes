/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    //排序+双指针+去重判断
    const res=[];
    nums.sort((a,b)=>a-b);
    for(let i=0;i<nums.length;){
        let twosum=0-nums[i];
        let left=i+1,right=nums.length-1;
        while(left<right){
            let curtwosum=nums[left]+nums[right];
            if(curtwosum>twosum){
                while(nums[right--]===nums[right]){
                    if(right<=left) break;
                };
            }
            if(curtwosum===twosum){
                res.push([nums[i],nums[left],nums[right]]);
                while(nums[right--]===nums[right]){
                    if(right<=left) break;
                };
                while(nums[left++]===nums[left]){
                    if(right<=left) break;
                };
            }
            if(curtwosum<twosum){
                while(nums[left++]===nums[left]){
                    if(right<=left) break;
                };
            }
        }
        while(nums[i++]===nums[i]){       
            if(i===nums.length-1) {
                i++;
                break;
            }
        }
    }
    return res;
};

threeSum([-1, 0, 1, 2, -1, -4]);