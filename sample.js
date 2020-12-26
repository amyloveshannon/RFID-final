const sqlite3 = require('sqlite3').verbose();

//open DB
let db = new sqlite3.Database('./GPStest.db',(err)=>{

    if(err){
        console.log(error.message);
    }
    console.log('connected to GPStest DB in sqlite');
	
	//select data from DB
    /*db.all("select * from GPS_Test", function(err, rows) { 
        if(err){ 
			console.log("select from GPS_Test,",err.message); 
        }else{ 
			console.log(rows); 
        } 
    });*/
	
	//select data from DB
	db.serialize(() => {
		
		var i = 1;
		db.each(" SELECT ID as id, Longitude as longi, Latitude as lat FROM GPS_Test", (err, row) => {
			if (err) {
				console.error(err.message);
			}
			if(row.id == i && row.id < 10 ){
				console.log(row.id +": "+ row.longi + "\t" + row.lat);
				i++;
			}
			//console.log(row.longi + "\t" + row.lat);
		});
    });
    
	//close DB
    db.close((err)=>{
        if (err) {
            console.log(error.message);
        }
    })
	console.log('GPStest DB connection closed');

} )