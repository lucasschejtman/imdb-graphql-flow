/* @flow */

import express from 'express';

const add = (a : number, b : number) : number => {
  return a + b
};

const app = express();

app.get('/test', (req, res) => res.json(add(1,2)));

app.listen(9000, () => console.log('server started!'));
