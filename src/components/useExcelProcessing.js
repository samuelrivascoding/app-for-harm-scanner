import * as XLSX from 'xlsx';
import { setMatchedRows } from './reducer'; // Adjust the import path as needed
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useCallback } from 'react';


const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escapes characters with special meaning in regex
};

// Read and parse Excel file data

const useExcelProcessing = (textToCompare) => {
  const dispatch = useDispatch();
  const matchedRows = useSelector((state) => state.photo.matchedRows);

  const processExcelData = useCallback(async () => {

    const excelFileURL = '/Book%201.xlsx'; // Adjust relative path as needed

    try {

      const response = await fetch(excelFileURL);
      const blob = await response.blob();
      const reader = new FileReader();


      reader.onload = (e) => {
        const workbook = XLSX.read(e.target.result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const range = XLSX.utils.decode_range(worksheet['!ref']);
        const rowData = [];

        for (let R = range.s.r; R <= range.e.r; R++) {
          const cellValue1 = worksheet[XLSX.utils.encode_cell({ r: R, c: 0 })];
          const cellValue2 = worksheet[XLSX.utils.encode_cell({ r: R, c: 1 })];

          if (cellValue1 && cellValue2) {
            const keywords = cellValue1.v.split(",").map((keyword) => keyword.trim());
            const data = cellValue2.v;
            rowData.push({ keywords, data });
          }
        }

        const matchedRowsUpdate = [];

        rowData.forEach((row) => {
          const { keywords, data } = row;
          
          if (keywords.some(keyword => keyword.trim().toLowerCase() === textToCompare)) {
            matchedRowsUpdate.push({ keywords, data });
            console.log("Keyword matches:", keywords);
          }

        });

        if (matchedRowsUpdate.length > 0) {
          dispatch(setMatchedRows(matchedRowsUpdate));
        }

        console.log("All keywords matched! Excel processing complete");
      };

      reader.onerror = (err) => {
        console.error('FileReader error:', err);
      };

      reader.readAsBinaryString(blob);
    } catch (error) {
      console.error('Error reading Excel file:', error);
    }
  }, [dispatch, textToCompare]);

  useEffect(() => {
    processExcelData();
  }, [processExcelData]);

  return {
    matchedRows,
  };
};

export default useExcelProcessing;


/* import * as XLSX from 'xlsx';
import { setMatchedRows } from './actions'; // Adjust the import path as needed
import store from './store'; // Import the store correctly

const excelFileURL = '/Book%201.xlsx'; // Adjust relative path as needed


// Read and parse Excel file data
export const readExcel = async () => {
const workbook = await fetch(excelFileURL);
const blob = await response.blob();
const reader = new FileReader();


const range = XLSX.utils.decode_range(worksheet['!ref']);
const rowData = [];

for (let R = range.s.r; R <= range.e.r; R++) {
  const cellValue = worksheet[XLSX.utils.encode_cell({ r: R, c: 0 })].v|| '';
  const keywords = cellValue.split(",").map(keyword => keyword.trim());
  const data = worksheet[XLSX.utils.encode_cell({ r: R, c: 1 })].v|| '';
  rowData.push({ keywords, data });
}

return rowData;

};

// Compare text with keywords
export const compareTextWithKeywords = (text) => {
    const matchedRows = store.getState().matchedRows;
    const parsedData = readExcel();
    
    parsedData.forEach(row => {
        const { keywords, data } = row;
        const keywordRegex = new RegExp(keywords.join('|'), 'i');
    
        if (keywordRegex.test(text)) {
        store.dispatch(setMatchedRows([...matchedRows, { keywords, data }]));
        console.log("keyword matches ")
        }
    });
};

export default readExcel;

*/
