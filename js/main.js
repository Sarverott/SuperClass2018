$(document).ready(function(){
  generateClasses();

  $(".save-me-very").on("click",function(){
    insertDataFromEditor();
  });
  $(".class-view-option").on("click", function(){
    var title;
    var configObj;
    switch($(this).data("option")){
      case 'marks':
        title="oceny";
        configObj={
          interface:[
            {
              name:"średnia ocen",
              key:'average',
              value:dataBase.marks.average.classes[$(".class-view-window").data("xcoord")][$(".class-view-window").data("ycoord")]
            },
            {
              name:"uczniowie ze średnią 4.5+",
              key:'primes',
              value:dataBase.marks.primes.classes[$(".class-view-window").data("xcoord")][$(".class-view-window").data("ycoord")]
            }
          ],
          section:$(this).data("option")
        };
      break;
      case 'extras':
        title="dodatkowe";
        configObj={
          interface:[],
          section:$(this).data("option")
        };
        for(var x=0;x<dataBase.extraPoints.length;x++){
          configObj.interface.push({
            name:dataBase.extraPoints[x].name,
            key:dataBase.extraPoints[x].name,
            value:dataBase.extraPoints[x].classes[$(".class-view-window").data("xcoord")][$(".class-view-window").data("ycoord")]
          });
        }
      break;
      case 'competitions':
        title="zawody";
        configObj={
          interface:[],
          section:$(this).data("option")
        };
        for(var x=0;x<dataBase.competitions.sport.length;x++){
          configObj.interface.push({
            name:"sport - "+dataBase.competitions.sport[x].name,
            key:"sport - "+dataBase.competitions.sport[x].name,
            value:dataBase.competitions.sport[x].classes[$(".class-view-window").data("xcoord")][$(".class-view-window").data("ycoord")]
          });
        }
        for(var x=0;x<dataBase.competitions.inter.length;x++){
          configObj.interface.push({
            name:"wewnętrzne - "+dataBase.competitions.inter[x].name,
            key:"wewnętrzne - "+dataBase.competitions.inter[x].name,
            value:dataBase.competitions.inter[x].classes[$(".class-view-window").data("xcoord")][$(".class-view-window").data("ycoord")]
          });
        }
        for(var x=0;x<dataBase.competitions.outer.length;x++){
          configObj.interface.push({
            name:"zewnętrzne - "+dataBase.competitions.outer[x].name,
            key:"zewnętrzne - "+dataBase.competitions.outer[x].name,
            value:dataBase.competitions.outer[x].classes[$(".class-view-window").data("xcoord")][$(".class-view-window").data("ycoord")]
          });
        }
        configObj.interface.push({
          name:"olimpiady",
          key:"olimpiady",
          value:dataBase.competitions.olimpics.classes[$(".class-view-window").data("xcoord")][$(".class-view-window").data("ycoord")]
        });
      break;
      case 'reading':
        title="czytelnictwo";
        //////console.log($(".class-view-window").data("ycoord"));
        //////console.log($(".class-view-window").data("xcoord"));
        configObj={
          interface:[
            {
              name:"czytelnictwo",
              key:'reading',
              value:dataBase.reading[$(".class-view-window").data("xcoord")][$(".class-view-window").data("ycoord")]
            }
          ],
          section:$(this).data("option")
        };
      break;
      case 'presence':
        title="obecność";
        configObj={
          interface:[],
          section:$(this).data("option")
        };
        for(var x=0;x<dataBase.presence.length;x++){
          configObj.interface.push({
            name:dataBase.presence[x].name,
            key:dataBase.presence[x].name,
            value:dataBase.presence[x].classes[$(".class-view-window").data("xcoord")][$(".class-view-window").data("ycoord")]
          });
        }
        //////console.log(type);
        //////console.log(configObj);
      break;
      case 'presence-semester':
        title="obecność za semestr (ustaw 0 aby liczyło automatycznie)";
        configObj={
          interface:[],
          section:$(this).data("option")
        };
        configObj.interface.push({
          name:'obecność semestralna',
          key:'presence-semester',
          value:dataBase.semesterPresence.classes[$(".class-view-window").data("xcoord")][$(".class-view-window").data("ycoord")]
        });
        //////console.log(type);
        //////console.log(configObj);
      break;
    }
    printMenu(title, [$(".class-view-window").data("xcoord"), $(".class-view-window").data("ycoord")], configObj);
  });
  $(".nav-table-button").on("click", function(){
    $("article").addClass("hide-me");
    $(".all-classes-view").removeClass("hide-me");
  });
  $(".nav-raport-button").on('click', function(){
    generateRaport('table');
  });
  printTable();
  loadWorkspace();
  //////console.log(calculatePercents());
});
