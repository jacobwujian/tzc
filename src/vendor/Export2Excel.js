/* eslint-disable */
require('script-loader!file-saver');
import XLSX from 'xlsx-style'

function generateArray(table) {
  let out = [];
  let rows = table.querySelectorAll('tr');
  let ranges = [];
  for (let R = 0; R < rows.length; ++R) {
    let outRow = [];
    let row = rows[R];
    let columns = row.querySelectorAll('td');
    for (let C = 0; C < columns.length; ++C) {
      let cell = columns[C];
      let colspan = cell.getAttribute('colspan');
      let rowspan = cell.getAttribute('rowspan');
      let cellValue = cell.innerText;
      if (cellValue !== "" && cellValue == +cellValue) cellValue = +cellValue;

      //Skip ranges
      ranges.forEach(function (range) {
        if (R >= range.s.r && R <= range.e.r && outRow.length >= range.s.c && outRow.length <= range.e.c) {
          for (let i = 0; i <= range.e.c - range.s.c; ++i) outRow.push(null);
        }
      });

      //Handle Row Span
      if (rowspan || colspan) {
        rowspan = rowspan || 1;
        colspan = colspan || 1;
        ranges.push({
          s: {
            r: R,
            c: outRow.length
          },
          e: {
            r: R + rowspan - 1,
            c: outRow.length + colspan - 1
          }
        });
      };

      //Handle Value
      outRow.push(cellValue !== "" ? cellValue : null);

      //Handle Colspan
      if (colspan)
        for (let k = 0; k < colspan - 1; ++k) outRow.push(null);
    }
    out.push(outRow);
  }
  return [out, ranges];
};

function datenum(v, date1904) {
  if (date1904) v += 1462;
  let epoch = Date.parse(v);
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}

/**
 *
 * @param data 导出数据
 * @param headerRow 表头占的行数
 */
function sheet_from_array_of_arrays(data, headerRow) {
  var ws = {};
  var range = {
    s: {
      c: 10000000,
      r: 10000000
    },
    e: {
      c: 0,
      r: 0
    }
  };
  for (let R = 0; R != data.length; ++R) {
    for (let C = 0; C != data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R;
      if (range.s.c > C) range.s.c = C;
      if (range.e.r < R) range.e.r = R;
      if (range.e.c < C) range.e.c = C;
      // 设置单元格数据以及样式
      let cell = {
        v: data[R][C],
        s: {
          font: { name: '微软雅黑' },
          alignment: { horizontal: "center", vertical: "center" }
        }
      };
      // 设置表头样式
      if (headerRow && R < headerRow) {
        cell.s = {
          alignment: { horizontal: "center", vertical: "center" },
          fill: { bgColor: { indexed: 64 }, fgColor: { rgb: "909399" } },
          font: { name: '微软雅黑', bold: false, italic: false, underline: false },
          border: {
            top: {
              style: 'thin',
              color: {rgb: 'A5A5A5'}
            },
            bottom: {
              style: 'thin',
              color: {rgb: 'A5A5A5'}
            },
            left: {
              style: 'thin',
              color: {rgb: 'A5A5A5'}
            },
            right: {
              style: 'thin',
              color: {rgb: 'A5A5A5'}
            }}
        }
      }
      if (cell.v == null) cell.v = '';
      let cell_ref = XLSX.utils.encode_cell({
        c: C,
        r: R
      });

      if (typeof cell.v === 'number') cell.t = 'n';
      else if (typeof cell.v === 'boolean') cell.t = 'b';
      else if (cell.v instanceof Date) {
        cell.t = 'n';
        cell.z = XLSX.SSF._table[14];
        cell.v = datenum(cell.v);
      } else cell.t = 's';

      ws[cell_ref] = cell;
    }
  }
  if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
  return ws;
}

function Workbook() {
  if (!(this instanceof Workbook)) return new Workbook();
  this.SheetNames = [];
  this.Sheets = {};
}

function s2ab(s) {
  let buf = new ArrayBuffer(s.length);
  let view = new Uint8Array(buf);
  for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}

export function export_table_to_excel(id) {
  let theTable = document.getElementById(id);
  let oo = generateArray(theTable);
  let ranges = oo[1];

  /* original data */
  let data = oo[0];
  let ws_name = "SheetJS";

  let wb = new Workbook(),
    ws = sheet_from_array_of_arrays(data);

  /* add ranges to worksheet */
  // ws['!cols'] = ['apple', 'banan'];
  ws['!merges'] = ranges;

  /* add worksheet to workbook */
  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws;

  let wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary'
  });

  saveAs(new Blob([s2ab(wbout)], {
    type: "application/octet-stream"
  }), "test.xlsx")
}

/**
 *
 * @param multiHeader 多表头
 * @param ws_names 页签（sheet）,默认:SheetJS
 * @param header 单表头
 * @param data 导出数据
 * @param filename 导出文件名称,默认: excel-list
 * @param merges 合并单元格（例如: ['A1:B1']）
 * @param autoWidth 单元格宽度, 默认:自动适应数据宽度
 * @param bookType 导出类型 默认: 'xlsx'
 */
export function export_json_to_excel({
  multiHeader = [],
  ws_names = ['SheetJS'],
  header,
  data,
  filename,
  merges = [],
  autoWidth = true,
  bookType=  'xlsx'
} = {}) {
  /* original data */
  filename = filename || 'excel-list'
  data = [...data]
  const wb = new Workbook()
  /* add worksheet to workbook */
  // wb.SheetNames.push(ws_name);
  ws_names.map((v, index) => {
    let headerRow = 0 // 表头占的行数
    if (header) {
      data[index].unshift(header);
      headerRow++
    }
    if (multiHeader.length !== 0) {
      for (let i = multiHeader[index].length-1; i > -1; i--) {
        data[index].unshift(multiHeader[index][i])
        headerRow++
      }
    }
    const ws = sheet_from_array_of_arrays(data[index], headerRow) // 获取页签
    if(merges.length > 0) {
      if (merges[index].length > 0) {
        if (!ws['!merges']) ws['!merges'] = [];
        merges[index].forEach(item => {
          ws['!merges'].push(XLSX.utils.decode_range(item))
        })
      }
    }
    if (autoWidth) {
      /*设置worksheet每列的最大宽度*/
      const colWidth = data[index].map(row => row.map(val => {
        /*先判断是否为null/undefined*/
        if (val == null) {
          return {
            'wch': 10
          };
        }
        /*再判断是否为中文*/
        else if (val.toString().charCodeAt(0) > 255) {
          return {
            'wch': val.toString().length * 2
          };
        } else {
          return {
            'wch': val.toString().length
          };
        }
      }))
      /*以第一行为初始值*/
      let result = colWidth[0];
      for (let i = 1; i < colWidth.length; i++) {
        for (let j = 0; j < colWidth[i].length; j++) {
          if (result[j]['wch'] < colWidth[i][j]['wch']) {
            result[j]['wch'] = colWidth[i][j]['wch'];
          }
        }
      }
      ws['!cols'] = result;
    }
    wb.SheetNames.push(v);
    wb.Sheets[v] = ws;
  })

  let wbout = XLSX.write(wb, {
    bookType: bookType,
    bookSST: false,
    type: 'binary'
  });
  saveAs(new Blob([s2ab(wbout)], {
    type: "application/octet-stream"
  }), `${filename}.${bookType}`);
}
