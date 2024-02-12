export interface LotteryTicketModel extends LotteryInput {
  id: string;
  createTime: number;
}

export interface LotteryInput {
  primaryNumbers: number[];
  secondaryNumbers: number[];
  manualSelection: {
    primary: number[];
    secondary: number[];
  };
}

// Example
// {
//   "manualSelection": {
//     "primary": [
//       34,
//       45
//     ],
//     "secondary": [],
//     "tertiary": []
//   },
//   "primary": [
//     17,
//     24,
//     34,
//     39,
//     42,
//     45
//   ],
//   "secondary": [
//     3
//   ],
//   "tertiary": [
//     28
//   ],
//   "hasSecondary": true,
//   "hasTertiary": true,
//   "isValid": true,
//   "favorite": false,
//   "id": "viking-normal-form29-1707560760846-row",
//   "formId": "viking-normal-form",
//   "rowSize": 6,
//   "secondaryRowSize": 1
// }
