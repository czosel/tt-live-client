import "whatwg-fetch";

const sourceColumns = [
  "Platz",
  "Mannschaft",
  "Spiele",
  "Siege",
  "Unentschieden",
  "Niederlagen",
  "SpielePlus",
  "SpieleMinus",
  // "SpieleDif",
  "PunktePlus",
  "PunkteMinus"
  // "PunkteDif"
];
const displayColumns = [
  { value: "Platz" },
  { value: "Mannschaft" },
  { value: "Spiele" },
  { label: "S", value: "Siege" },
  { label: "U", value: "Unentschieden" },
  { label: "N", value: "Niederlagen" },
  /*
	{
    label: "Spiele",
    value: row => `${row["SpielePlus"]}:${row["SpieleMinus"]}`
	},
	{ label: "+/-", value: "SpieleDif" },
	*/
  {
    label: "Punkte",
    value: row =>
      row["PunktePlus"] ? `${row["PunktePlus"]}:${row["PunkteMinus"]}` : "-"
  }
  //{ label: "+/-", value: "PunkteDif" }
];

function parse(xml) {
  const teams = [...xml.firstChild.querySelector("Content").children];
  return teams.map(team => {
    return sourceColumns.reduce((res, col) => {
      const node = team.querySelector(col);
      return { [col]: node ? node.innerHTML : "", ...res };
    }, {});
  });
}

function render(table, selector) {
  const html = `<thead>${renderHead()}</thead><tbody>${table
    .map(renderRow)
    .join("")}</tbody>`;
  document.querySelector(selector).innerHTML = html;
}

function renderRow(row) {
  const renderedCols = displayColumns
    .map(col => `<td>${renderValue(row, col)}</td>`)
    .join("");
  return `<tr>${renderedCols}</tr>`;
}

function renderValue(row, displayCol) {
  if (!displayCol.value || typeof displayCol.value === "string") {
    return row[displayCol.value];
  }
  return displayCol.value(row);
}

function renderHead() {
  const renderedCols = displayColumns
    .map(col => `<th>${col.label || col.value}</th>`)
    .join("");
  return `<tr>${renderedCols}</tr>`;
}

export function leagueTable(url, selector) {
  fetch(url)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
      const table = parse(data);
      render(table, selector);
    });
}
