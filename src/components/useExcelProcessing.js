import * as XLSX from 'xlsx';

const useExcelProcessing = async (textToCompare) => {
  const excelFileURL = '/Book%201.xlsx'; // Adjust relative path as needed

  try {
    const response = await fetch(excelFileURL);
    const blob = await response.blob();
    const reader = new FileReader();

    const matchedRowsUpdate = new Promise((resolve, reject) => {
      reader.onload = (e) => {
        try {
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

          const matchedRows = [];

          rowData.forEach((row) => {
            const { keywords, data } = row;
            
            if (keywords.some(keyword => textToCompare.some(text => keyword.trim().toLowerCase() === text.toLowerCase()))) {
              matchedRows.push({ keywords, data });
              console.log("Keyword matches:", keywords);
            }
          });

          console.log("All keywords matched! Excel processing complete");
          resolve(matchedRows); // Resolve with matchedRows
        } catch (error) {
          reject(error); // Reject promise on error
        }
      };

      reader.onerror = (err) => {
        console.error('FileReader error:', err);
        reject(err); // Reject promise on FileReader error
      };

      reader.readAsBinaryString(blob);
    });

    return matchedRowsUpdate; // Return the promise
  } catch (error) {
    console.error('Error reading Excel file:', error);
    throw error; // Throw error to propagate it
  }
};

export default useExcelProcessing;
