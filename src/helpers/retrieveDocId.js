
function retriveDocId(id) {
    console.log('is called');
    console.log(this);
    let docId = "";
    for (let key in this) {
        if (this.hasOwnProperty(key)) {
            if (this[key].id === id) docId=key;
        }
    }
    return docId;
}

export default retriveDocId;