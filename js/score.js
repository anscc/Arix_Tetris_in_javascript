/**
 * Created by ANSCC on 2017/8/13.
 */

let lvl=document.getElementById('lvl');
let point=document.getElementById('point');
let rows=document.getElementById('rows');
let score= {
    lvl:0,
    point:0,
    rows:0,
    rowperdel:0
};

function init_score() {
    score.lvl=0;
    score.point=0;
    score.row=0;
    score.rowperdel=0;
}
function setScore() {
    if(score.rowperdel!==0)
        score.point+=200*(score.rowperdel*(score.rowperdel-1)/2+1);
    score.lvl=Math.floor(score.point/1000);
    lvl.innerText=score.lvl;
    point.innerText=score.point;
    rows.innerText=score.rows;
}
