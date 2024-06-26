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
