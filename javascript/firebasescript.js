var config = {
  apiKey: "AIzaSyCtmRFEI7sYJykO0q_l20nl521GRt0U8Vg",
  authDomain: "csquizproject.firebaseapp.com",
  databaseURL: "https://csquizproject.firebaseio.com",
  storageBucket: "csquizproject.appspot.com",
  messagingSenderId: "70741320633"
};
firebase.initializeApp(config);
var database = firebase.database().ref('questions');

function loadques(template,categoryname,output){
    var data, build;
    var myTemplate = $('#'+template).html()
    database.on('value',function(snapshot){
    build = "";
    data = snapshot.val();
    for(key in data){
        if (data[key].category == categoryname){
            console.log(data[key]);
            build += Mustache.render(myTemplate,data[key]);
        }
    }
        $('#'+output).html(build);
    });
}
