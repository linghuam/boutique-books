
function swap(arr, index1, index2) {
    var temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}

function bubbleSort(arr) {
    for (var i = 0, len = arr.length; i < len; i++) {
        // 改进： j < len - 1 - i，已经排好序的可以不用再比较
        for(var j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j+1]) {
                swap(arr, j, j+1);
            }
        }
    }
}

var arr = [5,4,3,2,1];
// bubbleSort(arr);

function selectionSort(arr) {
    var minIndex;
    for (var i = 0; i < arr.length-1; i++) {
        minIndex = i;
        for (var j = i+1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        swap(arr, minIndex, i);
    }
}
// selectionSort(arr);

function insertionSort(arr) {
    if (arr.length < 2) return arr;
    for (var i = 1, len = arr.length; i < len; i++) {
        var j = i - 1;
        var temp = arr[i]; // 相当于将i提取出，留个空位
        while(j >=0 && arr[j] > temp) {
            arr[j+1] = arr[j];
            j--;
        }
        arr[j+1] = temp;
    }
}
insertionSort(arr);

function mergeSort(arr) {
    var len = arr.length;
    if (len === 1) return arr;
    var mid = Math.floor(len/2);
    var left = arr.slice(0, mid);
    var right = arr.slice(mid, len);
    return merge(mergeSort(left), mergeSort(right));
}
function merge(left, right) {
    var i = 0, 
        j = 0, 
        l = left.length, 
        r = right.length, 
        temp = [];
    while(i < l && j < r) {
        if (left[i] < right[j]) {
            temp.push(left[i]);
            i++;
        } else {
            temp.push(right[j]);
            j++;
        }
    }
    if (i < l) {
        temp.push(...left.slice(i));
    }
    if (j < r) {
        temp.push(...right.slice(j));
    }
    return temp;
}

function quickSort(arr, left, right) {
    var index;
    if (arr.length > 1) {
        index = partition(arr, left, right);
        if (left < index - 1) {
            quickSort(arr, left, index-1);
        }
        if (right > index) {
            quickSort(arr, index, right);
        }
    }
}

function partition(arr, left, right) {
    var pivot = arr[Math.floor((left+right)/2)],
        i = left,
        j = right;
    while(i <= j) {
        while(arr[i] < pivot) {
            i++;
        }
        while(arr[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(arr, i, j);
            i++;
            j--;
        }
    }
    return i;
}

function binarySearch(arr, value) {
    var left = 0,
        right = arr.length - 1;
    var mid;
    while(left <= right) {
        mid = Math.floor((left+right)/2);
        if (value < arr[mid]) {
            right = mid - 1;
        } else if(value > arr[mid]){
            left = mid + 1;
        } else {
            return mid;
        }
    }
    return -1;
}

function quickSort(arr) {
    if (arr.length < 2) return arr;
    var baseIndex = Math.floor(arr.length / 2);
    var leftArr = [];
    var rightArr = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        if (i !== baseIndex) {
            if (arr[i] < arr[baseIndex]) {
                leftArr.push(arr[i]);
            } else {
                rightArr.push(arr[i]);
            }
        }
    }
    return quickSort(leftArr).concat([arr[baseIndex]]).concat(quickSort(rightArr));
}