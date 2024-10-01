// The .map() method allows you to run a function on each item in the array, returning a new array as the result.
// In React, map() can be used to generate lists.

const words = ['spray', 'elite', 'exuberant', 'destruction', 'present'];

// 모든 배열요소에 대해 => {함수}를 실행한다.
// 실행 결과로 새로운 배열을 만들어서 리턴한다.
const myList = words.map((item) => item.length)
console.log(myList) // length
console.log(words)  // 모든 단어

// map과 유사하지만 조건이 참인 요소만 필터링하여 새로운 배열로 리턴
const result = words.filter((word) => word.length > 6);
console.log(result);
console.log(words)

function isBigEnough(value) {
    return value >= 10;
}

// function으로 정의된 함수를 사용할 때는 this 유의
const filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
// 필터링된 값은 [12, 130, 44]
console.log("filtered : ", filtered)


