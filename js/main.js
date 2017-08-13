
let row=20,col=14,height=30,width=30;
let canvas_main=document.getElementById("canvas_main");
let canvas_small=document.getElementById('canvas_small');
let ctx_main=canvas_main.getContext('2d');
let ctx_small=canvas_small.getContext('2d');
let main=document.getElementById('main');


function Cube () {
    return {                      //new cube's info;
        type:-1,
        pos:[[],[],[],[]],
        left:0,
        right:0,
        state:0,
    }
}
function Stage(row,col){                     //new stage info;
    return {
        pos: (function () {          //1 for taken,0 for not taken;
            let posarr = [];
            for(let i=0;i<row+2;i++){
                let temp=new Array(col);
                for(let j=0;j<col;j++)
                    temp[j]=0;
                // let temp=new Array(col).fill(0);             IE not support Array.fill();
                posarr.push(temp);
            }
            return posarr;
        })(),
        height: 0,
    }
}

function State() {
    return{                 //current gaming state;
        isdrawing:false,
        stop_cycling: 0,
        stop_drawing: 0,
    }
}

function init_cube(cube) {          //initialize type of the new created cube;
    let order=Math.floor(Math.random()*7);
    cube.type=order;
    cube.bottom=1;
    switch(order){
        case 0:                                         //  0000
            cube.pos=[[0,0],[0,1],[0,2],[0,3]];
            cube.left=0;
            cube.right=3;
            break;
        case 1:                                         //   00
                                                        //   00
            cube.pos=[[0,0],[0,1],[1,0],[1,1]];
            cube.left=0;
            cube.right=1;
            break;
        case 2:                                         //    00
                                                        //   00
            cube.pos=[[0,1],[0,2],[1,0],[1,1]];
            cube.left=0;
            cube.right=2;
            break;
        case 3:                                         //   00
                                                        //    00
            cube.pos=[[0,0],[0,1],[1,1],[1,2]];
            cube.left=0;
            cube.right=2;
            break;
        case 4:                                         //    0
                                                        //  000
            cube.pos=[[1,0],[1,1],[1,2],[0,2]];
            cube.left=0;
            cube.right=2;
            break;
        case 5:                                         //  0
                                                        //  000
            cube.pos=[[0,0],[1,0],[1,1],[1,2]];
            cube.left=0;
            cube.right=2;
            break;
        case 6:                                         //   0
                                                        //  000
            cube.pos=[[0,1],[1,0],[1,1],[1,2]];
            cube.left=0;
            cube.right=2;
            break;
    }

}

function moving(ocu,oStage,towards) {            //new position
    if(!judge(ocu,stage,'down')){             //
        setStage(ocu,stage);

        delete_row(stage);
        setScore();

        if(stage.height<row&&!state.isdrawing){
            oCube=temp;
            temp=new Cube();
            init_cube(temp);
            drawing();
        }
        else if(stage.height>=row){                 //game over
            show_alert();
        }
    }
    if(movable(ocu,oStage,towards))
        ocu.pos.forEach(function (curval) {
            curval[0]++;
        })

}

function cycling(){
    state.stop_cycling=setInterval(function () {
        let ocu=oCube,ost=stage;
        return moving(ocu,ost,'down');
    },500)
}

function judge(cube,oStage,towards) {
    for(let i=0;i<cube.pos.length;i++){
        if(cube.pos[i][0]===row-1||!movable(cube,oStage,towards)){
            clearInterval(state.stop_cycling);
            cancelAnimationFrame(state.stop_drawing);
            state.isdrawing=false;
            console.log('judge false');
            return false;
        }
    }
    return true;
}

function setStage(ocu,stg) {
    for(let i=0;i<ocu.pos.length;i++){
        stg.pos[ocu.pos[i][0]][ocu.pos[i][1]]=1;
    }
}

function movable(ocu, stg,towards) {
    for(let i=0;i<ocu.pos.length;i++){
        switch(towards){
            case 'left':
                if(stg.pos[ocu.pos[i][0]][ocu.pos[i][1]-1]===1)
                    return false;
                break;
            case 'right':
                if(stg.pos[ocu.pos[i][0]][ocu.pos[i][1]+1]===1)
                    return false;
                break;
            case 'down':
                if(stg.pos[ocu.pos[i][0]+1][ocu.pos[i][1]]===1) {
                    console.log(ocu.pos[i][0]+' '+ocu.pos[i][1]);
                    return false;
                }
                break;
        }
    }
    return true;
}

function drawCube(ctx_main,oCube, stage,row,col) {
    for(let r=0;r<row;r++)
        for(let c=0;c<col;c++){
            if(stage.pos[r][c]===0) {
                ctx_main.fillStyle='#a8a8a8';
                ctx_main.fillRect(c*width,r*height,width,height);
                // ctx_main.fillStyle = '#a3a3a3';
                // ctx_main.fillRect(c * width+1, r * width+1, width-2, height-2);
            }
            else if(stage.pos[r][c]===1){
                ctx_main.fillStyle = '#a8a8a8';
                ctx_main.fillRect(c * width, r * width, width, height);
                ctx_main.fillStyle = '#b40000';
                ctx_main.fillRect(c * width, r * width, width-2, height-2);
            }
        }
    for(let i=0;i<oCube.pos.length;i++){
        ctx_main.fillStyle = '#a8a8a8';
        ctx_main.fillRect(oCube.pos[i][1]*width,oCube.pos[i][0]*width,width,height);
        ctx_main.fillStyle = '#b40000';
        ctx_main.fillRect(oCube.pos[i][1]*width+1,oCube.pos[i][0]*width,width-2,height-2);
    }
}

function drawing() {                                //driving function
    drawCube(ctx_small,temp,stage_small,4,4);
    drawCube(ctx_main,oCube,stage,row,col);
    if(!state.isdrawing&&stage.height<row) {
        state.isdrawing=true;
        cycling();
    }
    state.stop_drawing=requestAnimationFrame(drawing);
    // setData();
}

function init_status() {
    oCube=new Cube();
    temp=new Cube();
    state=new State();
    stage=new Stage(row,col);
    stage_small=new Stage(4,4);
    init_cube(oCube);
    init_cube(temp);
    init_score();
    setScore();
    drawing();
}
let oCube,temp,state,stage,stage_small;
init_status();

