const TicketUpdateDescIframe = ({ description }: { description: string }) => {
  return (
    <iframe
      width="100%"
      height="350"
      srcDoc={`
        <html>
        <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
        </head>
        <body>
        <style>
            iframe {
                margin-top: 1.25rem;
            }
            body {
                font-family:Inter;
                font-weight:400;
                font-size:1.125rem;
                line-height:1.361rem;
            }
        </style>
        ${description}
        </body></html>`}
    ></iframe>
  );
};

export default TicketUpdateDescIframe;
