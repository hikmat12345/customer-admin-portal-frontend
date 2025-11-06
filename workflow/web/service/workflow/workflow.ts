// @ts-nocheck
export const customEventName = 'workFlowEvent';

export function workFlowStore(id : string, title: string, displayValue: string, value: number) {
    window.sessionStorage.setItem(
        id,
        JSON.stringify({title, displayValue, value})
    );
    workflowTrigger(id, title, displayValue, value);
}

export function workflowTrigger(id : string, title : string, displayValue : string, value : number) {
    window.dispatchEvent(new CustomEvent(customEventName, {
        detail: { id, title, displayValue, value }
    }));
}

export function workFlowGet(id : string) {
    if (window.sessionStorage.getItem(id) == null) {
        return;
    } 
    return JSON.parse(window.sessionStorage.getItem(id));
}

export function workFlowSubscribe(callable : any) {
    console.log('workFlowSubscribe', callable);
    window.addEventListener(customEventName, callable);
}

export function workFlowSetRequiredItem(id : string, require : any) {
    require = require === '1';
    const PLACEHOLDER = 'MANDATORY_STATUS';
    let requiredMap : any = {};
    if (window.sessionStorage.getItem(PLACEHOLDER) !== null) {
        requiredMap = JSON.parse(window.sessionStorage.getItem(PLACEHOLDER));
    }
    requiredMap[id] = require;
    window.sessionStorage.setItem(
        PLACEHOLDER,
        JSON.stringify(requiredMap)
    );
}
