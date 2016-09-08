/* @flow */

import { firstN } from '../../utils/collection';

export const id           = ({ id }: ImdbData): string => id;
export const type         = ({ type }: ImdbData): string => type;
export const title        = ({ title }: ImdbPersonData): string => title;
export const image        = ({ image }: ImdbPersonData): string => image;
export const mediaLinks   = ({ mediaLinks }: ImdbPersonData): [string] => mediaLinks;
export const occupation   = ({ occupation }: ImdbPersonData): [string] => occupation;
export const description  = ({ description }: ImdbPersonData): string => description;

// Signature should be - bottom line - but due to circular reference changed to mixed.
// Maybe change to a flow film declaration better instead of object literal ?
// filmography :: ImdbPersonData -> any -> [Film]
export const filmography  = ({ filmography }: ImdbPersonData, { first }: any): [mixed] => firstN(first, filmography);
