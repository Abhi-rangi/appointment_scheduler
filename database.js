import sqlite3 from "sqlite3";
const DBSOURCE = "db.sqlite";
let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }
    else{
        console.log('Connected to the SQLite database.');
            try{ 
                // db.run('CREATE TABLE appointment ( appno INTEGER PRIMARY KEY AUTOINCREMENT,date vartchar(30),time varchar(30) ,hni_id varchar(30),wm_id varchar(30),flag boolean,status varchar(30))');
                // db.run('CREATE TABLE HNI (hni_id varchar(30) PRIMARY KEY,status varchar(30),appno integer,date varchar(30),time varchar(30))');
                // db.run('CREATE TABLE WM (wm_id varchar(30) PRIMARY KEY,status varchar(30),appno integer,date varchar(30),time varchar(30))');
                console.log("done!!!!")
                }
                catch(e){
                    console.error(e);
                }
        }
    }
);
export async function bookAppointment(body){
    const flag = body.flag;
    const appno = body.appno;
    const hni_id = body.hni_id;
    const wm_id = body.wm_id;
    const date = JSON.stringify(body.date);
    const time = JSON.stringify(body.time); 

    const status = "not confirmed";
    db.run('INSERT INTO appointment (appno,date, time, hni_id,wm_id,flag,status)' + 'values (?,?,?,?,?,?,?)', [appno, date, time,hni_id,wm_id,flag,status]);
    if(flag){
      
        db.run('INSERT INTO HNI (hni_id,status,appno,date ,time)' + 'values (?,?,?,?,?)', [hni_id,"accept pending",appno,date,time]);
        db.run('INSERT INTO WM (wm_id,status,appno,date ,time)' + 'values (?,?,?,?,?)', [wm_id,status,appno,date,time]);
    }
    else{
        db.run('INSERT INTO HNI (hni_id,status,appno,date ,time)' + 'values (?,?,?,?,?)', [hni_id,status,appno,date,time]);
        db.run('INSERT INTO WM (wm_id,status,appno,date ,time)' + 'values (?,?,?,?,?)', [wm_id,"accept pending",appno,date,time]);
    }
    console.log("Appointment booked succefully");
    return {"message":"Appointment booked succefully"};
}
export async function Accept(body){
    db.run("UPDATE HNI set status = ? where appno = ?", ["accept",body.appno ]);
    db.run("UPDATE WM set status = ? where appno = ?",["accept",body.appno]);
    db.run("UPDATE appointment set status = ? where appno = ?",["accept",body.appno]);
    return{"message":"accepted"};
}
export async function Reject(body){
    db.run("UPDATE HNI set status = ? where appno = ?", ["reject",body.appno ]);
    db.run("UPDATE WM set status = ? where appno = ?",["reject",body.appno]);
    db.run("UPDATE appointment set status = ? where appno = ?",["reject",body.appno]);
    return{"message":"rejected"};
}export async function Reschedule(body){

    return 0 ;
}
export async function GetHNI(){{
    let result = db.get('select * from HNI where appno=?',2);
    console.log(result);
    return JSON.stringify(result);
}

} 