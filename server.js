const express = require('express');
const bodyParser = require('body-parser');
const mariadb = require('mariadb');
const path = require('path');


const app = express();
app.use(express.static('public'));
const port = 3000;

app.use(express.static(path.join(__dirname, 'public', 'pages')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Database connection pool
const pool = mariadb.createPool({
    host: 'localhost',
    user:'netprog_user_2023',
    password: '1234',
    database: 'netprog_db_2023',
});


app.post('/signup', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        
        const { firstname, lastname } = req.body;

        
        const result = await conn.query("INSERT INTO users (firstname, lastname) VALUES (?, ?)", [firstname, lastname]);

        res.redirect(`/index.html?firstname=${encodeURIComponent(firstname)}&lastname=${encodeURIComponent(lastname)}`);
        console.log(`Player name: ${firstname} ${lastname} loaded from URL query string`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding user');
    } finally {
        if (conn) conn.end(); 
    }
});

app.post('/login', async (req, res) => {
    let conn;
    try{
        conn = await pool.getConnection();
        const {firstname, lastname} = req.body;
        const result =await conn.query("select id from users where firstname = ? and lastname = ?", [firstname, lastname]);
        if(result.length > 0){
            res.redirect(`/index.html?firstname=${encodeURIComponent(firstname)}&lastname=${encodeURIComponent(lastname)}`);
        }
        else{
            res.redirect('/signup.html?error=usernotfound');
        }
    }catch(err){
        console.error(err);
        res.status(500).send('Error adding user');
    }finally{
        if(conn) conn.end();
    }
});

app.post('/game/end',async (req,res)=>{
    let conn;
    try{
        conn = await pool.getConnection();
        const {attempts, time, firstname, lastname} = req.body;
        console.log(attempts, time, firstname, lastname);
        let AttemptsInt = parseInt(attempts);

        const userRes = await conn.query("SELECT id FROM users WHERE firstname = ? AND lastname = ?", [firstname, lastname]);
        console.log(userRes);
        if(userRes.length > 0){
            const userId = userRes[0].id;
            await conn.query("INSERT INTO Activity (user_id, attempts, time) VALUES (?, ?, ?)", [userId, AttemptsInt, time]);
            res.send("Activity recorded successfully.");
        }else{
            res.status(404).send("User not found");
        }
    }catch(err){
        console.error(err);
        res.status(500).send('Error adding game data');
    }finally{
        if(conn) conn.end();
    }    
});

app.get('/leaderboard' ,async (req , res) => {
    let conn;
    try{
        conn = await pool.getConnection();
        const query = `SELECT users.firstname, users.lastname, MIN(Activity.attempts) AS best_attempts, MIN(Activity.time) AS best_time
        FROM Activity
        JOIN users ON Activity.user_id = users.id
        GROUP BY users.id
        ORDER BY best_attempts ASC, best_time ASC
        LIMIT 10;`;
        const rows = await conn.query(query);
        console.log(rows);
        res.json(rows);
    }catch(err){
        console.error(err);
        res.status(500).send('Error getting leaderboard data');
    }finally{
        if(conn) conn.end();
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
