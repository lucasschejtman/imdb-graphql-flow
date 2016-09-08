/* @flow */

import { formatDate } from '../../utils/date';

export const year = ({ year }: Film, { format }: any): string => formatDate(year, format);
