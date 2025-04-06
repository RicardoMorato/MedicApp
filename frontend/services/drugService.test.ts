import api from "./api";
import MockAdapter from "axios-mock-adapter";
import { checkDrugInteraction } from "./drugs.service";

describe("Drug Interaction Service", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(api);
  });

  afterEach(() => {
    mock.restore();
  });

  describe("checkDrugInteraction", () => {
    it("should return true when API call is successful", async () => {
      const drugs = ["Aspirin", "Ibuprofen"];
      mock.onPost("/interactions/").reply(200);

      const result = await checkDrugInteraction(drugs);
      expect(result).toBe(true);
    });

    it("should return false when API call fails", async () => {
      const drugs = ["Aspirin", "Ibuprofen"];
      mock.onPost("/interactions/").reply(404);

      const result = await checkDrugInteraction(drugs);
      expect(result).toBe(false);
    });

    it("should send correct payload to API", async () => {
      const drugs = ["Aspirin", "Ibuprofen"];
      mock.onPost("/interactions/").reply(200);

      await checkDrugInteraction(drugs);

      expect(mock.history.post.length).toBe(1);
      const request = mock.history.post[0];
      expect(JSON.parse(request.data)).toEqual({
        name_1: drugs[0],
        name_2: drugs[1],
      });
    });
  });
});
