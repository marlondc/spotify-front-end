const renderPage = appHtml => (
  `<!doctype html public="storage">
  <html lang="en">
    <head>
      <meta charset=utf-8/>
      <meta name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
      <title>Jisc UKf Access Management</title>
      <link rel=stylesheet href="/main.css">
      <link rel="shortcut icon" href="/favicon.ico" type="image/vnd.microsoft.icon">
    </head>
    <body>
      <div id=app>${appHtml}</div>
      <script src="/vendor-bundle.js"></script>
      <script src="/bundle.js"></script>
    </body>
  </html>`
);

export default renderPage;