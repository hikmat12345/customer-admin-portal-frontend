import React from 'react';

function TicketUpdateDescIframe({ description }: { description: string }) {
  const processDescription = (description: string): string => {
    const textParts = description.split('<iframe');
    let processedText = `<div class='email-header leading-2'>${textParts[0]}</div>`;

    if (textParts[1]) {
      const emailText = textParts[1].split('iframedoc.body.innerHTML = `')[1];
      if (emailText) {
        const modifiedText = emailText.replace(/<\/?img[^>]*>/g, '<p>');
        processedText += modifiedText.replace('`;', '').trim().replace(/,$/, '');
      }
    }

    return processedText;
  };

  const processedDescription = processDescription(description);

  return (
    <iframe
      title="Ticket Updated Iframe"
      width="100%"
      height="350"
      className="mt-9"
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
            .email-header {
                margin-bottom : 1rem ;
                font-family:Inter;
                font-weight:400;
                font-size:0.938rem;
                line-height:1.174rem;
            }    
            
        </style>
        ${processedDescription}
        </body></html>`}
    />
  );
}

export default TicketUpdateDescIframe;
