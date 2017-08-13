/**
 * Created by ANSCC on 2017/8/13.
 */

let resume=document.getElementById('resume');
let restart=document.getElementById('restart');
let alert_text=document.getElementById('alert_text');
let alert_info=document.getElementById('alert_info');
let pause=document.getElementById('btn_pause');
let btn_restart=document.getElementById('btn_start');




function restart_game() {
    cancelAnimationFrame(state.stop_drawing);
    clearInterval(state.stop_cycling);
    main.className='';
    alert_info.className="hide_alert";
    pause.removeAttribute('disabled');
    btn_restart.removeAttribute('disabled');
    score.lvl=0;
    score.point=0;
    score.rows=0;
    init_status();
}

resume.addEventListener('click',function resume_game() {
    alert_info.className='hide_alert';
    pause.removeAttribute('disabled');
    btn_restart.removeAttribute('disabled');
    main.className='';
    if(stage.height<row){
        state.isdrawing=false;
        drawing();
    }
},false);

function show_alert() {
    if(stage.height<row)
        alert_text.innerText='P A U S E';
    else
        alert_text.innerText='GAME OVER';
    main.className='blur';
    alert_info.className='show_alert';
    pause.disabled='disabled';
    btn_restart.disabled='disabled';
    cancelAnimationFrame(state.stop_drawing);
    clearInterval(state.stop_cycling);
}

pause.addEventListener('click',show_alert,false);

restart.addEventListener('click',restart_game,false);
