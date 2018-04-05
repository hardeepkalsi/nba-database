const sqlite3 = require('sqlite3').verbose(); //Verbose for longer stacktraces
const yargs = require("yargs"); //Import yargs for command line argument parsing

var argv = yargs
  .command("search","Searches for player in db", {
  player:{
    describe: "Search for player",
    demand: true,
    alias: 'p'
  }  
 })
.help()
.argv
command = argv._[0];

if(command === "search")
  {
  let db = new sqlite3.Database('nba.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the NBA database.');
  });

  let sql = `SELECT MIN, FG_PCT, PTS
            FROM player_reg_season
            WHERE PLAYER_NAME = ?`;

  let playerName = argv.player;

  db.each(sql, [playerName], (err, row) => {
    if(err){
      return console.err(err.message);
    }
    console.log(`MIN: ${row.MIN}, FG: ${Math.round(row.FG_PCT*100)}%, PTS: ${row.PTS}`);
  });

  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Closed the database connection.');
  });
}