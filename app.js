//jshint esverrsion :
const express = require('express');
const bodyParser=require('body-parser');
const https=require('https');
const { request } = require('http');
const { response } = require('express');

const app=express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
res.sendFile(__dirname + '/signup.html');
})

app.post('/',(req,res)=>{
    const email= req.body.mail;
    const fname=req.body.fname;
    const lname= req.body.lname;

const data={

    members:[
        {
            email_address:email,
            status:'subscribed', 
            merge_fields:{

                FNAME:fname,
                LNAME:lname
            }
        }
    ]
};
const jsonData =JSON.stringify(data);
const url='https://us14.api.mailchimp.com/3.0/lists/a7eb940456' 
const options={
method:"POST",
auth:"any:308a7916287fa520444fc1f729116d97-us14"
}

const request=https.request(url,options,(response)=>{

    if(response.statusCode===200){
        res.sendFile(__dirname+'/success.html');
    }
    else{
        res.sendFile(__dirname+'/failure.html');
    }
    response.on("data",(data)=>{
        console.log(JSON.parse(data));  
    })
})
request.write(jsonData);
request.end();

})

app.post("/failure",(req,res)=>{
    res.redirect("/");    
})

app.listen(process.env.PORT || 3000,()=>console.log('server is running on port 3000'));

