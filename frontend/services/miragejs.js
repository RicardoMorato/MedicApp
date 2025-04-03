import { createServer } from "miragejs";
import API_URL from "@/config/config";
import { utilDecodeToken } from "@/utils/utilDecodeToken";

async function getId() {
  const user_id = await utilDecodeToken();
  return user_id;
}

export function initializeMirage() {

createServer({
  
  routes() {
  const NativeXMLHttpRequest = window.XMLHttpRequest;
  window.XMLHttpRequest = function () {
  const request = new NativeXMLHttpRequest();
  delete request.onloadend;
  return request;
};
    //permite a requisição passar pelo mirage, ou seja, ele não intercepta
      this.passthrough(`${API_URL}/users/login`);
      this.passthrough(`${API_URL}/users/signup`);
      getId().then((user_id) => {
        this.passthrough(`${API_URL}/users/${user_id}/drugs/`);
      });
      this.passthrough(`${API_URL}/medicament/search/`);
      this.passthrough(`${API_URL}/pharma/`);
      this.passthrough(`${API_URL}/interactions/`);
      
      getId().then((userId) => {
        this.passthrough(`${API_URL}/user/${userId}/medications/`);
      });
    },
  });
}
