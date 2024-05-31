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
                margin-top: 1.063rem;
            }
            body {
                font-family:Inter;
                font-weight:400;
                font-size:0.938rem;
                line-height:1.174rem;
            }
        </style>
        ${description}
        </body></html>`}
    ></iframe>
  );
};

export default TicketUpdateDescIframe;
