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

export const profileDefault = '17d6a1697e8dcda04bd6ea1d8977effa1620991309510.png'
export const subjectAreaDefault = '/fake_images/CS.jpg'
export const subjectDefault = '/fake_images/CS.jpg'