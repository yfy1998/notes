async function foo(arr){
	for(let item of arr){
		await new Promise((resolve)=>{  //await可以实现js中的休眠
			setTimeout(resolve,1000)
		});
		console.log(item);
    }
}
foo([1,2,3,4,5,6,7,8]);
console.log(9);


// for(let [index,item] of [1,2,3,4,5,6,7,8].entries()){
//     setTimeout(()=>console.log(item),(index+1)*1000)
// }