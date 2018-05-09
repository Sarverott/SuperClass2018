function insertDataFromEditor(){
  saveWorkspace();
  savebutt=document.getElementById('save-me-very-much');

  switch($(".edit-menu-box .edit-menu-interface").data("section")){
    case 'marks':
      $(".edit-menu-box .edit-menu-interface input").each(function(){
        switch($(this).data("value")){
          case 'average':
            dataBase.marks.average.classes[$(".edit-menu-box .edit-menu-interface").data("xcoord")][$(".edit-menu-box .edit-menu-interface").data("ycoord")]=parseFloat($(this).val());
          break;
          case 'primes':
            dataBase.marks.primes.classes[$(".edit-menu-box .edit-menu-interface").data("xcoord")][$(".edit-menu-box .edit-menu-interface").data("ycoord")]=parseInt($(this).val());
          break;
        }
      });
    break;
    case 'reading':
      $(".edit-menu-box .edit-menu-interface input").each(function(){
        switch($(this).data("value")){
          case 'reading':
            dataBase.reading[$(".edit-menu-box .edit-menu-interface").data("xcoord")][$(".edit-menu-box .edit-menu-interface").data("ycoord")]=parseInt($(this).val());
          break;
        }
      });
    break;
    case 'extras':
      $(".edit-menu-box .edit-menu-interface input").each(function(){
          dataBase.extraPoints[findInArray(dataBase.extraPoints, $(this).data("value"))].classes[$(".edit-menu-box .edit-menu-interface").data("xcoord")][$(".edit-menu-box .edit-menu-interface").data("ycoord")]=parseInt($(this).val());
      });
    break;
    case 'competitions':
      $(".edit-menu-box .edit-menu-interface input").each(function(){
        var tmp;
        var keyString=$(this).data("value");
        if (keyString=="olimpiady") {
          dataBase.competitions.olimpics.classes[$(".edit-menu-box .edit-menu-interface").data("xcoord")][$(".edit-menu-box .edit-menu-interface").data("ycoord")]=parseInt($(this).val());
        }else{
          switch(keyString.substring(0,keyString.indexOf(' - '))){
            case 'sport':
              ////console.log(findInArray(dataBase.competitions.sport, keyString.substring(keyString.indexOf(' - ')+3,keyString.length)));
              ////console.log(keyString.substring(keyString.indexOf(' - ')+3,keyString.length-1));
              ////console.log(keyString.indexOf(' - ')+3);
              dataBase.competitions.sport[findInArray(dataBase.competitions.sport, keyString.substring(keyString.indexOf(' - ')+3,keyString.length))].classes[$(".edit-menu-box .edit-menu-interface").data("xcoord")][$(".edit-menu-box .edit-menu-interface").data("ycoord")]=parseInt($(this).val());
            break;
            case 'wewnętrzne':
              dataBase.competitions.inter[findInArray(dataBase.competitions.sport, keyString.substring(keyString.indexOf(' - ')+3,keyString.length))].classes[$(".edit-menu-box .edit-menu-interface").data("xcoord")][$(".edit-menu-box .edit-menu-interface").data("ycoord")]=parseInt($(this).val());
            break;
            case 'zewnętrzne':
              ////console.log(keyString);
              ////console.log(findInArray(dataBase.competitions.sport, keyString.substring(keyString.indexOf(' - ')+3,keyString.length)));
              ////console.log(keyString.substring(keyString.indexOf(' - ')+3,keyString.length));
              ////console.log(keyString.indexOf(' - ')+3);
              dataBase.competitions.outer[findInArray(dataBase.competitions.outer, keyString.substring(keyString.indexOf(' - ')+3,keyString.length))].classes[$(".edit-menu-box .edit-menu-interface").data("xcoord")][$(".edit-menu-box .edit-menu-interface").data("ycoord")]=parseInt($(this).val());
            break;
          }
        }
      });
    break;
    case 'presence':
      $(".edit-menu-box .edit-menu-interface input").each(function(){
          dataBase.presence[findInArray(dataBase.presence, $(this).data("value"))].classes[$(".edit-menu-box .edit-menu-interface").data("xcoord")][$(".edit-menu-box .edit-menu-interface").data("ycoord")]=parseFloat($(this).val());
      });
    break;
    case 'presence-semester':
      $(".edit-menu-box .edit-menu-interface input").each(function(){
          dataBase.semesterPresence.classes[$(".edit-menu-box .edit-menu-interface").data("xcoord")][$(".edit-menu-box .edit-menu-interface").data("ycoord")]=parseFloat($(this).val());
      });
    break;
  }
  savebutt.setAttribute('href', 'data:text/plain;charset=utf-8,'+encodeURIComponent(JSON.stringify(dataBase)));
  writeDataInView($(".class-view-window").data("xcoord"), $(".class-view-window").data("ycoord"))
  printTable();
}
function miniListClassSelect(xcoord, ycoord){
  $(".class-view-window").data("xcoord", xcoord);
  $(".class-view-window").data("ycoord", ycoord);
  $(".main-class-name").html((xcoord+1)+""+dataBase.classes[xcoord][ycoord]);
  writeDataInView(xcoord, ycoord);
}
