/* @flow */

import moment from 'moment';

const ImdbDateFormat: string = 'YYYY-MM-DD';

export const formatDate = (date:string, format: ?string): string => moment(date, ImdbDateFormat).format(format || ImdbDateFormat);
