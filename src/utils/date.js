/* @flow */

import moment from 'moment';

export const formatDate = (date:string, fromFormat: string, toFormat: ?string): string => moment(date, fromFormat).format(toFormat || fromFormat);
