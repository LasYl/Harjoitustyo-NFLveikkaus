const item_view = ((data) => {
  /* console.log(data.picks);
  data.picks.forEach((pick) => {
    console.log(pick.text);
  }); */

 

 
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
      

        

       
    data.games.forEach((game) => {
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

        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        
        var dayName = days[dateObj.getDay()];
        var submitButton
        var pickform
        if (Date.parse(dateObj) - Date.now() < 0){
        
        submitButton = "";
        pickform = "-";
        }
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
                    //
                    {/*<input type="hidden" name="game_id" value=${game._id}>
        <input type="hidden" name="user" value="${data.user_id}">
        <input type="hidden" name="pickvalue" value= "">
                       <form action="/submit-pick/" method="POST"> 
                    <select id="test" name="test">
                    <option value="-">-</option>
                    <option value="testi1">"testi1"</option>
                    <option value="testi2">testi2</option>
                </select>
                    
                <button type="submit" id="submit">Submit pick</button>
                </form>  */}
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
            <td>${pickform}</td>
           ${submitButton}
            </tr>
            `;
            
    });
/* 
 <tr>
            <form action="/delete-item/" method="POST">
                <input type="hidden" name="item_id" value="">
                <input type="hidden" name="list_id" value="">
                <button type="submit">Delete item</button>
            </form></td>
    let sum=0;
   data.items.forEach((item) => {
        html += `<tr>
            <td>${item.text}</td> 
            <td>${item.quantity}</td> 
            <td>${item.price*item.quantity}</td>
            <td>
            <form action="/delete-item/" method="POST">
                <input type="hidden" name="item_id" value="${item._id}">
                <input type="hidden" name="list_id" value="${data.list_id}">
                <button type="submit">Delete item</button>
            </form></td>
            </tr>
            `;
            sum= sum + item.price*item.quantity;
    }); */
       
    html +=
         `
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

module.exports.item_view = item_view;