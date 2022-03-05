
const DBSOURCE = "db.sqlite";
let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE appointment (
            appoitment_number interger, appointment_time varchar(30) , hni_id integer, wm_id integer
            `);
        }
}
);
export async function bookAppointment(body){
    // const flag = body.flag;
    if(flag == 0){
        var insert = 'INSERT INTO appointment (appoitment_number, appointment_time, hni_id,wm_id) VALUES (1,"10:30",2,3)';
        db.run(insert);
    }
    return {"message":"Appointment booked succefully"};
}
// export async function accpet_HNI(){

// }