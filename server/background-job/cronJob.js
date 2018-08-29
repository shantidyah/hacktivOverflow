var CronJob = require('cron').CronJob;
const Question = require('../models/questions')

function Cron (){
    new CronJob('0 0 20 * * 1-5', function() {
        console.log("send daily report");
        getEmail()
    }, null, true, 'Asia/Jakarta');
}



function getEmail(){
    var email = []
    Question.find({})
    .populate('user','email')
    .then( useremail =>{
        // console.log(useremail);
        
        for( var i = 0; i < useremail.length; i++){
            var obj = {to: useremail[i].user.email, subject: "Daily Update Your Question", html: `
            Your question '${useremail[i].question}'. Have ${useremail[i].answers.length} answer and ${useremail[i].vote} vote.
            Go checkout now !`}
            SendEmail(obj)
            // console.log(useremail[i].answers);
            
        }
        // console.log(email);
    })
    .catch(err=>{
        console.log(err.message);
    })
}


function SendEmail(obj){
  const send = require('gmail-send')({
    user: 'sdpusparani.sd@gmail.com',
    pass: 'kimcbuqhfeoqxpeo',
    to: obj.to,
    subject: obj.subject,
    html: obj.html
  })
  send()
}


module.exports = Cron