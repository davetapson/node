console.log('Starting async-basics');
setTimeout(() => {
    console.log('Inside of callback');
}, 2000);

setTimeout(()=>{
    console.log('Second setTimeout');
}, 0);

setTimeout(function() {
    console.log('Third setTimeout');
}, 100);
console.log('Finishing up');