
const main_view = ((data) => {
    
    let html = `
    <html>
    <style>
    body {
    background-image: url("https://thehill.com/sites/default/files/styles/thumb_small_article/public/nfllogo_101319getty.jpg?itok=3m4578Vd");
    
    background-size: contain;
    }
    </style>
    <head><title>NFL-Veikkaus</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
    </head>
    <body>
    <div class="top">
        <div id="title">
            <h1>FITZMAGIC</h1>
        </div>
         <div id="user">
            Logged in as user: <br><b>${data.user_name}</b>
            <form action="/logout" method="POST">
            <button type="submit">Log out</button>
            </form>
            </form>

            `;

        //Add weeks and games manually   
       /*      html += `
        <form action="/games" method="POST">
        <input type="text" name="game">
        <button type="submit">Add game</button>
    </form>
    <form action="/add-weeks" method="POST">
        <input type="text" name="text">
        <button type="submit">Add weeks</button>
    </form>
    */
    html += `
    </div>
    </div>
    </body> 
    <body>
    <hr>
    
 
    
    
        <div class="saved">
        <h2>WEEKS:</h2>       
        <table>
        <tr>
    `;
     
    
   
      data.weeks.forEach((week) => {
        html += ` 
            <td><a href="/week/${week._id}"><h1>${week.text}</h1></a></td>
            `; 
        });     
            
    html += `
    </tr>
    </table>
    
    <a href="/leaderboard"><h1>LEADERBOARD</h1></a>
    </div>
    </body>
    </html>
    `;
    

    
    return html;
});

module.exports.main_view = main_view;