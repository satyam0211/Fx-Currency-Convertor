const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const fromFlag = document.getElementById("fromFlag");
const toFlag = document.getElementById("toFlag");
const resultDiv = document.getElementById("result");
const rateDiv = document.getElementById("rate");
const amountInput = document.getElementById("amount");
const updatedText = document.getElementById("updated");
const swapBtn = document.getElementById("swapBtn");

const state = {
  rates: {},
  base: "USD",
  lastUpdated: null,
};

const flagMap = {
  USD: "🇺🇸",
  EUR: "🇪🇺",
  GBP: "🇬🇧",
  JPY: "🇯🇵",
  AUD: "🇦🇺",
  CAD: "🇨🇦",
  INR: "🇮🇳",
  CNY: "🇨🇳",
  AED: "🇦🇪",
  BRL: "🇧🇷",
  ZAR: "🇿🇦",
  SGD: "🇸🇬",
  NZD: "🇳🇿",
  CHF: "🇨🇭",
  SEK: "🇸🇪",
  NOK: "🇳🇴",
  KRW: "🇰🇷",
  MXN: "🇲🇽",
};

const displayNames =
  typeof Intl !== "undefined" && Intl.DisplayNames
    ? new Intl.DisplayNames(["en"], { type: "currency" })
    : null;

function currencyLabel(code) {
  if (!displayNames) {
    return code;
  }
  const name = displayNames.of(code);
  return name ? `${code} — ${name}` : code;
}

function setFlag(el, code) {
  el.textContent = flagMap[code] || "🌍";
}

function renderOptions(codes) {
  fromCurrency.innerHTML = "";
  toCurrency.innerHTML = "";
  codes.forEach((code) => {
    const label = currencyLabel(code);
    fromCurrency.add(new Option(label, code));
    toCurrency.add(new Option(label, code));
  });
}

async function loadRates(base) {
  const response = await fetch(`https://open.er-api.com/v6/latest/${base}`);
  if (!response.ok) {
    throw new Error("Failed to load rates.");
  }
  const data = await response.json();
  if (!data || data.result !== "success") {
    throw new Error("Rate API error.");
  }
  state.rates = data.rates;
  state.base = data.base_code;
  state.lastUpdated = data.time_last_update_utc;
  return data;
}

function updateResult() {
  const amount = Number(amountInput.value || 0);
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const rate = state.rates[to];

  if (!rate || amount <= 0) {
    resultDiv.textContent = "—";
    rateDiv.textContent = "Choose currencies to convert.";
    return;
  }

  const converted = (amount * rate).toFixed(2);
  resultDiv.textContent = `${converted} ${to}`;
  rateDiv.textContent = `1 ${from} = ${rate.toFixed(4)} ${to}`;
}

async function handleConvert() {
  const from = fromCurrency.value;
  try {
    resultDiv.textContent = "Converting...";
    await loadRates(from);
    updateResult();
    setFlag(fromFlag, fromCurrency.value);
    setFlag(toFlag, toCurrency.value);
    if (state.lastUpdated) {
      updatedText.textContent = `Last updated: ${state.lastUpdated}`;
    }
  } catch (err) {
    resultDiv.textContent = "Unable to fetch rates.";
    rateDiv.textContent = "Please try again in a moment.";
  }
}

function setResponsiveClass() {
  const compact = window.innerWidth < 860;
  document.body.classList.toggle("is-compact", compact);
}

swapBtn.addEventListener("click", () => {
  const temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;
  setFlag(fromFlag, fromCurrency.value);
  setFlag(toFlag, toCurrency.value);
  handleConvert();
});

document.getElementById("convertBtn").addEventListener("click", handleConvert);
fromCurrency.addEventListener("change", handleConvert);
toCurrency.addEventListener("change", updateResult);
amountInput.addEventListener("input", updateResult);

window.addEventListener("resize", setResponsiveClass);

(async function init() {
  setResponsiveClass();
  try {
    const data = await loadRates("USD");
    const codes = Object.keys(data.rates).sort();
    if (!codes.includes("USD")) {
      codes.unshift("USD");
    }
    renderOptions(codes);
    fromCurrency.value = "USD";
    toCurrency.value = codes.includes("INR") ? "INR" : codes[1];
    setFlag(fromFlag, fromCurrency.value);
    setFlag(toFlag, toCurrency.value);
    updatedText.textContent = `Last updated: ${state.lastUpdated || "—"}`;
    updateResult();
  } catch (err) {
    renderOptions(["USD", "EUR", "INR"]);
    fromCurrency.value = "USD";
    toCurrency.value = "INR";
    resultDiv.textContent = "Unable to fetch rates.";
    rateDiv.textContent = "Check your internet connection.";
  }
})();
