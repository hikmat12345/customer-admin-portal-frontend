/* eslint-disable */

function TicketDescription({ description }: { description: string }) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
        <style>
          .green-text {
            font-weight: 600;
            width : 40% !important;
            color : #000000;
          }
          
          table {
            width: 100%;
            font-size: 0.813rem;
            line-height: 1.023rem;
          }

          td {
            padding : 7px;
            color : #575757;
          }
          
          a {
            color: blue;
            text-decoration: underline;
            cursor: pointer;
          }
          
          a:hover {
            color: darkblue;
            text-decoration: none;
          }
          
          a:active {
            color: red;
          }
          
          a:visited {
            color: purple;
          }
        </style>
        <table>${description}</table>`,
      }}
    />
  );
}

export default TicketDescription;
