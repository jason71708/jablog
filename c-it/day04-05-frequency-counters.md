<!-- Day 04 BO1 - Frequency Counter -->

Frequency Counter 是一種解題技巧，它使用物件的鍵值 (Key) 來記錄陣列或字串裡面特定值的出現次數。它可以避免一直遍歷資料，可以有效減少時間複雜度。

## Practice 1 - Same

給定兩個只有數字的陣列，判斷第一個陣列中的數字的平方是否也出現在第二個陣列中，且出現次數要相同。

1. 數字會大於 0 且小於 999999。
2. 數字會是整數。
3. 陣列的長度會大於 0。

例如：`[1, 3, 5, 5. 2]` 和 `[1, 4, 9, 25, 25]`，答案是 `true`。

較差的解法：

```js
function same(arr1, arr2){
    if(arr1.length !== arr2.length){
        return false;
    }
    for(let i = 0; i < arr1.length; i++){
        let correctIndex = arr2.indexOf(arr1[i] ** 2)
        if(correctIndex === -1) {
            return false;
        }
        arr2.splice(correctIndex,1)
    }
    return true;
}
```

`indexOf` 會遞迴陣列找出特定值的索引，加上外層也有個迴圈，所以時間複雜度是 O(n^2)。

使用 Frequency Counter 技巧：

```js
function same(arr1, arr2){
    if(arr1.length !== arr2.length){
        return false;
    }
    let frequencyCounter1 = {}
    let frequencyCounter2 = {}
    for(let val of arr1){
        frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1
    }
    for(let val of arr2){
        frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1        
    }
    for(let key in frequencyCounter1){
        if(!(key ** 2 in frequencyCounter2)){
            return false
        }
        if(frequencyCounter2[key ** 2] !== frequencyCounter1[key]){
            return false
        }
    }
    return true
}
```

使用兩個物件用來記錄每個數字出現的次數，然後比較 `frequencyCounter1` 的 Key 平方是否在 `frequencyCounter2` 中，且出現次數是否相同。

這邊使用了三個迴圈但非巢狀所以是 **O(n)**，比第一個解法 **O(n^2)** 較好。

## Practice 2 - Anagram

給定兩個字串，判斷兩個字串的字母出現次數是否相同。

1. 字串長度大於 0 且小於 999999。
2. 字串只包含英文字母。
3. 英文字母只會有小寫。

例如：`'cinema'` 和 `'iceman'`，答案是 `true`。

<details>
  <summary>Solution</summary>

  ```js
  function validAnagram(first, second) {
    if (first.length !== second.length) {
      return false;
    }

    const lookup = {};

    for (let i = 0; i < first.length; i++) {
      let letter = first[i];
      lookup[letter] ? lookup[letter] += 1 : lookup[letter] = 1;
    }

    for (let i = 0; i < second.length; i++) {
      let letter = second[i];
      if (!lookup[letter]) {
        return false;
      } else {
        lookup[letter] -= 1;
      }
    }

    return true;
  }
  ```
</details>
