import { days } from 'utilities/util';
import { ScheduleInputType, Day } from '__generated__/globalTypes';
// const initSchedule = (initial) => {
//   return initSchedule;
// };
export const initialSchedule = [
  ...days.map((day) => {
    return {
      day: day,
      time_start: 0,
      time_end: 1,
    };
  }),
] as ScheduleInputType[];

export enum ActionType {
  AddStart,
  AddEnd,
  RemoveStart,
  RemoveEnd,
  AddBulk,
}
export interface ScheduleAction {
  day: Day;
  payload: number | number[];
  type: ActionType;
}
export function ScheduleReducer(
  state: ScheduleInputType[],
  action: ScheduleAction,
) {
  console.log(action, state);
  switch (action.type) {
    case ActionType.AddStart:
      return [
        ...state.map((oneState) => {
          if (oneState.day === action.day && action.payload < oneState.time_end)
            // time start cannot be above time end
            return { ...oneState, time_start: action.payload };

          return oneState;
        }),
      ];
    case ActionType.AddEnd: // cannot be above 24
      return [
        ...state.map((oneState) => {
          if (oneState.day === action.day && action.payload <= 24)
            return { ...oneState, time_end: action.payload };

          return oneState;
        }),
      ];
    case ActionType.RemoveStart: // cannot be below 0
      return [
        ...state.map((oneState) => {
          if (oneState.day === action.day && action.payload > 0)
            return { ...oneState, time_start: action.payload };

          return oneState;
        }),
      ];
    case ActionType.RemoveEnd: // cannot be below time start
      return [
        ...state.map((oneState) => {
          if (
            oneState.day === action.day &&
            action.payload >= oneState.time_start
          )
            return { ...oneState, time_end: action.payload };

          return oneState;
        }),
      ];
    case ActionType.AddBulk:
      return [
        ...state.map((oneState) => {
          if (oneState.day === action.day)
            return {
              ...oneState,
              time_start: action.payload[0],
              time_end: action.payload[1],
            };

          return oneState;
        }),
      ];
    default:
      return state;
  }
}
