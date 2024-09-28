function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function change_buttonMinusElementsContent() {
    for (let i = 0; i < buttonMinusElements.length; i++) {
        let element = buttonMinusElements[i];
        element.textContent = -1 * minusAvec[i];
    }
}


let minusAvec = [1, 5, 10, 20];
let buttonMinusElements = document.querySelectorAll('.buttonMinus');
let running = false;

window.addEventListener('load', function () {
    change_buttonMinusElementsContent();
    let t = localStorage.getItem('t87tv1-timeLimit');
    let b = localStorage.getItem('t87tv1-batchSize');
    let q = document.querySelectorAll('#inputTime option');
    let i = document.getElementById('inputBatch');
    // document.getElementById('inputB').value = 2;
    inputB.noUiSlider.set(3);
    if (t === null || t === undefined) {
        for (let i = 0; i < q.length; i++) {
            if (Number(q[i].getAttribute('value')) == 1000) {
                q[i].setAttribute('selected', '');
                break;
            }
        }
    } else {
        for (let i = 0; i < q.length; i++) {
            if (Number(q[i].getAttribute('value')) == t) {
                q[i].setAttribute('selected', '');
                break;
            }
        }
    }
    if (b === null || b === undefined) {
        i.value = 10000;
    } else {
        i.value = b;
    }
    let url = new URL(window.location.href);
    let is_simple_view = url.searchParams.get('simpleview');
    if (is_simple_view != null && is_simple_view == 'true') {
        document.getElementById('accuracy-container').style.display = 'none';
    }
});

for (let i = 0; i < buttonMinusElements.length; i++) {
    const element = buttonMinusElements[i];
    element.addEventListener('click', function () {
        let now_value = parseFloat(document.getElementById('inputA').value);
        if (Number.isNaN(now_value) || now_value <= 0 || 100 < now_value) {
            now_value = 9999;
            // document.getElementById('inputB').value = 0;
        }
        let new_value = now_value - minusAvec[i]
        if (new_value > 100) inputB.noUiSlider.set(3);
        document.getElementById('inputA').value = Math.max(0, Math.min(new_value, 100));
    });
}

function performCalculationBatch(A, B, x, timeLimit, batchSize) {
    let v_a = [20, 10, 10, 5, 5, -9999];
    let v_b = [1, 1, 1, 1, 1, 1, 0, 0, 0, -1];
    v_a[5] = x;

    let a_cnt = 0, b_cnt = 0;
    let s, e;
    s = new Date();

    function performIteration() {

        for (let cnt = 0; cnt < batchSize; cnt++) {
            let a = A, b = B, turn = 0;
            while (a !== 100 && b !== 5) {
                if (turn === 0) a += v_a[getRandomInt(6)];
                else b += v_b[getRandomInt(10)];
                if (b < 0) b = 0;
                turn = 1 - turn;
            }

            if (a >= 100) a_cnt++;
            else b_cnt++;

            e = new Date();
            let t_in_loop = e - s;
            if (t_in_loop >= timeLimit) {
                break;
            }
        }
        e = new Date();
        let t = e - s;
        if (t < timeLimit) {
            setTimeout(performIteration, 0); // Schedule the next iteration with no delay
        } else {
            // Calculation finished for this batch
            let p_a = (100.0 * a_cnt / (a_cnt + b_cnt)).toFixed(3);
            let p_b = (100 - p_a).toFixed(3);
            let output = "<span class='stgTxt'>JP確率 " + p_a + " %</span><br>";
            output += "<span class='supTxt'>計算回数：" + (a_cnt + b_cnt) + "</span>";
            document.getElementById('output').innerHTML = output;
            running = false;
            document.getElementById('runButton').disabled = false; // Enable the button
        }
    }

    // Start the first iteration
    setTimeout(performIteration, 0);
}

document.getElementById('runButton').addEventListener('click', function () {
    if (running == true) {
        return;
    }
    running = true;
    document.getElementById('runButton').disabled = true; // Disable the button
    document.getElementById('output').innerHTML = "Running..."; // Display "Running..."

    let A = (parseFloat(document.getElementById('inputA').value) - 100) * -1.0;
    if (Number.isNaN(A) || A < 0 || 100 < A) A = 100;
    // let B = parseFloat(document.getElementById('inputB').value);
    let B = 5 - inputB.noUiSlider.get();
    let x = document.getElementById('inputX').checked ? 11 : 1;
    let timeLimit = parseFloat(document.getElementById('inputTime').value);
    let batchSize = (document.getElementById('inputBatch').value);
    if (Number.isNaN(batchSize) || batchSize <= 0 || 1000000000 < batchSize) batchSize = 1000000000;

    localStorage.setItem('t87tv1-timeLimit', timeLimit);
    localStorage.setItem('t87tv1-batchSize', batchSize);

    performCalculationBatch(A, B, x, timeLimit, batchSize);
});

/*
旧ver用
document.getElementById('inputB').addEventListener('input', function () {

// document.getElementById('sliderValue').textContent = this.value;
if (this.value == 5) {
  this.value = 4
  //document.getElementById('sliderValue').textContent = this.value;
}
});
*/

document.getElementById('inputX').addEventListener('change', function () {
    if (this.checked) {
        document.getElementById('inputXToggleButton').textContent = "あり 11m";
        minusAvec = [5, 10, 11, 20];
    } else {
        document.getElementById('inputXToggleButton').textContent = "なし 1m";
        minusAvec = [1, 5, 10, 20];
    }
    change_buttonMinusElementsContent();
});