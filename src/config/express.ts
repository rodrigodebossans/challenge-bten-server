import express from 'express';
import cors from 'cors';
import { pagination } from 'typeorm-pagination';

export default (app) => {
  // support application/json type post data
  app.use(express.json());
  // support application/x-www-form-urlencoded post data
  app.use(express.urlencoded({ extended: false }));
  // enable cors
  app.use(cors());
  // enable pagination
  app.use(pagination);
};