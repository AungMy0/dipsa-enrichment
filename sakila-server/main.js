//Load and configure your libraries
const path = require('path');
const express = require('express');
const mysql = require('mysql');
const handlebars = require('express-handlebars');
const cors = require('cors')

const pool = mysql.createPool({
    host: 'localhost', port: 3306, 
    user: 'fred', password: 'fred',
    database: 'sakila',
    connectionLimit: 4
})

//create an instance of the app
const app = express();

//Setup handlebars
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars');

//Enable CORS
app.use(cors());
/*
//Like CORSFilter 
app.use((req, resp, next) => {
	resp.header('Access-Control-Allow-Origin', '*');
	next()
})
*/


//GET /film/1
const SQL_FILM = 'select * from film where film_id = ?';
app.get('/film/:fid', (req, resp) => {
    pool.getConnection((err, conn) => {
        if (err) {
            resp.status(500);
            resp.type('text/plain');
            resp.send(JSON.stringify(err));
            return;
        }
        conn.query(SQL_FILM, [parseInt(req.params.fid)], 
            (err, result) => {
                conn.release(); //release the connection
                if (err) {
                    resp.status(500);
                    resp.type('text/plain');
                    resp.send(JSON.stringify(err));
                    return;
                }
                if (result.length <= 0) {
                    resp.status(404);
                    resp.type('text/plain');
                    resp.send("Not found");
                    return;
                }
                // [ { film_id:,....}, { film_id: .... }, .... ]
                resp.status(200);
                //content negotiation - representation
                resp.format({
                    'text/html': () => {
                        resp.render('films', { films: result });
                    },
                    'application/json': () => {
                        resp.json(result);
                    },
                    'default': () => {
                        resp.status(415)
                        resp.send("Media type not supported");
                    }

                });
                //resp.json(result);
                //resp.type('application/json');
                //resp.send(JSON.stringify(result));
            }
        );
    })
});

//GET /films?limit=50&offset=10
const SQL_FILMS = "select * from film limit ? offset ?";
// REST - REpresentational State Transfer
app.get('/films', (req, resp) => {
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;

    pool.getConnection((err, conn) => {
        if (err) {
            resp.status(500);
            resp.type('text/plain');
            resp.send(JSON.stringify(err));
            return;
        }
        conn.query(SQL_FILMS, [limit, offset], 
            (err, result) => {
                conn.release(); //release the connection
                if (err) {
                    resp.status(500);
                    resp.type('text/plain');
                    resp.send(JSON.stringify(err));
                    return;
                }
                // [ { film_id:,....}, { film_id: .... }, .... ]
                resp.status(200);
                //content negotiation - representation
                resp.format({
                    'text/html': () => {
                        resp.render('films', { films: result });
                    },
                    'application/json': () => {
                        resp.json(result);
                    },
                    'default': () => {
                        resp.status(415)
                        resp.send("Media type not supported");
                    }

                });
                //resp.json(result);
                //resp.type('application/json');
                //resp.send(JSON.stringify(result));
            }
        );

    });
});


// Define your routes (method, resource)

//define some static resources
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'angular')));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(
    function(req, resp) {
        resp.status(404)
        resp.type('image/gif');
        resp.sendFile(path.join(__dirname, 'images', '404.gif'));
    }
);


//Start the server
app.listen(3000, () => {
    console.log('Application started on port 3000 at %s', new Date());
});
