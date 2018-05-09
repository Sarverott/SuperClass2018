function generateRaport(type){
  console.log(type);
  switch(type){
    case "table":
    $("table").css({"width":"100%", "word-warping":"none", "text-align":"center"}).removeClass("table");
    var element = document.body;
    html2pdf(element, {
      html2canvas:  { dpi:200, windowWidth:2000, width: 1550, height: 1078},
      margin:       0.5,
      filename:     'raport-superklasa.pdf',
      jsPDF:        {units:'in', orientation: 'landscape',format: 'a4'}
    });
    break;
  }
  $("table").css({"width":"100%"}).addClass("table");
  printTable();
}
function loadWorkspace(){
  if(typeof(Cookies.get('superklasaprogress'))=="object"){
    dataBase=Cookies.get('superklasaprogress');
  }
}
function saveWorkspace(){
  Cookies.set('superklasaprogress', dataBase);
}
function demoFromHTML() {
  var pdf = new jsPDF('p', 'pt', 'letter');
  // source can be HTML-formatted string, or a reference
  // to an actual DOM element from which the text will be scraped.
  source = document.getElementsByClassName("all-classes-view")[0];
  // we support special element handlers. Register them with jQuery-style
  // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
  // There is no support for any other type of selectors
  // (class, of compound) at this time.
  specialElementHandlers = {
  // element with id of "bypass" - jQuery style selector
    '#bypassme': function(element, renderer){
      // true = "handled elsewhere, bypass text extraction"
      return true
    }
  };
  margins = {
    top: 80,
    bottom: 60,
    left: 40,
    width: 522
  };
  // all coords and widths are in jsPDF instance's declared units
  // 'inches' in this case
  pdf.fromHTML(
    source, // HTML string or DOM elem ref.
    margins.left, // x coord
    margins.top, {// y coord
      'width': margins.width, // max width of content on PDF
      'elementHandlers': specialElementHandlers
    },
    function(dispose) {
      // dispose: object with X, Y of the last line add to the PDF
      //          this allow the insertion of new lines after html
      pdf.save('Test.pdf');
    },
    margins
  );
}
function openFile(event) {
  var input = event.target;
  var reader = new FileReader();
  reader.onload = function(){
    var text = reader.result;
    var tmp=JSON.parse(text);
    if(typeof(tmp.semesterPresence)=="undefined"){
      tmp.semesterPresence=dataBase.semesterPresence;
    }
    dataBase=tmp;
    console.log(text);
    console.log(JSON.parse(text));
    printTable();
    $("article").addClass("hide-me");
    $(".all-classes-view").removeClass("hide-me");
  };
  reader.readAsText(input.files[0]);
}
