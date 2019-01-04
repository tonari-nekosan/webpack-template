import _ from 'lodash';
import printMe, { test } from './print.js';
// import './style.css'
import './test.scss'

function component() {
    var element = document.createElement('div');
    var btn = document.createElement('button');
    btn.setAttribute("id", "btn-test");
    // element.innerHTML = 'test';
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');

    btn.innerHTML = 'Click me and check the console!';
    // btn.onclick = printMe;
    element.appendChild(btn);
    return element;
}

document.body.appendChild(component());

$('#btn-test').click((e) => {
    printMe();
    test();
});
// console.log('test');