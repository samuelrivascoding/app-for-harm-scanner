import XLSX from "xlsx";
import { setMatchedRows } from './actions';
import { store } from './store'; // Ensure the store is imported correctly

// Read and parse Excel file data
const workbook = XLSX.readFile("Book 1.xlsx");
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

const range = XLSX.utils.decode_range(worksheet['!ref']);
const rowData = [];

for (let R = range.s.r; R <= range.e.r; R++) {
  const cellValue = worksheet[XLSX.utils.encode_cell({ r: R, c: 0 })].v;
  const keywords = cellValue.split(",").map(keyword => keyword.trim());
  const data = worksheet[XLSX.utils.encode_cell({ r: R, c: 1 })].v;
  rowData.push({ keywords, data });
}

// Compare text with keywords
export const compareTextWithKeywords = (text) => {
  const matchedRows = store.getState().matchedRows;

  rowData.forEach(row => {
    const { keywords, data } = row;
    const keywordArray = keywords.join(',').split(',').map(keyword => keyword.trim());

    // Check if text contains any keyword from the array
    if (keywordArray.some(keyword => text.includes(keyword))) {
      store.dispatch(setMatchedRows([...matchedRows, { keywords, data }]));
    }
  });
};
