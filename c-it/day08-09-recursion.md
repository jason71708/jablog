<!-- Day 8 BO5-5 - Recursion -->

Recursion 的定義是一個會**呼叫自己**的函式。

Recursion 技巧在很多地方都有用到，例如：
- `JSON.stringify` & `JSON.parse`
- DOM traversal (`document.getElementsById`)
- Object traversal (`Object.keys`)

在解釋 Recursion 之前先補充一下，函式的執行流程。

## Call Stack

在大多數的程式語言中，函式的執行是由 Call Stack 控制的。

[Stack](https://ithelp.ithome.com.tw/articles/10300208) 是一種資料結構，在之後的文章中會詳細說明。

函式要執行時，會放到 Call Stack 中，當函式執行到 `return` 或是結束後，會從 Call Stack 中移除 (pop)。

```js
function wakeUp() {
  console.log('Wake up!');
  return 'Good morning!';
}
function goToWork() {
  console.log('Go to work!');
  eatFoods();
  return 'Good afternoon!';
}
function eatFoods() {
  console.log('Eat foods!');
}
function goBackHome() {
  console.log('Go back home!');
  return 'Good evening!';
}
function workDay() {
  console.log('Work day!');
  wakeUp();
  goToWork();
  goBackHome();
}
workDay();
```

以上函式執行時在 Call Stack 中的順序是：
1. [`workDay`] - 執行 `workDay`
2. [`wakeUp`, `workDay`] - 執行 `wakeUp`
3. [`goToWork`, `workDay`] - `wakeUp` 執行結束，移除掉，執行 `goToWork`
4. [`eatFoods`, `goToWork`, `workDay`] - 執行 `eatFoods`
5. [`goBackHome`, `workDay`] - `eatFoods` 執行結束，移除掉，`goToWork` 執行結束，移除掉，執行 `goBackHome`
6. [] - `goBackHome` 執行結束，移除掉，`workDay` 執行結束，移除掉

而根據上述 Recursion 的定義，我們寫個粗糙的 Recursion 函式：
  
```js
function recursion(n) {
  console.log('recursion', n);
  recursion(n + 1);
}
recursion(0);
```

呼叫 `recursion` 後，`recursion` 會不斷呼叫自己，所以在 Call Stack 中會不斷新增執行的函式：

[`recursion`, `recursion`, `recursion`, `recursion`, ....]

此時會遇到 Maximum call stack size exceeded 錯誤，因為 Call Stack 中的函式太多，超過了程式執行的限制。也就是俗稱的 **Stack Overflow**。

## Important Points

- Base Case (終止條件，避免像上述例子一樣無窮進行下去)
- Different Input (每次呼叫的輸入要不一樣，否則會一直回傳同樣輸出造成永遠達不到終止條件)

```js
function sumRange(n) {
  if (n === 1) return 1;
  return n + sumRange(n - 1);
}
sumRange(10);
// 55
```

上面 `sumRange` 例子中：
- 終止條件為 `n === 1`
- 每次呼叫 `sumRange` 時，`n`都會遞減。

## Practice 1 - Factorial

```js
function factorial(n) {
  let total = 1;
  for (let i = 1; i <= n; i++) {
    total *= i;
  }
  return total
}
```

上述是階乘函式，在數學中長這樣：4! = 4 \* 3 \* 2 \* 1 = 24。

給定一個數字，計算出這個數字的階乘。

接著我們把這個函式改成 Recursion：

```js
function factorial(n) {
if (n === 1) return 1;
return n * factorial(n - 1);
}
```

## Helper Method Recursion

這是實作 Recursion 時的一種技巧，我們可以在主函式中定義好要使用的**變數**與寫一個 **Helper 函式**，並將變數帶入此 Helper 函式，實際上重複呼叫的是這個 Helper Recursion。

**因為每次重複執行時，函式作用域內的變數都會重置**，所以這技巧可以在外層 (主函式) 先定義好變數，再在內層 (Helper Recursion) 呼叫這個變數。

```js
function collectOddValues(arr) {
  let result = [];
  function helper(helperInput) {
    if (helperInput.length === 0) return;
    if (helperInput[0] % 2 !== 0) {
      result.push(helperInput[0]);
    }
    helper(helperInput.slice(1));
  }
  helper(arr);
  return result;
}
collectOddValues([1, 2, 3, 4, 5, 6, 7, 8, 9]);
// [1, 3, 5, 7, 9]
```

先在主函式中定義好 `result`，接著執行 `helper` 不斷遞迴陣列將奇數值放入 `result` 中。

## Pure Recursion

和 Helper Method Recursion 一樣為了解決變數的重置問題。

```js
function collectOddValues(arr) {
  let newArr = [];
  if (arr.length === 0) return newArr;
  if (arr[0] % 2 !== 0) {
    newArr.push(arr[0]);
  }
  return newArr.concat(collectOddValues(arr.slice(1)));
}
```

沒有內層函式，取而代之的是用 `concat` 將每次 `collectOddValues` 的結果合併起來回傳。

> 注意實作 Pure Recursion 時使用的陣列或字串方法也要是 Pure Function (無副作用，也就是不會改變 input)，像 `concat` 會回傳新的陣列，並不會改變原本的陣列，`splice` 則會改變原本的陣列。

## Practice 2 - isPalindrome

給定一個字串，判斷這個字串是否為 Palindrome (順寫與逆寫都一樣)。

例如：
- `isPalindrome('awesome') // false`
- `isPalindrome('foobar') // false`
- `isPalindrome('tacocat') // true`


```js
function isPalindrome(str) {
if (str.length <= 1) return true;
return str[0] === str[str.length -1] ? isPalindrome(str.slice(1, str.length - 1)) : false;
}
// 'tacocat'
// 抓第一個與最後一個比對，如果一樣就把這兩個字元去除接著繼續比對，否則回傳 false
// 'acoca'
// 'coc'
// 'o'
```

## Practice 3 - Fibonacci

> 費氏數列是一個數列，第一與第二個數字是 1，以後的數字則是前兩個數字的和。
> 例如：1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, …

給定一個數字 `n`，計算出費氏數列第 `n` 個位置是什麼數字。

例如：
- `fibonacci(4) // 3`
- `fibonacci(10) // 55`
- `fibonacci(28) // 317811`
- `fibonacci(35) // 9227465`


```js
function fibonacci(n) {
if (n <= 2) return 1;
return fibonacci(n - 1) + fibonacci(n - 2);
}
```

個人原本的解法：
```js
function fib(num){
if (num === 0) return 0;
if (num <= 2) return 1;

function helper(index, previous1, previous2) {
  if (index <= 1) return previous1 + previous2;
  return helper(index - 1, previous2, previous1 + previous2);
}

return helper(num - 2, 1, 1);
}
```
