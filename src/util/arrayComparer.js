const arraysIdentical = (arr1, arr2) =>{
    var i = arr1.length;
    if (i !== arr2.length) {
        return false;
    }
    while (i--) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
  }
  
const indexOf = (arr, val, comparer) => {
    for (var i = 0, len = arr.length; i < len; ++i) {
        if ( i in arr && comparer(arr[i], val) ) {
            return i;
        }
    }
    return -1;

}

exports.arraysIdentical = arraysIdentical;
exports.indexOf = indexOf;



