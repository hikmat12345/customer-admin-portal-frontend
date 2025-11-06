//TODO: Will be finalizing this logic later. Currently looking into the legacy code. Currently we are mainly focused on backend.

'use client';

import { useEffect, useRef, useState } from 'react';
import WorkflowLayout from 'workflow/WorkflowLayout.web';
import { useGetWorkflowRenderJson } from '@/hooks/useWorkflows';

const VeroxosSupportPage = () => {
  const WORKFLOW_ID = 762;
  const { data: renderData } = useGetWorkflowRenderJson(WORKFLOW_ID);
  const userToken =
    typeof document !== 'undefined'
      ? document.cookie
          .split('; ')
          .find((row) => row.startsWith('token='))
          ?.split('=')[1] || ''
      : '';
  const [dynamicComponent, setDynamicComponent] = useState<any>();

  useEffect(() => {
    if (renderData) setDynamicComponent(renderData);
  }, [renderData]);

  //@ts-ignore
  const ref = useRef<any>();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let isValid = ref.current?.isValidate();
    console.log(isValid,Object.keys(ref.current?._allRefs), 'isValid');
    // if (isValid) {
      let data: { [key: string]: any } = {};
      let allRefs = ref.current?._allRefs;
      Object.keys(allRefs).map((key) => {
        if (allRefs[key]) {
          // Assuming state is a property of the referenced object
          const stateValue = allRefs[key]?.state; // Optional chaining to handle null or undefined state
          if (stateValue && stateValue.value) {
            // stateValue is not null or undefined, you can access its properties
            data[key] = stateValue.value;
          } else {
            // Handle null or undefined stateValue
            console.log('State value is null or undefined');
          }
        } else {
          // Handle null or undefined array element
          console.log('Array element is null or undefined');
        }
      });

      console.log(data, 'data');
    // }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div style={{ marginTop: '10px' }}>
          <button
            style={{ marginLeft: '10px' }}
            onClick={() => {
              // eslint-disable-next-line no-restricted-syntax
              console.log(ref.current.getValue('16b3829b-404f-4743-9142-fd1ea48a0ba3'));
            }}
          >
            GetValue-Id
          </button>
          <button
            style={{ marginLeft: '10px' }}
            onClick={() => {
              // eslint-disable-next-line no-restricted-syntax
              console.log(ref.current.getValue());
            }}
          >
            GetValue-All
          </button>
          <button
            style={{ marginLeft: '10px' }}
            onClick={() => {
              console.log(ref.current.isValidate());
            }}
          >
            IsValidate
          </button>
          <button
            onClick={() => {
              ref.current.refreshOn({
                itemId: '16b3829b-404f-4743-9142-fd1ea48a0ba3',
                itemValue: ref.current.getValue(),
              });
            }}
          >
            RefreshNow-Id
          </button>
        </div>

        <div>
          <WorkflowLayout ref={ref} workflowId={WORKFLOW_ID} token={userToken} data={dynamicComponent} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default VeroxosSupportPage;
