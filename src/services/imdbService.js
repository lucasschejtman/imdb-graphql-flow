/* @flow */

import rp from 'request-promise';

export const getImdbType = (id: string): Promise<JSONObject> => rp(`http://imdb.wemakesites.net/api/${id}`).then(res => JSON.parse(res).data);
