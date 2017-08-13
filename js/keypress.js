document.addEventListener('keydown',function (e) {
    e.preventDefault();
    if(alert_info.className==='hide_alert') {
        switch (e.keyCode) {
            case 38:            //transform;
                let oCube_temp = clone(oCube);
                let k = 0;
                oCube.state++;
                oCube.state %= 4;
                transform(oCube, oCube.state);
                for (let i = 0; i < oCube.pos.length; i++) {
                    if (oCube.pos[i][0] < 0 || stage.pos[oCube.pos[i][0]][oCube.pos[i][1]] === 1 || oCube.left < 0 || oCube.right > col - 1) {
                        break;
                    }
                    k++;
                }
                if (k !== 4)
                    oCube = oCube_temp;
                break;
            case 37:            //moving leftward;
                if (oCube.left > 0 && movable(oCube, stage, 'left')) {
                    for (let i = 0; i < oCube.pos.length; i++)
                        oCube.pos[i][1]--;
                    oCube.left--;
                    oCube.right--;
                }
                break;
            case 39:            //moving rightward;
            {
                if (oCube.right < col - 1 && movable(oCube, stage, 'right')) {
                    for (let i = 0; i < oCube.pos.length; i++)
                        oCube.pos[i][1]++;
                    oCube.left++;
                    oCube.right++;
                }
                break;
            }
            case 40:         //moving downward;
                if (state.isdrawing)
                    moving(oCube, stage, 'down');
                break;
        }
    }
},false);

function transform(ocu,n) {
    switch(ocu.type) {
        case 0:{
            for(let i=0;i<ocu.pos.length;i++){
                switch (i) {
                    case 0:
                        ocu.pos[0][0]=ocu.pos[0][0]-2*Math.sin((2*n-1)*Math.PI/2);
                        ocu.pos[0][1]=ocu.pos[0][1]+2*Math.sin((2*n-1)*Math.PI/2);
                        break;
                    case 1:
                        ocu.pos[1][0]=ocu.pos[1][0]-Math.sin((2*n-1)*Math.PI/2);
                        ocu.pos[1][1]=ocu.pos[1][1]+Math.sin((2*n-1)*Math.PI/2);
                        break;
                    case 2:
                        break;
                    case 3:
                        ocu.pos[3][0]=ocu.pos[3][0]+Math.sin((2*n-1)*Math.PI/2);
                        ocu.pos[3][1]=ocu.pos[3][1]-Math.sin((2*n-1)*Math.PI/2);
                        break;
                }
            }
            ocu.left=ocu.left+2*Math.sin((2*n-1)*Math.PI/2);
            ocu.right=ocu.right-Math.sin((2*n-1)*Math.PI/2);
            break;
        }
        case 1:
            break;
        case 2:{
            for(let i=0;i<ocu.pos.length;i++){
                switch(i){
                    case 0:
                        break;
                    case 1:
                        break;
                    case 2:
                        ocu.pos[2][1]=ocu.pos[2][1]+2*Math.sin((2*n-1)*Math.PI/2);
                        break;
                    case 3:
                        ocu.pos[3][0]=ocu.pos[3][0]-2*Math.sin((2*n-1)*Math.PI/2);
                        break;
                }
            }
            ocu.left=ocu.left+Math.sin((2*n-1)*Math.PI/2);
            break;
        }
        case 3:{
            for(let i=0;i<ocu.pos.length;i++){
                switch(i){
                    case 0:
                        ocu.pos[0][1]=ocu.pos[0][1]+2*Math.sin((2*n-1)*Math.PI/2);
                        break;
                    case 1:
                        break;
                    case 2:
                        break;
                    case 3:
                        ocu.pos[3][0]=ocu.pos[3][0]-2*Math.sin((2*n-1)*Math.PI/2);
                        break;
                }
            }
            ocu.left=ocu.left+Math.sin((2*n-1)*Math.PI/2);
            break;
        }
        case 4:{
            for(let i=0;i<ocu.pos.length;i++){
                switch(i){
                    case 0:
                        ocu.pos[0][0]=ocu.pos[0][0]-2*Math.round(Math.sin(n*Math.PI/2));
                        ocu.pos[0][1]=ocu.pos[0][1]-2*Math.round(Math.cos(n*Math.PI/2));
                        break;
                    case 1:
                        ocu.pos[1][0]=Math.round(ocu.pos[1][0]-Math.sin(n*Math.PI/2)+Math.cos(n*Math.PI/2));
                        ocu.pos[1][1]=Math.round(ocu.pos[1][1]-Math.sin(n*Math.PI/2)-Math.cos(n*Math.PI/2));
                        break;
                    case 2:
                        ocu.pos[2][0]=ocu.pos[2][0]+2*Math.round(Math.cos(n*Math.PI/2));
                        ocu.pos[2][1]=ocu.pos[2][1]-2*Math.round(Math.sin(n*Math.PI/2));
                        break;
                    case 3:
                        ocu.pos[3][0]=Math.round(ocu.pos[3][0]+Math.sin(n*Math.PI/2)+Math.cos(n*Math.PI/2));
                        ocu.pos[3][1]=Math.round(ocu.pos[3][1]-Math.sin(n*Math.PI/2)+Math.cos(n*Math.PI/2));
                        break;
                }
            }
            switch (n){
                case 1:
                    ocu.right=ocu.right-1;
                    break;
                case 2:
                    ocu.right=ocu.right+1;
                    break;
                case 3:
                    ocu.left=ocu.left+1;
                    break;
                case 0:
                    ocu.left=ocu.left-1;
                    break;
            }
            break;
        }
        case 5:{
            for(let i=0;i<ocu.pos.length;i++){
                switch (i){
                    case 0:
                        ocu.pos[0][0]=Math.round(ocu.pos[0][0]-Math.sin(n*Math.PI/2)-Math.cos(n*Math.PI/2));
                        ocu.pos[0][1]=Math.round(ocu.pos[0][1]+Math.sin(n*Math.PI/2)-Math.cos(n*Math.PI/2));
                        break;
                    case 1:
                        ocu.pos[1][0]=ocu.pos[1][0]-2*Math.round(Math.sin(n*Math.PI/2));
                        ocu.pos[1][1]=ocu.pos[1][1]-2*Math.round(Math.cos(n*Math.PI/2));
                        break;
                    case 2:
                        ocu.pos[2][0]=Math.round(ocu.pos[2][0]-Math.sin(n*Math.PI/2)+Math.cos(n*Math.PI/2));
                        ocu.pos[2][1]=Math.round(ocu.pos[2][1]-Math.sin(n*Math.PI/2)-Math.cos(n*Math.PI/2));
                        break;
                    case 3:
                        ocu.pos[3][0]=ocu.pos[3][0]+2*Math.round(Math.cos(n*Math.PI/2));
                        ocu.pos[3][1]=ocu.pos[3][1]-2*Math.round(Math.sin(n*Math.PI/2));
                        break;
                }
            }
            switch (n){
                case 1:
                    ocu.right=ocu.right-1;
                    break;
                case 2:
                    ocu.right=ocu.right+1;
                    break;
                case 3:
                    ocu.left=ocu.left+1;
                    break;
                case 0:
                    ocu.left=ocu.left-1;
                    break;
            }
            break;
        }
        case 6:{
            for(let i=0;i<ocu.pos.length;i++){
                switch (i){
                    case 0:
                        break;
                    case 1:
                        ocu.pos[1][0]=ocu.pos[1][0]-2*Math.round(Math.sin(n*Math.PI/2));
                        ocu.pos[1][1]=ocu.pos[1][1]-2*Math.round(Math.cos(n*Math.PI/2));
                        break;
                    case 2:
                        ocu.pos[2][0]=Math.round(ocu.pos[2][0]-Math.sin(n*Math.PI/2)+Math.cos(n*Math.PI/2));
                        ocu.pos[2][1]=Math.round(ocu.pos[2][1]-Math.sin(n*Math.PI/2)-Math.cos(n*Math.PI/2));
                        break;
                    case 3:
                        ocu.pos[3][0]=ocu.pos[3][0]+2*Math.round(Math.cos(n*Math.PI/2));
                        ocu.pos[3][1]=ocu.pos[3][1]-2*Math.round(Math.sin(n*Math.PI/2));
                        break;
                }
            }
            switch (n){
                case 1:
                    ocu.right=ocu.right-1;
                    break;
                case 2:
                    ocu.right=ocu.right+1;
                    break;
                case 3:
                    ocu.left=ocu.left+1;
                    break;
                case 0:
                    ocu.left=ocu.left-1;
                    break;
            }
            break;
        }
    }
}

function showPos(ocu) {
    let temp='';
    for(let i=0;i<ocu.pos.length;i++){
        temp+=ocu.pos[i][0]+'__'+ocu.pos[i][1]+'   ';
    }
    // console.log(temp);
}


function clone(obj) {
    if(!(obj instanceof Object))
        return obj;
    if(obj===undefined)
        return obj;
    let temp;
    if(obj.constructor===Array){
        temp=[];
        for(let attr in obj)
            temp.push(clone(obj[attr]));
        return temp;
    }
    temp={};
    for(let attr in obj){
        temp[attr]=clone(obj[attr]);
    }
    return temp;
}

