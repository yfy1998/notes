/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function(s1, s2) {
    if(s1==='')return true;
    let s1map=new Map();
    for(let i=0;i<s1.length;i++){
        if(s1map.has(s1[i])){
            let newcount=s1map.get(s1[i])+1;
            s1map.set(s1[i],newcount);
        }
        else s1map.set(s1[i],1);
    }
    for(let i=0;i<s2.length-s1.length+1;i++){
        let mapcopy=new Map([...s1map]);
        let j=i;
        while(mapcopy.size>0){
          if(mapcopy.has(s2[j])){
              let news2j=mapcopy.get(s2[j])-1;
              if(news2j===0) mapcopy.delete(s2[j]);
              else mapcopy.set(s2[j],news2j);
          }
          else break;
          j++;
          }
        if(mapcopy.size===0) return true;
    }
    return false;
};