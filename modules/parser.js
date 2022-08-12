let regArr = [];
let listCreature = getListCreature();
let text = getText();
listCreature.forEach(e => regArr.push(new RegExp(`${e}`)));
let fragmentTxt = []
for (let i = 0; i < listCreature.length; i++) {
    if (i == listCreature.length - 1) {
        fragmentTxt.push(text.slice(text.search(regArr[i]),));
        break;
    }
    fragmentTxt.push(text.slice(text.search(regArr[i]), text.search(regArr[i + 1])));
}
console.log(fragmentTxt[fragmentTxt.length - 1]);