/*
**
** CATEGORY POINTS CALCULATION
**
*/
function calculatePercents(){
  tmp={};
  tmp.presence=[];
  for(i in dataBase.presence){
    tmp.presence[i]=calculateAnything("riffle", dataBase.presence[i].classes, {
      multiplier:dataBase.presence[i].multiplier,
      checkpoint:dataBase.presence[i].riffles
    });
  }
  tmp.extras=[];
  for(i in dataBase.extraPoints){
    tmp.extras[i]=calculateAnything("counter", dataBase.extraPoints[i].classes, {
      multiplier:dataBase.extraPoints[i].multiplier
    });
  }
  tmp.competitions={
    sport:[],
    inter:[],
    outer:[]
  };
  for(i in dataBase.competitions.sport){
    tmp.competitions.sport[i]=calculateAnything("counter", dataBase.competitions.sport[i].classes, {
      multiplier:dataBase.competitions.sport[i].multiplier
    });
  }
  for(i in dataBase.competitions.inter){
    tmp.competitions.inter[i]=calculateAnything("counter", dataBase.competitions.inter[i].classes, {
      multiplier:dataBase.competitions.inter[i].multiplier
    });
  }
  for(i in dataBase.competitions.outer){
    tmp.competitions.outer[i]=calculateAnything("counter", dataBase.competitions.outer[i].classes, {
      multiplier:dataBase.competitions.outer[i].multiplier
    });
  }
  tmp.reading=calculateAnything("ranking", dataBase.reading,{
    multiplier:1
  });
  tmp.competitions.olimpics=calculateAnything("counter", dataBase.competitions.olimpics.classes,{
    multiplier:dataBase.competitions.olimpics.multiplier
  });
  tmp.marks={
    average:[],
    primes:[]
  };
  tmp.marks.average=calculateAnything("ranking", dataBase.marks.average.classes,{
    multiplier:dataBase.marks.average.multiplier
  });
  tmp.marks.primes=calculateAnything("counter", dataBase.marks.primes.classes,{
    multiplier:dataBase.marks.primes.multiplier
  });
  tmp.score=[];
  tmp.semester=[];
  ////console.log(tmp.semester);
  for(var r=0;r< dataBase.classes.length;r++){
    tmp.score[r]=[];
    tmp.semester[r]=[];
    ////console.log(r);
    for(var t=0;t< dataBase.classes[r].length;t++){
      ////console.log(dataBase.classes);

      //console.log(r+" "+t);
      //console.log(tmp);
      if(dataBase.semesterPresence.classes[r][t]==0){
        var tmp_num=0;
        for(k in dataBase.presence){
          tmp_num+=dataBase.presence[k].classes[r][t];
          ////console.log(k);
        }
        tmp.semester[r][t]=miniRiffleCounter(Math.round(tmp_num/dataBase.presence.length),[80, 85, 90, 95])*5;
      }else{
        tmp.semester[r][t]=miniRiffleCounter(dataBase.semesterPresence.classes[r][t],[80, 85, 90, 95])*5;
      }
      tmp.score[r][t]=scoreForClass(r, t, tmp);
    }
  }
  tmp.place=calculateAnything('ranking', tmp.score, {multiplier:1, backwords:true});
  return tmp;
}
/*
**
** ALL POINTS CALCULATION
**
*/
function scoreForClass(xcoord, ycoord, scoreObj){
  var tmp=0;
  //////console.log(scoreObj);
  for(i in scoreObj.presence){
    tmp+=scoreObj.presence[i][xcoord][ycoord];
    //////console.log(scoreObj.presence[i][xcoord][ycoord]);
  }
  //////console.log(scoreObj.presence);
  tmp+=scoreObj.semester[xcoord][ycoord];
  tmp+=scoreObj.reading[xcoord][ycoord];
  //////console.log(tmp);
  for(k in scoreObj.competitions.sport){
    tmp+=scoreObj.competitions.sport[k][xcoord][ycoord];
  }
  //////console.log(tmp);
  for(k in scoreObj.competitions.inter){
    tmp+=scoreObj.competitions.inter[k][xcoord][ycoord];
  }
  //////console.log(tmp);
  for(k in scoreObj.competitions.outer){
    tmp+=scoreObj.competitions.outer[k][xcoord][ycoord];
  }
  tmp+=scoreObj.competitions.olimpics[xcoord][ycoord];
  //////console.log(tmp);
  for(k in scoreObj.extraPoints){
    tmp+=scoreObj.extraPoints[k][xcoord][ycoord];
  }
  //////console.log(tmp);
  tmp+=scoreObj.marks.average[xcoord][ycoord];
  tmp+=scoreObj.marks.primes[xcoord][ycoord];
  return tmp;
}
