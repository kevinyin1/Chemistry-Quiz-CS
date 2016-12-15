var config = {
  apiKey: "AIzaSyCtmRFEI7sYJykO0q_l20nl521GRt0U8Vg",
  authDomain: "csquizproject.firebaseapp.com",
  databaseURL: "https://csquizproject.firebaseio.com",
  storageBucket: "csquizproject.appspot.com",
  messagingSenderId: "70741320633"
};
firebase.initializeApp(config);
var database = firebase.database().ref('questions');
var data;
function loadques(categoryname,output){
    var build;
    var myTemplate = '<div class="col-xs-3"><div class="item"><div class="panel panel-default"><div class="panel-heading">{{data.question}}</div><div class="panel-body"><form><input type="radio" id="answer" name="{{key}}" value="{{data.answerA}}"> A) {{data.answerA}}<br><input type="radio" id="answer" name="{{key}}" value="{{data.answerB}}"> B) {{data.answerB}}<br><input type="radio" id="answer" name="{{key}}" value="{{data.answerC}}"> C) {{data.answerC}}<br><input type="radio" id="answer" name="{{key}}" value="{{data.answerD}}"> D) {{data.answerD}}<br></form></div></div></div></div><div id="myModal" class="modal"><div class="modal-content"><span class="close">&times;</span><div class="modalbuild"></div></div></div>';
    database.on('value',function(snapshot){
    build = "";
    data = snapshot.val();
    for(key in data){
        if (data[key].category == categoryname){
            build += Mustache.render(myTemplate,{key:key, data:data[key]});
        }
    }
        $('#'+output).html(build);

    });
}

   function grade(){
     var incor=0,cor=0,count1=0,count2=0,corques=[],incorques=[];
     var modal = document.getElementById('myModal');
     var span = document.getElementsByClassName("close")[0];
     var inputs = $("input");
     for (var i = 0; i < inputs.length; i++){
       if (inputs[i].checked && (inputs[i].value == data[inputs[i].name].answer)){
            cor++;
            corques[count1]={'key':inputs[i].name,'userans':inputs[i].value};
            count1++;
       }
        else if (inputs[i].checked && (inputs[i].value != data[inputs[i].name].answer)){
            incor++;
            incorques[count2]={'key':inputs[i].name,'userans':inputs[i].value};
            count2++;
        }
        /*else if (!inputs[i].checked){
            console.log('ji');
        }*/
       }
       template = '<b>Question:</b> {{data.question}}<br><b>Your Answer:</b> {{userans}}<br><b>Correct Answer:</b> {{data.answer}}<br><br>';
       var buildcor='',buildincor='';
       database.on('value',function(snapshot){
           data = snapshot.val();
           for(key in data){
               for(x in corques){
                   if(corques[x].key == key){
                    buildcor+= Mustache.render(template,{data:data[key], userans:corques[x].userans});
                  }
               }
               for(y in incorques){
                   if(incorques[y].key == key){
                    buildincor+= Mustache.render(template,{data:data[key], userans:incorques[y].userans});
                  }
               }
           }
       });
       $('.modalbuild').html('<h2 id="correct">Number Of Correct: '+cor+'</h2><div class="buildcor"></div><br><h2 id="incorrect">Number Of Incorrect: '+incor+'</h2><div class="buildincor"></div>');
       $('.buildcor').html(buildcor);
       $('.buildincor').html(buildincor);
       modal.style.display = "block";
       span.onclick = function() {
       modal.style.display = "none";
     }
 }
