import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
} from "@testing-library/react-native";
import DrugInteractionScreen from "./index";
import {
  checkDrugInteraction,
  getInteractionDrugsList,
} from "@/services/drugs.service";

// Create properly typed mocks
const mockCheckDrugInteraction = checkDrugInteraction as jest.MockedFunction<
  typeof checkDrugInteraction
>;
const mockGetInteractionDrugsList =
  getInteractionDrugsList as jest.MockedFunction<
    typeof getInteractionDrugsList
  >;

// Mock the services
jest.mock("@/services/drugs.service", () => ({
  checkDrugInteraction: jest.fn(),
  getInteractionDrugsList: jest.fn(),
}));

// Mock expo fonts
jest.mock("expo-font", () => ({
  useFonts: jest.fn(),
}));
jest.mock("@expo-google-fonts/poppins", () => ({
  useFonts: jest.fn(),
  Poppins_300Light: "Poppins_300Light",
  Poppins_500Medium: "Poppins_500Medium",
  Poppins_600SemiBold: "Poppins_600SemiBold",
}));

// Mock expo-router navigation
jest.mock("expo-router", () => ({
  useNavigation: jest.fn(() => ({ navigate: jest.fn() })),
  SplashScreen: {
    hideAsync: jest.fn(),
  },
}));

// Mock assets
jest.mock("../../assets/icons/medicaments.png", () => "medicaments-image");
jest.mock("../../assets/icons/arrows-interaction.png", () => "arrows-image");

describe("DrugInteractionScreen", () => {
  const mockDrugsList = [
    { id: 1, name: "Paracetamol" },
    { id: 2, name: "Ibuprofen" },
    { id: 3, name: "Amoxicillin" },
  ];

  beforeEach(() => {
    // Mock font loading
    (require("expo-font").useFonts as jest.Mock).mockImplementation(() => [
      true,
      null,
    ]);
    (
      require("@expo-google-fonts/poppins").useFonts as jest.Mock
    ).mockImplementation(() => [true, null]);

    // Mock drugs list response
    mockGetInteractionDrugsList.mockResolvedValue(mockDrugsList);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", async () => {
    const { getByText } = render(<DrugInteractionScreen />);

    await waitFor(() => {
      expect(getByText("Verificar Interações")).toBeTruthy();
      expect(
        getByText(/Verifique se você pode tomar dois medicamentos/i)
      ).toBeTruthy();
      expect(getByText("simultaneamente")).toBeTruthy();
      expect(getByText("Verificar Interação")).toBeTruthy();
    });
  });

  it("loads drugs list on mount", async () => {
    render(<DrugInteractionScreen />);

    await waitFor(() => {
      expect(mockGetInteractionDrugsList).toHaveBeenCalledTimes(1);
    });
  });

  it("shows alert when checking interaction without selecting drugs", async () => {
    const Alert = require("react-native").Alert;
    const alertSpy = jest.spyOn(Alert, "alert").mockImplementation(() => {});

    const { getByText } = render(<DrugInteractionScreen />);

    const button = getByText("Verificar Interação");
    fireEvent.press(button);

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        "",
        "Por favor, selecione ambos os medicamentos."
      );
    });

    alertSpy.mockRestore();
  });

  it("displays disclaimer text", async () => {
    const { getByText } = render(<DrugInteractionScreen />);

    await waitFor(() => {
      const disclaimer = getByText(
        /Este aplicativo avalia interações medicamentosas/
      );
      expect(disclaimer).toBeTruthy();
    });
  });
});
