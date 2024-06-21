export const jsonObject = {
  "bf558674-ab85-46ba-806f-bb7188eb9c10": {
        "id": "bf558674-ab85-46ba-806f-bb7188eb9c10",
        "type": "SearchService",
        "title": "Search Service",
        "order": "1",
        "group": "0",
        "tag": "",
        "properties": {
            "ServiceType": {
                "value": "0",
                "display": "All"
            },
            "placerHolder": {
                "value": "",
                "display": ""
            },
            "account": {
                "value": "",
                "display": ""
            },
            "queryService": {
                "value": "1",
                "display": "Yes"
            },
            "terminatedServices": {
                "value": "0",
                "display": "No"
            },
            "includeVIPUser": {
                "value": "0",
                "display": "No"
            },
            "searchBy": {
                "value": [],
                "display": ""
            },
            "MANDATORY_STATUS": {
                "value": "1",
                "display": "Yes"
            }
        }
    },
    "bdc7c919-4aef-40d4-bb44-19174c6b0af2": {
        "id": "bdc7c919-4aef-40d4-bb44-19174c6b0af2",
        "type": "InputBox",
        "title": "Enter some text",
        "order": "1",
        "group": "0",
        "tag": "",
        "properties": {
            "placerHolder": {
                "value": "",
                "display": ""
            },
            "MANDATORY_STATUS": {
                "value": "1",
                "display": "Yes"
            }
        }
    },
    "3751e4bf-a6a1-4768-bc3d-3b2cb83d0cd3": {
        "id": "3751e4bf-a6a1-4768-bc3d-3b2cb83d0cd3",
        "type": "Textarea",
        "title": "Some more text",
        "order": "2",
        "group": "0",
        "tag": "",
        "properties": {
            "placerHolder": {
                "value": "",
                "display": ""
            },
            "MANDATORY_STATUS": {
                "value": "1",
                "display": "Yes"
            }
        }
    },
    "02e0732f-79ff-4b27-9dca-4804266e1800": {
        "id": "02e0732f-79ff-4b27-9dca-4804266e1800",
        "type": "ServiceSuspend",
        "title": "Suspend Service",
        "order": "4",
        "group": "0",
        "tag": "",
        "properties": {
            "ServiceSelector": {
                "value": "bf558674-ab85-46ba-806f-bb7188eb9c10",
                "display": "bf558674-ab85-46ba-806f-bb7188eb9c10: Search Service"
            }
        }
    },
    "eeb415a6-c36f-4ac5-acd2-f47f6c38bea4": {
        "id": "eeb415a6-c36f-4ac5-acd2-f47f6c38bea4",
        "type": "ServiceInfo",
        "title": "Service Info",
        "order": "5",
        "group": "0",
        "tag": "",
        "properties": {
            "ServiceSelector": {
                "value": "bf558674-ab85-46ba-806f-bb7188eb9c10",
                "display": "bf558674-ab85-46ba-806f-bb7188eb9c10: Search Service"
            },
            "showEmployeeInfo": {
                "value": "1",
                "display": "Yes"
            }
        }
    },
    "5b8a8164-3041-4c18-a168-d262adf86d14": {
        "id": "5b8a8164-3041-4c18-a168-d262adf86d14",
        "type": "Text",
        "title": "Text",
        "order": "6",
        "group": "0",
        "tag": "",
        "properties": {
            "text": {
                "value": "this is text",
                "display": "this is text"
            },
            "marginTop": {
                "value": "20",
                "display": "20"
            },
            "marginBelow": {
                "value": "20",
                "display": "20"
            },
            "backgroundColour": {
                "value": "0",
                "display": "No"
            },
            "collapsible": {
                "value": "0",
                "display": "No"
            },
            "padding": {
                "value": "5",
                "display": "5"
            },
            "rounding": {
                "value": "5",
                "display": "5"
            },
            "titleColourHex": {
                "value": "#2e78bc",
                "display": "#2e78bc"
            },
            "textColourHex": {
                "value": "#000000",
                "display": "#000000"
            },
            "backgroundColourHex": {
                "value": "#bfefff",
                "display": "#bfefff"
            },
            "borderColourHex": {
                "value": "#2e78bc",
                "display": "#2e78bc"
            }
        }
    }
  // API result
  // 'bf558674-ab85-46ba-806f-bb7188eb9c10': {
  //   'type': 'SearchService',
  //   'parentType': 'searchService',
  //   'title': 'Search Service',
  //   'order': '1',
  //   'group': '0',
  //   'mandatory': true,
  //   'refreshOn': ['bf558674-ab85-46ba-806f-bb7188eb9c10'],
  //   'render': [],
  //   'defaultValue': '',
  // },
  // 'bdc7c919-4aef-40d4-bb44-19174c6b0af2': {
  //   'type': 'InputBox',
  //   'parentType': 'inputBox',
  //   'title': 'Enter some text',
  //   'order': '1',
  //   'group': '0',
  //   'mandatory': true,
  //   'refreshOn': ['bdc7c919-4aef-40d4-bb44-19174c6b0af2'],
  //   'render': {
  //     'placeHolder': '',
  //     'multipleLine': false,
  //   },
  //   'defaultValue': '',
  // },
  // '3751e4bf-a6a1-4768-bc3d-3b2cb83d0cd3': {
  //   'type': 'Textarea',
  //   'parentType': 'inputBox',
  //   'title': 'Some more text',
  //   'order': '2',
  //   'group': '0',
  //   'mandatory': true,
  //   'refreshOn': [],
  //   'render': {
  //     'placeHolder': '',
  //     'multipleLine': true,
  //   },
  //   'defaultValue': '',
  // },
  // '02e0732f-79ff-4b27-9dca-4804266e1800': {
  //   'type': 'ServiceSuspend',
  //   'parentType': 'dropdown',
  //   'title': 'Suspend Service',
  //   'order': '4',
  //   'group': '0',
  //   'mandatory': true,
  //   'refreshOn': [],
  //   'render': {
  //     'items': {
  //       '0': 'No',
  //       '1': 'Yes',
  //     },
  //     'groups': false,
  //     'allowMultiple': false,
  //   },
  //   'defaultValue': '',
  // },
  // 'eeb415a6-c36f-4ac5-acd2-f47f6c38bea4': {
  //   'type': 'ServiceInfo',
  //   'parentType': 'serviceInfo',
  //   'title': 'Service Info',
  //   'order': '5',
  //   'group': '0',
  //   'mandatory': false,
  //   'refreshOn': ['bf558674-ab85-46ba-806f-bb7188eb9c10'],
  //   'render': {
  //     'showEmployeeInfo': true,
  //   },
  //   'defaultValue': '',
  // },
  // '5b8a8164-3041-4c18-a168-d262adf86d14': {
  //   'type': 'Text',
  //   'parentType': 'text',
  //   'title': 'Text',
  //   'order': '6',
  //   'group': '0',
  //   'mandatory': false,
  //   'refreshOn': [],
  //   'render': {
  //     'text': 'this is text',
  //     'textHexColour': '#000000',
  //     'textFontSize': 12,
  //     'backgroundHex': '#bfefff',
  //     'titleHexColour': '#2e78bc',
  //     'titleFontSize': 20,
  //   },
  //   'defaultValue': '',
  // }
};
