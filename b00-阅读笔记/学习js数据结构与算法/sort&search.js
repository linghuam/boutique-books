
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