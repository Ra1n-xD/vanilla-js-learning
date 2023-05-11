function awaitOnYields(generator) {
    const iterator = generator();

    const handler = function (result) {
        if (result.done) {
            return Promise.resolve(result.value);
        }

        // console.log(result.value);
        return Promise.resolve(result.value).then((res) => handler(iterator.next(res)));
    };

    return handler(iterator.next());
}
module.exports = awaitOnYields;

// function* exampleGenerator() {
//     const result = yield 'Черкани чонидь';
//     console.log(`Ты написал: ${result}`);
// }

// async function getValueFromUser() {
//     const result = await awaitOnYields(exampleGenerator);
// }

// getValueFromUser();

//--------------------------------------------
// PASS  ./awaitOnYields.test.js
// await on yields function
//   √ it works correctly (2533 ms)

// Test Suites: 1 passed, 1 total
// Tests:       1 passed, 1 total
// Snapshots:   0 total
// Time:        3.242 s, estimated 4 s
//--------------------------------------------
