const login_view = () => {
    let html = `
    <html>
    <style>
    body {
    background-image: url("https://www.psdcovers.com/wp-content/uploads/2012/07/NFL-vector-logos-1024x772.jpg");
    
    background-size: contain;
    }
    </style>
    
    <head><title>Ostoslista</title>
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
}

module.exports.login_view = login_view;