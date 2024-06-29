const Sort = document.getElementById('Sort');
let array = [];

function createArray(size = 10) {
    array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }
    displayArray();
}

function displayArray() {
    Sort.innerHTML = '';
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${value * 5}px`;
        bar.style.width = '30px';
        bar.textContent = value;
        Sort.appendChild(bar);
    });
}

async function mergeSort(arr) {
    if (arr.length < 2) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = await mergeSort(arr.slice(0, mid));
    const right = await mergeSort(arr.slice(mid));
    
    return await merge(left, right);
}



async function merge(left, right) {
    let sortarr= [];

    
    
    while ( left.length && right.length) {
        if (left[0] < right[0]) {
            sortarr.push(left.shift());
            
        } else {
            sortarr.push(right.shift());
        
        }
    }
    let result=[...sortarr,...left,...right];
  
    await updateArray(result);
    return result;
}


async function quicksort(arr) {

    if(arr.length <= 1)
       {
           return arr;
       }
       const pivot=arr[0];
       const left=[];
       const right=[];
       


       for(let i=1; i<arr.length ;i++)
           {
               if(arr[i]<pivot)
                   {
                       left.push(arr[i]);
                   }
                   else{
                       right.push(arr[i]);
                   }
           }
           const sortedLeft = await quicksort(left);
           const sortedRight = await quicksort(right);
       
           const result = [...sortedLeft, pivot, ...sortedRight];
       
           await updateArray(result); 
           return result;
}

async function selectionSort(arr) {
    const length = arr.length;

    for (let i = 0; i < length; i++) {
        let minIndex = i;

        for (let j = i + 1; j < length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }

        await updateArray([...arr]);
    }

    return arr;
}

async function updateArray(sortedArr) {
    array = sortedArr;
    displayArray();
    await new Promise(resolve => setTimeout(resolve, 1000));
}

function startQuickSort() {

    quicksort(array).then(sortedArray => {
       array = sortedArray;
       displayArray();
   });
}

function startMergeSort() {
    mergeSort(array).then(sortedArray => {
        array = sortedArray;
        displayArray();
    });
}

function startSelectionSort() {
    selectionSort(array).then(sortedArray => {
        array = sortedArray;
        displayArray();
    });
}

createArray();
