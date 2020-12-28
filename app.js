const express = require('express')
const path = require('path')
const app = express()
var fs = require('fs')
var qs = require ('querystring')
const port = 3000
var result
var i = 0 
var data = new Array();  
const sqlite = require('sqlite3').verbose()
let indexPage = path.join(__dirname + '/new1.html')

app.use(express.static('public'));
let db = new sqlite.Database('./group1_new.db',(err)=>{

    if(err){
        console.log(error.message)
    }
    console.log('connected to chinook db in sqlite')
    /*db.all("select * from group1", function(err, rows) { 
        if(err){ 
        console.log("select from group1,",err.message); 
        }else{ 
        console.log(rows); 
		result = rows
        } 
        }); */
    db.each("select * from group1", function(err,row){
		data[i] = [row.Date,row.Latitude,row.Longitude]
		console.log("id: "+i+", DATE: "+data[i][0]+", Latitude: "+data[i][1]+", Longitude: "+data[i][2])
		i = i+1
		console.log(row.Date + ":"+row.Latitude+","+row.Longitude)
		
	});
	
	/*for(i=0;i<=32;i++)
{
	console.log("id:"+i+",Date:"+data[i][0]+",Latitude:"+data[i][1]+",Longitude:"+data[i][2]);
}*/
	
    db.close((err)=>
    {
            if (err) {
                console.log(error.message);
            }
    })
	console.log('chinook db connection closed')

} )
function render(filename, params) {//render( 'new.html', {GPS:JSON.stringify(data)})
  var data = fs.readFileSync(filename, 'utf8');
  for (var j in params) {
    data = data.replace('{' + j + '}', params[j]);
  }
  return data;
}
// respond with GPS when a GET request is made to the homepage
app.get('/', (req, res) => {
	
 //res.sendFile(indexPage);
	res.send(render('new1.html', {//render(什麼東西, 哪裡)
		GPS:JSON.stringify(data)//JSON.stringify(): 物件變JSON
	})	);
  //res.json({ GPS: data });
 
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})