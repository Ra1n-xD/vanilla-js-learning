function myApply(context, arg) {
  context = context || globalThis;
  const fn = Symbol("aboba");
  context[fn] = this;

  const resultFunc = context[fn](...arg);
  delete context[fn];

  return resultFunc;
}

function myCall(context, ...arg) {
  context = context || globalThis;
  const fn = Symbol("aboba");
  context[fn] = this;

  return context[fn](...arg);
}

function myBind(context, ...arg) {
  context = context || globalThis;
  const fn = Symbol("aboba");
  context[fn] = this;

  return function () {
    return context[fn](...arg, ...arguments);
  };
}

Function.prototype.myCall3 = myCall;
Function.prototype.myApply3 = myApply;
Function.prototype.myBind3 = myBind;

// Тесты ----------------------------------
function Test() {
  console.log(this, ...arguments);
}

Test.myCall({ aboba: 3 }, 1, 2, 3); //console.log  === {aboba: 3}, 1, 2, 3
Test.myApply({ aboba: 3 }, [1, 2, 3]); //console.log  === {aboba: 3}, 1, 2, 3
Test.myBind({ aboba: 3 }, 1, 2, 3)(); //console.log  === {aboba: 3}, 1, 2, 3
