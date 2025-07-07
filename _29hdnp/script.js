"use strict";
const good_table = document.getElementById("good_table");

async function a(){
    good_table.innerHTML = '';
    return "resolve";
}

async function main() {
    await a();
    let people_num = document.getElementById('people_num').value;
    let groups = JSON.parse(document.getElementById('groups').value);

    let cnt = document.getElementById('cnt').value; //day
    let max_diff = document.getElementById('max_diff').value;
    let vec = [];
    let same_group = {};
    let all_data = [];
    let maxmin_diff = [];
    let sikou = document.getElementById('sikou').value;


    for (let i = 0; i < people_num; i++) {
        vec[i] = i;
    }


    let is_written = false;
    for (let a = 0; a < sikou; a++) {
        all_data[a] = [];
        for (let i = 0; i < people_num; i++) {
            for (let j = i + 1; j < people_num; j++) {
                same_group[[i, j]] = 0;
            }
        }
        for (let b = 0; b < cnt; b++) {
            all_data[a][b] = [];
            all_data[a][b] = arrayShuffle(vec.slice());
            let now_pep = 0;
            for (let d = 0; d < groups.length; d++) {
                for (let e = 0; e < groups[d]; e++) {
                    let i = now_pep + e;
                    let j = now_pep + e + 1;
                    if (i == people_num) break;
                    let pi = all_data[a][b][i];
                    let pj = all_data[a][b][j];
                    if (pi > pj) {
                        let pi_tmp = pi;
                        pi = pj;
                        pj = pi_tmp;
                    }
                    same_group[[pi, pj]]++;
                }
                now_pep += groups[d];
            }

        }

        let M = -1, m = 999999999999999;
        for (let i = 0; i < people_num; i++) {
            for (let j = i + 1; j < people_num; j++) {
                m = Math.min(m, same_group[[i, j]]);
                M = Math.max(M, same_group[[i, j]]);
            }
        }

        //console.log(M + " " + m);
        if (M - m <= max_diff) {
            all_data[a];
            console.log(same_group);
            all_data[a].forEach((v) => {
                const tr = document.createElement("tr");
                good_table.appendChild(tr); // 表の中に８個の「tr」（行）ができる
                // 1行の中を生成
                const objArray = Object.entries(v);  // オブジェクトを配列に
                objArray.forEach((arr) => { // No, name, age, gradeの4回繰り返す
                    const td = document.createElement("td");
                    td.textContent = arr[1] + 1;  // arr[1]はvalueの部分
                    tr.appendChild(td);
                });
            });
            is_written = true;
            break;
        }
    }
    if (!is_written) alert('見つけられませんでした');
}


function arrayShuffle(array) {
    for (let i = (array.length - 1); 0 < i; i--) {

        // 0〜(i+1)の範囲で値を取得
        let r = Math.floor(Math.random() * (i + 1));

        // 要素の並び替えを実行
        let tmp = array[i];
        array[i] = array[r];
        array[r] = tmp;
    }
    return array;
}


