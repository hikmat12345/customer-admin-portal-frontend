const TicketDescription = ({description} : {description : string}) => {
    return <div
    dangerouslySetInnerHTML={{
      __html: `
        <style>
          .green-text {
            font-weight: 600;
          }
          
          table {
            width: 100%;
            font-size: 0.813rem;
            line-height: 1.023rem;
          }

          td {
            padding : 7px 0px;
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
}

export default TicketDescription;