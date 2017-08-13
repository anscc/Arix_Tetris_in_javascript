function delete_row(stg) {
    let row_len=0;
    stg.height=0;
    score.rowperdel=0;
    for(let r=0;r<row;r++){
        row_len=0;
        for(let c=0;c<col;c++){
            if(stg.pos[r][c]===1)
                row_len++;
        }
        if(row_len===col){
            let temp=[];
            for(let i=0;i<col;i++)
                temp.push(0);
            score.rows++;
            score.rowperdel++;
            stg.pos.splice(r,1);
            stg.pos.unshift(temp);
            // stg.pos.unshift(new Array(col).fill(0));                 IE not support Array.fill()
            stg.height--;
        }
        else if(row_len!==0)
            stg.height++;
    }
}
