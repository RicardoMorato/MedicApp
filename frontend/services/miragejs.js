import { createServer } from "miragejs"
import API_URL from "@/config/config";
import { utilDecodeToken } from "@/utils/utilDecodeToken";

async function getId() {
  const user_id = await utilDecodeToken()
  return user_id
}

export function initializeMirage() {
  async function getUserId() {
    const user_id = await utilDecodeToken()
    return user_id
  }
createServer({
  
  routes() {
  const NativeXMLHttpRequest = window.XMLHttpRequest;
  window.XMLHttpRequest = function () {
  const request = new NativeXMLHttpRequest();
  delete request.onloadend;
  return request;
};
    //permite a requisição passar pelo mirage, ou seja, ele não intercepta
    const user_id = getUserId()
    this.passthrough(`${API_URL}/users/login`)
    this.passthrough(`${API_URL}/users/signup`)
    this.passthrough(`${API_URL}/users/${user_id}/drugs/`)
    this.passthrough(`${API_URL}/medicament/search/`)
}})}
