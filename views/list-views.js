
const list_view = ((data) => {
    
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
        <form action="/games" method="POST">
        <input type="text" name="game">
        <button type="submit">Add game</button>
    </form>
    <form action="/add-weeks" method="POST">
        <input type="text" name="text">
        <button type="submit">Add weeks</button>
    </form>
        </div>
    </div>
    </body>
    <body>
    <hr>
    `;

       /*<div class="addlist"> 
       
       Add new list
        <form action="/add-list" method="POST">
            <input type="text" name="list">
            <button type="submit">Add list</button>
        </form>
        <form action="/games" method="POST">
        <input type="text" name="game">
        <button type="submit">Add game</button>
    </form>
    <form action="/add-weeks" method="POST">
        <input type="text" name="text">
        <button type="submit">Add weeks</button>
    </form>
        </div><hr>
        <br><br><br><br><br><br><br><br> */
    html += ` 
        <div class="saved">
        <h2>WEEKS:</h2>       
        <table>
        <tr>
    `;
     
    
   /*  data.lists.forEach((list) => {
        html += `
        
            <a href="/list/${list._id}"><h3>${list.text}</h3></a>
            <form action="delete-list" method="POST">
                <input type="hidden" name="list_id" value="${list._id}">
                <button type="submit">Delete list</button>
            </form>
          <div>}</div>
    
            `;
        }); 
         <form action="delete-list" method="POST">
                <input type="hidden" name="list_id" value="${week._id}">
                <button type="submit">Delete list</button>
            </form> */
      data.weeks.forEach((week) => {
        html += ` 
            <td><a href="/week/${week._id}"><h1>${week.text}</h1></a></td>
            `; 
        });     
            
    html += `
    </tr>
    </table>
    <form action="/leaderboard" method="POST">
    <input type="hidden" name="weeks" value="${data.weeks}">
    <input type="hidden" name="week_id" value="${data.weekid}">
        <button type="submit">Leaderboard</button>
    </form>
    <a href="/leaderboard"><h1>Board</h1></a>
    </div>
    </body>
    </html>
    `;
    

    
    return html;
});

module.exports.list_view = list_view;