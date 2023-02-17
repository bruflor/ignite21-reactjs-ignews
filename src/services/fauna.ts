// import { Client } from "faunadb";
import faunadb from "faunadb";

export const fauna = new faunadb.Client({
  secret: process.env.FAUNADB_KEY as string,
});
