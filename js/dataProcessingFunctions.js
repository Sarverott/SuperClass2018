var dataBase={
  classes:[
    ["a","b","c","d","e","f-k","g","n"],
    ["a","b","c","d","e","f-k","g","n"],
    ["a","b","c","d","e-k","g","i","n"],
    ["a","b","c","d","g","i","n","m"]
  ],
  presence:[
    {
      name:"wrzesień",
      riffles:[80,85,90,95],
      multiplier:5,
      classes:[]
    },
    {
      name:"pazdziernik",
      riffles:[80,85,90,95],
      multiplier:5,
      classes:[]
    },
    {
      name:"listopad",
      riffles:[80,85,90,95],
      multiplier:5,
      classes:[]
    },
    {
      name:"grudzień",
      riffles:[80,85,90,95],
      multiplier:5,
      classes:[]
    }
  ],
  semesterPresence:{
    riffles:[80,85,90,95],
    multiplier:5,
    classes:[]
  },
  semester:1,
  extraPoints:[
    {
      name:"akademia",
      multiplier:5,
      classes:[]
    },
    {
      name:"wolontariat",
      multiplier:5,
      classes:[]
    },
    {
      name:"nieobecność na zebraniu samorządu",
      multiplier:-20,
      classes:[]
    },
    {
      name:"punkty specjalne",
      multiplier:1,
      classes:[]
    }
  ],
  reading:[],
  marks:{
    average:{
      multiplier:4,
      classes:[]
    },
    primes:{
      multiplier:20,
      classes:[]
    }
  },
  competitions:{
    sport:[
      {
        name:"1 miejsce",
        multiplier:20,
        classes:[]
      },
      {
        name:"2 miejsce",
        multiplier:15,
        classes:[]
      },
      {
        name:"3 miejsce",
        multiplier:10,
        classes:[]
      },
      {
        name:"udział",
        multiplier:5,
        classes:[]
      }
    ],
    outer:[
      {
        name:"1 miejsce",
        multiplier:50,
        classes:[]
      },
      {
        name:"2 miejsce",
        multiplier:40,
        classes:[]
      },
      {
        name:"3 miejsce",
        multiplier:30,
        classes:[]
      },
      {
        name:"wyróżnienie",
        multiplier:20,
        classes:[]
      }
    ],
    inter:[
      {
        name:"1 miejsce",
        multiplier:15,
        classes:[]
      },
      {
        name:"2 miejsce",
        multiplier:10,
        classes:[]
      },
      {
        name:"3 miejsce",
        multiplier:5,
        classes:[]
      }
    ],
    olimpics:{
      multiplier:100,
      classes:[]
    }
  }
};
function fillWithZeroDualArray(){
  var tmp=[];
  for(v in dataBase.classes){
    tmp[v]=[];
    for(g in dataBase.classes[v]){
      tmp[v][g]=0;
    }
  }
  return tmp;
}
function findInArray(arr, name){
  for(k in arr){
    if(arr[k].name==name){
      return k;
      break;
    }
  }
}
function generateClasses(){
  for(var i=0;i<dataBase.classes.length;i++){
    for(var j=0;j<dataBase.classes[i].length;j++){
      $(".class-mini-list").append('<button class="btn btn-succesfull class-select-button" data-xcoord="'+i+'" data-ycoord="'+j+'">'+(i+1)+""+dataBase.classes[i][j]+'</button><br>');
    }
  }
  $(".class-select-button").on("click", function(){
    miniListClassSelect($(this).data('xcoord'), $(this).data('ycoord'));
  });
  dataBase.reading=fillWithZeroDualArray();
  dataBase.marks.average.classes=fillWithZeroDualArray();
  dataBase.marks.primes.classes=fillWithZeroDualArray();
  for(i in dataBase.competitions.outer){
    dataBase.competitions.outer[i].classes=fillWithZeroDualArray();
  }
  for(i in dataBase.competitions.inter){
    dataBase.competitions.inter[i].classes=fillWithZeroDualArray();
  }
  for(i in dataBase.competitions.sport){
      dataBase.competitions.sport[i].classes=fillWithZeroDualArray();
  }
  for(i in dataBase.extraPoints){
      dataBase.extraPoints[i].classes=fillWithZeroDualArray();
  }
  for(i in dataBase.presence){
      dataBase.presence[i].classes=fillWithZeroDualArray();
  }
  dataBase.semesterPresence.classes=fillWithZeroDualArray();
  dataBase.competitions.olimpics.classes=fillWithZeroDualArray();
}
