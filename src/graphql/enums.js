  /* @flow */

import { GraphQLEnumType } from 'graphql';

export const DateFormats = new GraphQLEnumType({
  name: 'DateFormats',
  values: {
    DayMonthYearShort: { value: 'D-M-YY', description: 'D-M-YY' },
    DayMonthYearLong: { value: 'DD-MM-YYYY', description: 'DD-MM-YYYY' },
    YearMonthDayShort: { value: 'YY-M-D', description: 'YY-M-D' },
    YearMonthDayLong: { value: 'YYYY-MM-DD', description: 'YYYY-MM-DD' },
    YearDayMonthShort: { value: 'YY-D-M', description: 'YY-D-M' },
    YearDayMonthLong: { value: 'YYYY-DD-MM', description: 'YYYY-DD-MM' }
  }
});
