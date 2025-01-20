import { EventType } from "./eventType";

export interface FirestoreBaseQueryArgs {
  coll: string;
  method: "get" | "add" | "update" | "delete";
  data?: EventType;
  id?: string;
};
export interface ReturnDataType {
  id: string;
  title: string;
  start: Date | null | undefined |string;
  notes: string;
}
export type FirestoreBaseQueryResult =
  | ReturnDataType 
  | ReturnDataType[] 
  |  string ;
