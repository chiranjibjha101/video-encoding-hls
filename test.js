let arr=[1,2,3,4,5];
let sum=arr.reduce((acc,crr)=>{
    return acc+=crr;
},0);

console.log(sum);
