/*
**
** HELPER CALCULATOR FUNCTION
**
*/
function miniRiffleCounter(num, riffles){
  for(var i=0;i<riffles.length;i++){
    if(riffles[i]>num){
      return i;
      break;
    }else if(i==riffles.length-1){
      return i+1;
    }
  }
}
/*
**
**  MAIN CALCULATOR FUNCTION
**
*/
function calculateAnything(type, content, additional){
  var arr=[];
  switch(type){
    case "counter":
      for(step in content){
        arr[step]=[];
        for(letter in content[step]){
          arr[step][letter]=(content[step][letter]*additional.multiplier);
        }
      }
    break;
    case "riffle":
      for(step in content){
        arr[step]=[];
        for(letter in content[step]){
            for(var i=0;i<additional.checkpoint.length;i++){
              if(additional.checkpoint[i]>content[step][letter]){
                arr[step][letter]=(additional.multiplier*i);
                break;
              }else if(i==additional.checkpoint.length-1){
                arr[step][letter]=(additional.multiplier*(i+1));
              }
            }

        }
      }
    break;
    case "ranking":
    var tmparr=[];
      for(var i=0;i<content.length;i++){
        for(var j=0;j<content[i].length;j++){
          ////console.log(content[i][j]);
          tmparr.push({
            xcoord:i,
            ycoord:j,
            num:content[i][j]
          });
        }
      }
      //console.log(tmparr);
      for(var i=1;i<tmparr.length;i++){
        //console.log(i-1);
        if(tmparr[i-1].num<tmparr[i].num){
          var tmp=tmparr[i];
          tmparr[i]=tmparr[i-1];
          tmparr[i-1]=tmp;
          i=0;
          continue;
        }
      }
      var dumbI=0;
      for(var i=0;i<tmparr.length;i++){
        ////console.log(tmparr);
        if(i==0||tmparr[i].num!=tmparr[i-1].num){
          dumbI=i;
        }
        if(typeof(arr[tmparr[i].xcoord])=="undefined"){
          arr[tmparr[i].xcoord]=[];
        }
        if(typeof(additional.backwords)=="undefined"){
          if(tmparr[i].num!=0){
            arr[tmparr[i].xcoord][tmparr[i].ycoord]=(tmparr.length-dumbI)*additional.multiplier;
          }else{
            arr[tmparr[i].xcoord][tmparr[i].ycoord]=0;
          }
        }else{
          arr[tmparr[i].xcoord][tmparr[i].ycoord]=(dumbI+1)*additional.multiplier;
        }
      }
    break;
  }
  return arr;
}
