const board_view = (data) => {
    let html = `
    <html>
    <style>
    body {
    background-image: url("https://static.clubs.nfl.com/image/private/t_editorial_landscape_12_desktop/dolphins/f3knfjv3uhmtmblle3vd");
    
    background-size: contain;
    }
    </style>
    
    <head><title>NFL-veikkaus</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
    </head>
    <body>
    < <div class="front">
        <form action="/login" method="POST">
            <input type="text" name="user_name">
            <button type="submit">Log in</button>
        </form>
        <form action="/register" method="POST">
            <input type="text" name="user_name">
            <button type="submit">Register</button>
        </form>
        <div>
    </body>
    <html>
    `;
    return html;
};

module.exports.board_view = board_view;