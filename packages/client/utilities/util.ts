import { Day ,TopUp} from '__generated__/globalTypes';

export interface ISelectFieldValue {
  value: string;
  label: string;
}

export const days = [
  Day.monday,
  Day.tuesday,
  Day.wednesday,
  Day.thursday,
  Day.friday,
  Day.saturday,
  Day.sunday,
];
export const getCoinValue = (topup:TopUp,currency:string)=>{
  switch (topup) {
    case 'xsmall':
      return `5 ST (2 ${currency.toUpperCase()})`
    case 'small':
      return `10 ST (5 ${currency.toUpperCase()})`
    case 'medium':
      return `20 ST (9 ${currency.toUpperCase()})`
    case 'large':
      return `50 ST (20 ${currency.toUpperCase()})`
    case 'xlarge':
      return `75 ST (30 ${currency.toUpperCase()})`
    case 'xxlarge':
      return `100 ST (35 ${currency.toUpperCase()})`
  }
}