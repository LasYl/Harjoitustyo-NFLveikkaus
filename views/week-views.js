const week_view = ((data) => {
 
 
    let html = `
    <html>
    <style>
    body {
        background-color: rgb(175, 175, 120);
    }

    button {
        background-color: greenyellow;
        cursor: pointer;
        text-align: center;
        color: darkblue;
        border: solid darkblue;
        font-size: 16px;
        margin: 5px;
    
    }
    
    h4 {
        position: absolute;
        top: 2em;
        left: 1em;
        width: 9em;
        color: red;
        
      }
      h1 {
        font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
        color: red;
        font-size: 110px;
        }
    
        .user {
         float:right;  
        }
    
        #user {
        position: absolute;
        right: 20px;
        top: 20px;
        z-index: +1;
        size: 15px;
        text-align: center;
         }
    
         #title {
          align-items: left;
          display: inline-block; 
         }
    
         table {           
           
           width: 1200px;
           border: 5px solid gold;
            background-color: #f3f3f3;
         }

         tr {
          border-bottom: 1px solid black;
          border-top: 1px solid black;
          border-collapse: collapse;         
          text-align: right;
          }

          
        .add {           
            float:left;
            margin-right:20px;
            border: 5px solid gold;
            background-color: #f3f3f3;
          }

         

         
      
    </style>
    <head><title>NFL-week</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
    </head>
    <body>
    <div class="top"><div><a href="/"}><img src="https://www.inventicons.com/uploads/iconset/236/wm/512/Go-back-arrow-15.png" alt="back" style="width:20px;height:20px;"><h3>Back to frontpage<h3></a><br></div>
         <div id="title">
            <h1>Week: ${data.week_name}</h1>
        </div>
         <div id="user">
            Logged in as user: <br>${data.user_name}
            <form action="/logout" method="POST">
            <button type="submit">Log out</button>
            
        </div> 
        </form>
            <form action="/update-games" method="POST" value="${data.week_name}">
            <input type="hidden" name="week_name" value="${data.week_name}">
            <input type="hidden" name="week_id" value="${data.weekid}">
            <button type="submit">Refresh</button>
            </form>     
    </div>
        <table id="example" width="600">
        <caption><h3>Games</h3></caption>
        <th>Date\t</th><th>Day</th><th>Time</th><th>Hometeam</th><th></th><th>Score</th><th></th><th>Awayteam</th><th>Winner</th><th>Your pick</th>
        `;
      
        let color
        let amount =0;
        let win=0;
        

       
    data.games.forEach((game) => {
      let yourPick ="-";
      data.picks.forEach((pick) => {
        
        if (pick.game_id.equals(game._id) && pick.user_id.equals(data.user_id)  ){
          //if ((pick.user_id == data.user_id) || (pick.game_id == game._id)){
          yourPick = pick.text;
          }
       
      });
    let winner 
        if (game.hscore - game.vscore > 0){
          winner = game.home;
        }
        else if (game.hscore - game.vscore < 0){
          winner = game.visitor;
        }
        else {
          winner = '';
        }
      
      let hpoints
        if (game.hscore)
          hpoints = game.hscore;

        else hpoints = "";

      let vpoints
        if (game.vscore)
          vpoints = game.vscore;

        else vpoints = "";
      
        var dateObj = game.date;
        dateObj.setHours(dateObj.getHours() + 9);
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        var hours = dateObj.getUTCHours();
        var minutes = dateObj.getUTCMinutes();
        
        newdate = day + "." + month + "." + year;
        
        if (minutes<10)
        newtime = hours + ":0" + minutes; 
        
        else
        newtime = hours + ":" + minutes;
        dateObj.setHours(dateObj.getHours() - 2);
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        console.log('day',dateObj,days[dateObj.getDay()]);
        var dayName = days[dateObj.getDay()];
        var submitButton
        var pickform
        console.log(Date.parse(dateObj) , Date.now())
        if (Date.parse(dateObj) - Date.now() < 3600000){
        
        submitButton = "";
        pickform = yourPick;
        }
        else if (yourPick != "-"){
          pickform = "-";
          
          submitButton = "";
        pickform = yourPick;
          ;}
        

        else{
        
        
        pickform = `<form action="/submit-pick/" method="POST"> 
        <select id="test" name="test">
                      <option disabled selected value></option>
                        <option value="${game.home}">${game.home}</option>
                        <option value="${game.visitor}">${game.visitor}</option>
                    </select>`;
        submitButton = `<td>
        <input type="hidden" name="game_id" value=${game._id}>
        <input type="hidden" name="user" value="${data.user_id}">
        <input type="hidden" name="week_id" value="${data.weekid}">
        <button type="submit">Submit pick</button>
        </form></td>`;}

        
        //let color = '#00FF00';
        if (winner == "" || pickform == "-")
        color = 'white';
        
        else if (winner == pickform){
        color = '#00FF00';
        win++;
        amount++;
        }
        else{
        color = 'red';
        amount++;
        }

        html += `
        
        <tr>
            
            <td>${newdate}</td> 
            <td>${dayName}</td> 
            <td>${newtime}</td>  
            <td>${game.home}</td> 
            <td>${hpoints}</td>
            <td> - </td>
            <td>${vpoints}</td>
            <td>${game.visitor}</td>
            <td>${winner}</td>
            
            <td style bgcolor=${color}>${pickform}</td>
           ${submitButton}
            </tr>
            `;
            
    });
    let result ="";
    let percent = Math.round(win/amount*100);
    
    if (amount >0){
      result =` <tr>
            
      <td></td> 
      <td></td> 
      <td></td>  
      <td></td> 
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      
      <td><b>${win}/${amount} = ${percent} %</b></td>
     
      </tr>`;
    }

    html +=
         `
         ${result}
         
        <div>
       
        </div>
       
        `;

html +=
`
    
    </body>
    </html>
    `;
    return html;
});

module.exports.week_view = week_view;