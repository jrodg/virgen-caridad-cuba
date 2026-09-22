import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  window.history.replaceState({}, "", "/");
  window.localStorage.removeItem("virgen.lang");
  window.localStorage.removeItem("virgen.about");
  window.localStorage.removeItem("virgen.donationSettings");
  window.sessionStorage.removeItem("virgen.admin");
});

test("renders the shrine title, Cuban flag, and donate links", () => {
  render(<App />);
  expect(
    screen.getByRole("heading", {
      name: /Mother of the Cuban people, star over the Bay of Nipe/i,
    })
  ).toBeInTheDocument();
  expect(screen.getByRole("img", { name: /flag of cuba/i })).toBeInTheDocument();
  expect(screen.getByRole("img", { name: /golden rose of el cobre/i })).toBeInTheDocument();
  expect(
    screen.getByRole("img", {
      name: /Original icon of the Golden Rose and the Basilica of El Cobre/i,
    })
  ).toBeInTheDocument();
  expect(
    screen.queryByRole("img", {
      name: /original image of Our Lady of Charity of El Cobre/i,
    })
  ).not.toBeInTheDocument();
  expect(screen.getAllByRole("link", { name: /^donate$/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole("link", { name: /who we are/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole("link", { name: /\(201\) 555-0161/ }).length).toBeGreaterThan(0);
  expect(screen.getByRole("button", { name: /open menu/i })).toBeInTheDocument();
  expect(screen.queryByRole("link", { name: /^admin$/i })).not.toBeInTheDocument();
});

test("translates the site to Spanish from the language dropdown", () => {
  render(<App />);
  fireEvent.change(screen.getAllByRole("combobox", { name: /language/i })[0], {
    target: { value: "es" },
  });
  expect(
    screen.getByRole("heading", {
      name: /Madre del pueblo Cubano, estrella sobre la bahía de Nipe/i,
    })
  ).toBeInTheDocument();
  expect(screen.getByRole("img", { name: /bandera de cuba/i })).toBeInTheDocument();
  expect(screen.getAllByRole("link", { name: /^donar$/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole("link", { name: /quiénes somos/i }).length).toBeGreaterThan(0);
  expect(screen.queryByRole("link", { name: /^admin$/i })).not.toBeInTheDocument();
});

test("opens who we are for the New Jersey confraternity", () => {
  render(<App />);
  fireEvent.click(screen.getAllByRole("link", { name: /^who we are$/i })[0]);
  expect(screen.getByRole("heading", { name: /our mission/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { level: 1, name: /Confraternity Of La Caridad del Cobre in New Jersey/i })).toBeInTheDocument();
});

test("paginates calendar events instead of listing every card at once", async () => {
  render(<App />);
  fireEvent.click(screen.getAllByRole("link", { name: /^calendar$/i })[0]);
  await waitFor(() => expect(screen.getByText(/7 events/i)).toBeInTheDocument());
  expect(screen.getByText(/page 1 of 3/i)).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /community rosary for cuba/i })).toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: /patronage anniversary/i })).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: /^next$/i }));
  expect(screen.getByText(/page 2 of 3/i)).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /patronage anniversary/i })).toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: /community rosary for cuba/i })).not.toBeInTheDocument();
});

test("admin can update and delete who we are content", () => {
  window.history.replaceState({}, "", "/admin/login");
  render(<App />);
  fireEvent.change(screen.getByLabelText(/username/i), {
    target: { value: "admin" },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "Cobre1612@NJ4LaCofradia2026" },
  });
  fireEvent.click(screen.getByRole("button", { name: /enter the desk/i }));
  fireEvent.click(screen.getByRole("tab", { name: /who we are/i }));
  fireEvent.change(
    screen.getByDisplayValue(/Confraternity Of La Caridad del Cobre in New Jersey/i),
    { target: { value: "Updated NJ Confraternity" } }
  );
  fireEvent.click(screen.getByRole("button", { name: /save who we are/i }));
  expect(screen.getByText(/who we are page saved/i)).toBeInTheDocument();
  fireEvent.click(screen.getAllByRole("button", { name: /^remove$/i })[0]);
  expect(screen.queryByText(/our mission/i)).not.toBeInTheDocument();
  fireEvent.click(screen.getAllByRole("link", { name: /^who we are$/i })[0]);
  expect(
    screen.getByRole("heading", { level: 1, name: /Updated NJ Confraternity/i })
  ).toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: /our mission/i })).not.toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /how we gather/i })).toBeInTheDocument();
});

test("admin can offer venmo and cash app on the donate page", async () => {
  const open = jest.fn();
  window.open = open;
  window.history.replaceState({}, "", "/admin/login");
  render(<App />);
  fireEvent.change(screen.getByLabelText(/username/i), {
    target: { value: "admin" },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "Cobre1612@NJ4LaCofradia2026" },
  });
  fireEvent.click(screen.getByRole("button", { name: /enter the desk/i }));
  fireEvent.click(screen.getByRole("tab", { name: /^donations$/i }));
  fireEvent.change(screen.getByLabelText(/venmo username or url/i), {
    target: { value: "@CachitaNJ" },
  });
  fireEvent.change(screen.getByLabelText(/cash app/i), {
    target: { value: "$cobre" },
  });
  fireEvent.click(screen.getByRole("button", { name: /save donation settings/i }));
  expect(screen.getByText(/donation settings saved/i)).toBeInTheDocument();
  fireEvent.click(screen.getAllByRole("link", { name: /^donate$/i })[0]);
  expect(screen.getByRole("group", { name: /give with/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /^venmo$/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /^cash app$/i })).toBeInTheDocument();
  expect(screen.queryByRole("button", { name: /^paypal$/i })).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: /^venmo$/i }));
  fireEvent.click(screen.getByRole("button", { name: /donate \$25/i }));
  expect(open).toHaveBeenCalledWith(
    expect.stringContaining("https://venmo.com/CachitaNJ"),
    "_blank",
    "noopener,noreferrer"
  );
  expect(screen.getByText(/your gift is received with charity/i)).toBeInTheDocument();
});
