chrome.runtime.onStartup.addListener(function() {
  //mark in notification ID stored here
let notificationId;
//mark out notification stored here
let markOutNotId;
//mark out setInterval function stored here
let keepAskingMarkOut;

//Ask user if marked in every 20seconds after chrome starts
let askMarkIn= setInterval(function(){
chrome.notifications.create(
    'markIn',{
  type: "basic",
  title: "Maaba",
  message: "Chale, have you marked in already? ",
  buttons:[{
    title:"Yes Or Don't need to",
    iconUrl:'./icon.png'
  },{
    title:"No,take me there",
    iconUrl:'./icon.png'
  }],
  iconUrl: "./icon.png"
},function(id){notificationId=id;}
);},20000);

//Fired when user clicks a button
chrome.notifications.onButtonClicked.addListener(function(notId,btnIndex){
//if notification Id = mark in notification
  if(notId===notificationId){
    //Stop asking every 20 seconds
    clearInterval(askMarkIn);
    //If User already marked in or does not need to mark in , give success message
    if(btnIndex===0){
      chrome.notifications.create(
          'Maaba',{
        type: "basic",
        title: "Maaba",
        message: "Have a productive day.",
        iconUrl: "./icon.png"});
    }
    //If user is not marked in? Take user to portal
    else if(btnIndex===1){
      window.open('http://192.168.100.33');
    }

    //Calculate time for markout
    let now = new Date();
    let nowHours=now.getHours();
    let nowMinutes=now.getMinutes();
    let millisecondsBtn = ((16-nowHours)*60*60*1000)+((60-nowMinutes)*60*1000);
    console.log(millisecondsBtn);
    //Set a timeout for time left to mark out and set time interval after that
    let askMarkOut = setTimeout(function(){
      chrome.notifications.create(
          'markOut',{
        type: "basic",
        title: "Maaba",
        message: "Its time oo. Have you marked out?",
        buttons:[{
          title:"Yes Or Don't need to",
          iconUrl:'./icon.png'
        },{
          title:"No,take me there",
          iconUrl:'./icon.png'
        }],
        iconUrl: "./icon.png"
      },function(id){markOutNotId=id;}


      );
      console.log('Timeout');
      keepAskingMarkOut = setInterval(function(){
       chrome.notifications.create(
           'markOut',{
         type: "basic",
         title: "Maaba",
         message: "Its time oo. Have you marked out?",
         buttons:[{
           title:"Yes Or Don't need to",
           iconUrl:'./icon.png'
         },{
           title:"No,take me there",
           iconUrl:'./icon.png'
         }],
         iconUrl: "./icon.png"
       },function(id){markOutNotId=id;}

       );
       console.log('TimeInterval');
     },10000);
   },millisecondsBtn);

  }
//if notification id = mark out notification
  else  if(notId===markOutNotId){
    //Stop asking to mark out
     clearInterval(keepAskingMarkOut);
     //if already marked out send success message
     if(btnIndex===0){
       chrome.notifications.create(
           'Maaba',{
         type: "basic",
         title: "Maaba",
         message: "Have a wonderful evening.",
         iconUrl: "./icon.png"});
     }
     //if not marked out, send to portal
     else if(btnIndex===1){
       window.open('http://192.168.100.33');
     }
   }

});







});
