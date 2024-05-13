'use client'

import { useEffect, useRef, useState } from "react";
import WorkflowLayout, {
	getWorkflowRequestTypesApiCall,
  } from '@veroxos/workflow/lib/src/index_web';
import { jsonObject } from './workflowdata';
  

const VeroxosSupportPage = () => {
  //console.log(JSON.stringify(jsonObject))
	const [dynamicComponent, setDynamicComponent] = useState(jsonObject);
	  //@ts-ignore
	  const ref = useRef();
    const userToken = 'fdgdgdgdgdgfdgfdf';

	  // useEffect(() => {
		// getWorkflowRequestTypesApiCall(
		//   	"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NTU4NzQzODgsImV4cCI6MTY1NjQ3OTE4OCwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoibmlrdW5qLnZhc2FuaUBzdGFibGVsb2dpYy5jb20ifQ.0RhTVOg6cYXgyw8dCR0C4flBhb18zCkIIbJLIhGV9msMU_ok0tFEJOaoBulImEjW8Jkun_2N1yiWrTei3HL7X_YrATx0f0SA7_BqOgSREzPxzmFU0zT9t5T2nmlaYYNgwe1vB8rTtqKxnhEIndLIPlwddAvt-I8CbFiGcQKJM_YTQAsPxX2_H2csORO2FZ8zd5Dip1AI5oUG4qKhpklLmUnmY28KghkiW6UShUNj8KmFMpTgAGacmBpzAzuctcVy-LVbEHGnexEEDaPkBVU7bq8Qt-u0HX9EEDNrkJL6T64cN13I4kI7-CjBR8erhd5aQn-EcTYVKRw4yXB7_dtRag",
		// 	362
		// ).then((resultData) => {
		//   // eslint-disable-next-line no-restricted-syntax
		//   //console.log(JSON.stringify(resultData?.data));
		//   setDynamicComponent(resultData?.data);
		// });
	  // }, []);
    
    const handleSubmit = (e) => {
      e.preventDefault();
      // Process form data here, e.g., send it to the server
      let isValid = ref.current.isValidate();
      if (isValid) {

        let values = ref.current.getValue();
        // let data = {};
        // Object.keys(values).map(key => {
        //   data = Object.assign({}, data, {
        //     [key]: values[key] ? values[key] : ''
        //   });
        // });

        console.log(values);
      }
      
    };

	return <div>
		{/* <div style={{ marginTop: "10px" }}>
        <button
          onClick={() => {
            ref.current.refreshNow();
          }}
        >
          RefreshNow-All
        </button>
        <button
          style={{ marginLeft: "10px" }}
          onClick={() => {
            // eslint-disable-next-line no-restricted-syntax
            console.log(ref.current.isValidate());
          }}
        >
          Validate-All
        </button>
        <button
          style={{ marginLeft: "10px" }}
          onClick={() => {
            ref.current.setValue({
              title: "Update from set value method by all",
              value: "Update from set value method by all",
            });
          }}
        >
          SetValue-All
        </button>
        <button
          style={{ marginLeft: "10px" }}
          onClick={() => {
            // eslint-disable-next-line no-restricted-syntax
            console.log(ref.current.getValue());
          }}
        >
          GetValue-All
        </button>
      </div> */}
    <form onSubmit={handleSubmit}>
      <div style={{ marginTop: "10px" }}>
          {/* <button
            onClick={() => {
              ref.current.refreshNow("af37fc63-0861-483b-ab30-e61294229077");
            }}
          >
            RefreshNow-Id
          </button>
          <button
            style={{ marginLeft: "10px" }}
            onClick={() => {
              // eslint-disable-next-line no-restricted-syntax
              console.log(
                ref.current.isValidate("af37fc63-0861-483b-ab30-e61294229077")
              );
            }}
          >
            Validate-Id
          </button> */}
          {/* <button
            style={{ marginLeft: "10px" }}
            onClick={() => {
              ref.current.setValue(
                {
                  title: "Update from set value method by all",
                  value: "Update from set value method by id",
                },
                "16b3829b-404f-4743-9142-fd1ea48a0ba3"
              );
            }}
          >
            SetValue-Id
          </button> */}
          <button
            style={{ marginLeft: "10px" }}
            onClick={() => {
              // eslint-disable-next-line no-restricted-syntax
              console.log(
                ref.current.getValue("16b3829b-404f-4743-9142-fd1ea48a0ba3")
              );
            }}
          >
            GetValue-Id
          </button>
          <button
            style={{ marginLeft: "10px" }}
            onClick={() => {
              // eslint-disable-next-line no-restricted-syntax
              console.log(ref.current.getValue());
            }}
          >
            GetValue-All
          </button>
          <button
            style={{ marginLeft: "10px" }}
            onClick={() => {
              console.log(ref.current.isValidate());
            }}
          >
            IsValidate
          </button>
          <button
            onClick={() => {
              ref.current.refreshOn(
                {
                  itemId: "16b3829b-404f-4743-9142-fd1ea48a0ba3",
                  itemValue: ref.current.getValue()
                });
            }}
          >
            RefreshNow-Id
          </button>
        </div>

      <div>
        <WorkflowLayout ref={ref} workflowId={362} token={userToken} data={dynamicComponent}/>
      </div>
      <button type="submit">Submit</button>
    </form>

	</div>
}

export default VeroxosSupportPage
