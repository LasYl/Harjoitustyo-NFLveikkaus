
const week_views = require('../views/week-views');
const main_views = require('../views/main-views');
const board_views = require('../views/board-views');

const week_model = require('../models/week-model');
const game_model = require('../models/game-model');
const pick_model = require('../models/pick-model');

const DOMParser = require('xmldom').DOMParser;
const fetch = require("node-fetch");
//var jsdom = require("jsdom");
//var JSDOM = jsdom.JSDOM;


const get_weeks = (req, res, next) => {
    const user = req.user;

    week_model.find({}).then((week) => {
        let data = {
            user_name: user.name,
            weeks: week
        };
        
        let html = main_views.main_view(data);
        res.send(html);
    });
};


const post_games = (req, res, next) => {
        let j = 0;
        let number = req.body.game;
        fetch(`https://static.nfl.com/ajax/scorestrip?season=2020&seasonType=REG&week=${number}`)
            .then(response => response.text())
                .then((data) => {                                  
                    let parser = new DOMParser(),
                    xml = parser.parseFromString(data, "text/xml");                  
                    var games = xml.getElementsByTagName('g');
                        for(var wn = 0; wn < games.length; wn++) {  
                                                                     
                            week_model.findOne({
                                'text': number
                                }).then((week) => {
                                    var datetext = games[j].attributes[0].value;
                                    var year = datetext.charAt(0)+datetext.charAt(1)+datetext.charAt(2)+datetext.charAt(3)
                                    var month = datetext.charAt(4)+datetext.charAt(5)
                                    var daynumber = datetext.charAt(6)+datetext.charAt(7)
                                    var month2 = Number(month)-1;
                                    
                                    var home = games[j].attributes[6].value;
                                    var visitor = games[j].attributes[9].value;
                                    var day = games[j].attributes[2].value;
                                    var time = games[j].attributes[3].value;
                                    var hours
                                        if (time.charAt(1)==2)
                                            hours='0';
                                        else
                                            hours= time.charAt(0);
                                    var hours2 = Number(hours)+12;
                                    var minutes = time.charAt(time.length-2)+time.charAt(time.length-1);
                                    var date2 = new Date(year, month2, daynumber, hours2, minutes);

                                    var hscore = games[j].attributes[8].value;
                                    var vscore = games[j].attributes[11].value;
                                    var game_number = games[j].attributes[1].value;
                                        let new_game = game_model({
                                        home: home,
                                        visitor: visitor,
                                        day: day,
                                        time : time,
                                        hscore : hscore,
                                        vscore : vscore,
                                        game_number : game_number,
                                        date:date2                  
                                        });                   
                                        j++;

                                        new_game.save().then(() => {
                                        week.games.push(new_game);
                                        console.log(home, visitor)
                                        week.save().then(() => {                         
                                        });
                                        });
                            
                                });
                        }                             
                })
                                         
        return res.redirect('/');
    };   
                    

 

  

    const post_weeks = (req, res, next) => {
        let week_number = req.body.text;

    week_model.findOne({
        text: week_number
    }).then((week) => {
        if (week) {
            console.log('Week already registered');
            return res.redirect('/');
        }

        let new_week = new week_model({
            text: week_number,
            games: []
        });
        console.log('week ', week_number, ' added');
        new_week.save().then(() => {
            return res.redirect('/');
        });
    });
};


const get_board = (req, res, next) => {
  
        let data = {
            
        };
        
        let html = board_views.board_view(data);
        res.send(html);
   // });

}

const get_week = (req, res, next) => {
    const week_id = req.params.id;
    const user = req.user;

    week_model.findOne({
        _id: week_id
    }).then((week) => {
        week.populate('games').execPopulate().then(() => {
            week.populate('picks').execPopulate().then(() => {
            let data = {
                user_name: user.name,
                week_name: week.text,
                games: week.games,
                weekid: week._id,
                user_id: user._id,
                picks : week.picks    
            };
            
            let html =  week_views.week_view(data);
            res.send(html); 
                
        })  })  
    })
    //res.end();
};

const post_pick = (req, res, next) => {
    const week_id = req.body.week_id;
    const pick = req.body.test;
    const game_id = req.body.game_id;
    const user = req.body.user;
    console.log(pick);
    console.log(game_id);
    console.log(user);
        
   
    week_model.findOne({
         _id: week_id
     }).then((week) => {
        
        let new_pick= pick_model({
            text: pick,
            user_id: user,
            game_id: game_id
        });

        new_pick.save().then(() => {
            week.picks.push(new_pick);
            console.log("pick: ", user.name, " ", pick, " saved")
            week.save().then(() => { 
                
            return res.redirect(`/week/${week_id}`);                        
            });
            });
    

    
    }); 
}

const post_update_pick = (req, res, next) => {
    let user = req.body.user;
    let game = req.body.game_id;
    console.log(game,user);
    const week_id = req.body.week_id;
    const pick = req.body.test;
    console.log(pick);
    pick_model.findOneAndUpdate({game_id: game, user_id:user}, {$set: {text: pick }}, {upsert: true,returnOriginal:false, useFindAndModify: false}, function(err,doc) {

        if (err) { throw err; }
 
        else { console.log("Updated"); }
        
        return res.redirect(`/week/${week_id}`);    

      }); 

}


const post_update_games = (req, res, next) => {
    const week_id = req.body.week_id;
    
    
    let j = 0;
    let number = req.body.week_name;
    
        fetch(`https://static.nfl.com/ajax/scorestrip?season=2020&seasonType=REG&week=${number}`)
            .then(response => response.text())
                .then((data) => {                                  
                    let parser = new DOMParser(),
                    xml = parser.parseFromString(data, "text/xml");                  
                    var games = xml.getElementsByTagName('g');
                        for(var wn = 0; wn < games.length; wn++) {                                            
                            week_model.findOne({
                                'text': number
                                }).then((week) => {
                                    var datetext = games[j].attributes[0].value;
                                    var year = datetext.charAt(0)+datetext.charAt(1)+datetext.charAt(2)+datetext.charAt(3)
                                    var month = datetext.charAt(4)+datetext.charAt(5)
                                    var daynumber = datetext.charAt(6)+datetext.charAt(7)
                                    var month2 = Number(month)-1;
                                    console.log(wn,j);                                    
                                    var time = games[j].attributes[3].value;
                                    var hours
                                        if (time.charAt(1)==2)
                                            hours='0';
                                        else
                                            hours= time.charAt(0);
                                    var hours2 = Number(hours)+12;
                                    var minutes = time.charAt(time.length-2)+time.charAt(time.length-1);
                                    var date2 = new Date(year, month2, daynumber, hours2, minutes);

                                    var hscore = games[j].attributes[8].value;
                                    var vscore = games[j].attributes[11].value;
                                    var game_number = games[j].attributes[1].value;
                                    j++;
                                    console.log(game_number);
                                    game_model.findOneAndUpdate({game_number: game_number}, {$set: {hscore: hscore,  vscore : vscore, date:date2  }}, {upsert: true,new: true, useFindAndModify: false}, function(err,doc) {

                                        if (err) { throw err; }
                                 
                                        else { console.log("Updated"); }
                                        
                                           

                                      }); 
                                      return res.redirect(`/week/${week_id}`); 
                                      
                                    
    

                                      
     
    
    
                                });
                            }                             
                    });
                                             
                 
        }; 

/* const post_delete_item = (req, res, next) => {
    const list_id = req.params.id;
    const item_id_to_delete = req.body.item_id;
    const pick = document.querySelector('#choice option:selected');
    console.log("pick",pick)
     // find shoppinglist
  list_model
  .findById(req.body.list_id)
  .then(list => {


    //Remove item from list.items
    const updated_items = list.items.filter((item_id) => {
        return item_id != item_id_to_delete;
    });
    list.items = updated_items;

    //Remove item object from database
    list.save().then(() => {
        item_model.findByIdAndRemove(item_id_to_delete).then(() => {
            res.redirect(`/list/${list._id}`);
        });
    });
    });
}; */



module.exports.get_weeks = get_weeks;
module.exports.post_weeks = post_weeks;
module.exports.post_games = post_games;
module.exports.get_week = get_week;
module.exports.post_pick = post_pick;
module.exports.post_update_games = post_update_games;
module.exports.post_update_pick = post_update_pick;
module.exports.get_board = get_board;
//module.exports.get_picks = get_picks;