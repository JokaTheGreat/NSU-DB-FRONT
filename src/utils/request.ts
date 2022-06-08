import { API_SERVER } from "./properties";

export async function request(tableName: string) {
  const response = await fetch(API_SERVER + tableName);
  const data = await response.json();
  return data;
}
