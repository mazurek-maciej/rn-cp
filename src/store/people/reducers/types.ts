import { StatusOfAPICall } from "../../../services/StatusOfApiCall";
import { People } from "../models/People";

export interface PeopleState {
  status: StatusOfAPICall;
  data?: People;
  error?: string
}