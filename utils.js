module.exports = function random(arr){
    if(arr.length == 0) return;
    let randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}