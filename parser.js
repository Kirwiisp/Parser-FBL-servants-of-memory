let text =
 ;
let regArr = [];
let list = [];
list.forEach(e => regArr.push(new RegExp(`${e}`)));
let fragmentTxt = []
for (let i = 0; i < list.length; i++) {
    if (i == list.length - 1) {
        fragmentTxt.push(text.slice(text.search(regArr[i]),));
        break;
    }
    fragmentTxt.push(text.slice(text.search(regArr[i]), text.search(regArr[i + 1])));
}
console.log(fragmentTxt[fragmentTxt.length - 1]);