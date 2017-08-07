var getUser =(id, callback) =>{
    var user = {
        id: 1,
        name: 'Dave'
    };
    setTimeout(function() {
        callback(user);
    }, 3000);    
};

getUser(1, (user) => {
    console.log(user);
});