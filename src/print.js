function printMe(params) {
    console.log('I get called from print.js!');
}

function test(params) {
    console.log("test2");
}

export default printMe
export { test }