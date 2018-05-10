function printTable(){
  tmp_alldata=calculatePercents();
  //////console.log(tmp_alldata);
  tmp="";
  tmp+='<tr>';
  tmp+='<th>klasy</th>';
  for(i in dataBase.presence){
    tmp+='<th colspan="2">'+dataBase.presence[i].name+'</th>';
  }
  tmp+='<th colspan="2">semestr '+dataBase.semester+'</th>';
  tmp+='<th>zawody wewnętrzne i sportowe</th>';
  tmp+='<th>zawody zewnętrzne</th>';
  tmp+='<th>akademia, działalność uczniowska i punkty dodoatkowe</th>';
  tmp+='<th colspan="2">średnia klasowa</th>';
  tmp+='<th colspan="2">uczniowie ze średnią 4.5+</th>';
  tmp+='<th colspan="2">czytelnictwo</th>';
  tmp+='<th>wyniki</th>';
  tmp+='<th>miejsca</th>';
  tmp+='<th>klasy</th>';
  tmp+='</tr>';
  $(".su-table-body").html("");
  $(".su-table-header").html(tmp);
  tmp="";
  for(var i=0; i<dataBase.classes.length;i++){
    for(var j=0; j<dataBase.classes[i].length;j++){
      ////console.log(i+" "+j);
      tmp+='<tr  class="table-class-row" data-xcoord="'+i+'" data-ycoord="'+j+'">';
      tmp+='<td>'+(i+1)+""+dataBase.classes[i][j]+'</td>';
      var tmp_num=0;
      for(k in dataBase.presence){
        //console.log("presence - "+k);
        tmp+='<td>'+dataBase.presence[k].classes[i][j]+'</td>';
        tmp_num+=dataBase.presence[k].classes[i][j];
        tmp+='<td>'+tmp_alldata.presence[k][i][j]+'</td>';
      }
      if(dataBase.semesterPresence.classes[i][j]==0){
        tmp+='<td>'+parseInt(tmp_num/dataBase.presence.length)+'</td>';
      }else{
        tmp+='<td>'+dataBase.semesterPresence.classes[i][j]+'</td>';
      }
      tmp+='<td>'+tmp_alldata.semester[i][j]+'</td>';
      tmp_num=0;
      for(k in dataBase.competitions.sport){
        //console.log("competitions.sport - "+k);
        tmp_num+=tmp_alldata.competitions.sport[k][i][j];
      }
      for(k in dataBase.competitions.inter){
        //console.log("competitions.inter - "+k);
        tmp_num+=tmp_alldata.competitions.inter[k][i][j];
      }
      tmp+='<td>'+tmp_num+'</td>';
      for(k in dataBase.competitions.outer){
        //console.log("competitions.outer - "+k);
        tmp_num+=tmp_alldata.competitions.outer[k][i][j];
      }
      tmp_num+=tmp_alldata.competitions.olimpics[i][j];
      tmp+='<td>'+tmp_num+'</td>';
      tmp_num=0;
      for(k in dataBase.extraPoints){
        //console.log("extraPoints - "+k);
        tmp_num+=tmp_alldata.extras[k][i][j];
      }
      tmp+='<td>'+tmp_num+'</td>';
      tmp+='<td>'+dataBase.marks.average.classes[i][j]+'</td>';
      tmp+='<td>'+tmp_alldata.marks.average[i][j]+'</td>';
      tmp+='<td>'+dataBase.marks.primes.classes[i][j]+'</td>';
      tmp+='<td>'+tmp_alldata.marks.primes[i][j]+'</td>';
      tmp+='<td>'+dataBase.reading[i][j]+'</td>';
      tmp+='<td>'+tmp_alldata.reading[i][j]+'</td>';
      tmp+='<td>'+tmp_alldata.score[i][j]+'</td>';
      tmp+='<td>'+tmp_alldata.place[i][j]+'</td>';
      tmp+='<td>'+(i+1)+""+dataBase.classes[i][j]+'</td>';
      tmp+='</tr>';
      $(".su-table-body").append(tmp);
      tmp='';
    }
  }
  $(".table-class-row").on("click", function(){
    $("article").addClass("hide-me");
    $(".class-view-window").removeClass("hide-me");
    miniListClassSelect($(this).data("xcoord"), $(this).data("ycoord"));
  });
}
function printMenu(title, classCoord, dataObj){
  $(".edit-menu-modu").modal("show");
  $(".edit-menu-box h1").html(title);
  $(".edit-menu-box .class-name").html((classCoord[0]+1)+""+dataBase.classes[classCoord[0]][classCoord[1]]);
  $(".edit-menu-box .edit-menu-interface").html("");
  $(".edit-menu-box .edit-menu-interface").data("section",dataObj.section);
  $(".edit-menu-box .edit-menu-interface").data("xcoord",classCoord[0]);
  $(".edit-menu-box .edit-menu-interface").data("ycoord",classCoord[1]);
  for(var i=0;i<dataObj.interface.length;i++){
    $(".edit-menu-box .edit-menu-interface").append('<p>'+dataObj.interface[i].name+':</p><input data-value="'+dataObj.interface[i].key+'" type="number" placeholder="1.0" step="0.01" value="'+dataObj.interface[i].value+'"><br>');
  }
}
function writeDataInView(xcoord, ycoord){
  $(".class-view-scores").html('');
  var tmp_names=[];var tmp_num=[];var tmp_points=[];
  var tmp=calculatePercents();
  var tmp_calc=0;
  for(i in dataBase.presence){
    tmp_names[i]=dataBase.presence[i].name;
    tmp_num[i]=dataBase.presence[i].classes[xcoord][ycoord];
    tmp_points[i]=tmp.presence[i][xcoord][ycoord];
    tmp_calc+=dataBase.presence[i].classes[xcoord][ycoord]
  }
  tmp_names.push("Semestr "+dataBase.semester);
  if(dataBase.semesterPresence.classes[xcoord][ycoord]==0){
    tmp_num.push(parseInt(tmp_calc/tmp_num.length));
  }else{
    tmp_num.push(dataBase.semesterPresence.classes[xcoord][ycoord]);
  }
  tmp_points.push(tmp.semester[xcoord][ycoord]);
  generateSection("obecność", tmp_names, tmp_num, tmp_points);
  tmp_names=[
    'średnia klasowa',
    'uczniowie 4.5+'
  ];
  tmp_num=[
    dataBase.marks.average.classes[xcoord][ycoord],
    dataBase.marks.primes.classes[xcoord][ycoord]
  ];
  tmp_points=[
    tmp.marks.average[xcoord][ycoord],
    tmp.marks.primes[xcoord][ycoord],
  ];
  generateSection("oceny", tmp_names, tmp_num, tmp_points);
  $(".class-view-scores").append("<h2>Zawody</h2>");
  tmp_names=[];tmp_num=[];tmp_points=[];
  for(i in dataBase.competitions.outer){
    tmp_names[i]=dataBase.competitions.outer[i].name;
    tmp_num[i]=dataBase.competitions.outer[i].classes[xcoord][ycoord];
    tmp_points[i]=tmp.competitions.outer[i][xcoord][ycoord];
  }
  generateSection("zewnętrzne", tmp_names, tmp_num, tmp_points);
  tmp_names=[];tmp_num=[];tmp_points=[];
  for(i in dataBase.competitions.inter){
    tmp_names[i]=dataBase.competitions.inter[i].name;
    tmp_num[i]=dataBase.competitions.inter[i].classes[xcoord][ycoord];
    tmp_points[i]=tmp.competitions.inter[i][xcoord][ycoord];
  }
  tmp_names.push("Olimpiady");
  tmp_num.push(dataBase.competitions.olimpics.classes[xcoord][ycoord]);
  tmp_points.push(tmp.competitions.olimpics[xcoord][ycoord]);
  generateSection("wewnętrzne", tmp_names, tmp_num, tmp_points);
  tmp_names=[];tmp_num=[];tmp_points=[];
  for(i in dataBase.competitions.sport){
    tmp_names[i]=dataBase.competitions.sport[i].name;
    tmp_num[i]=dataBase.competitions.sport[i].classes[xcoord][ycoord];
    tmp_points[i]=tmp.competitions.sport[i][xcoord][ycoord];
  }
  generateSection("sport", tmp_names, tmp_num, tmp_points);
  tmp_names=[];tmp_num=[];tmp_points=[];
  for(i in dataBase.extraPoints){
    tmp_names[i]=dataBase.extraPoints[i].name;
    tmp_num[i]=dataBase.extraPoints[i].classes[xcoord][ycoord];
    tmp_points[i]=tmp.extras[i][xcoord][ycoord];
  }
  generateSection("dodatkowe", tmp_names, tmp_num, tmp_points);
  tmp_names=[
    "czytelnictwo"
  ];
  tmp_num=[
    dataBase.reading[xcoord][ycoord]
  ];
  tmp_points=[
    tmp.reading[xcoord][ycoord]
  ];
  generateSection("czytelnia", tmp_names, tmp_num, tmp_points);
  $(".class-view-scores").append('<h3>Podsumowanie</h3>');
  $(".class-view-scores").append('<div class="row class-view-score-section"></div>');
  $(".class-view-scores .class-view-score-section").last().append('<div class="col-6 class-view-display-endpoint"><div data-key="score"><h2>punkty</h2><div class="points">'+tmp.score[xcoord][ycoord]+'</div></div></div>');
  $(".class-view-scores .class-view-score-section").last().append('<div class="col-6 class-view-display-endpoint"><div data-key="place"><h2>miejsce</h2><div class="place">'+tmp.place[xcoord][ycoord]+'</div></div></div>');
}
function generateSection(title, name, num, points){
  $(".class-view-scores").append('<h3>'+title+'</h3>');
  $(".class-view-scores").append('<div class="row class-view-score-section"></div>');
  for(x in name){
    $(".class-view-scores .class-view-score-section").last().append('<div class="col-4 class-view-display-box"><div><h5>'+name[x]+'</h5><div class="count-box-display">'+num[x]+'</div><div class="points-box-display"><b>'+points[x]+'</b></div></div></div>');
  }
}
