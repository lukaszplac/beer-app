
function retriveDocId(id) {
    let docId = "";
    for (let key in this) {
        if (this.hasOwnProperty(key)) {
            if (this[key].id === id) docId=key;
        }
    }
    return docId;
}

export default retriveDocId;