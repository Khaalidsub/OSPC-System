import { registerEnumType } from '@nestjs/graphql';
import { Days } from '@common/enums';

registerEnumType(Days, { name: 'Day' });

export type BookingDateType = {};
