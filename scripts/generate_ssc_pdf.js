import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function generatePDF() {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Landscape A4: 842 x 595
  const W = 842;
  const H = 595;

  const p1Rows = [
    ["1", "Comptroller & Auditor General of India", "C&AG", "Assistant Accounts Officer (State Cadre)#", "Level-8", "Group B (Gazetted)", "YES", "253", "60", "28", "125", "38", "504", "0", "7", "3", "0", "1"],
    ["2", "Comptroller & Auditor General of India", "C&AG", "Assistant Audit Officer (State Cadre)*", "Level-8", "Group B (Gazetted)", "YES", "247", "63", "29", "125", "40", "504", "0", "7", "3", "0", "1"],
    ["3", "Comptroller & Auditor General of India", "C&AG", "Assistant Audit Officer (Central Cadre)", "Level-8", "Group B (Gazetted)", "YES", "210", "76", "38", "138", "51", "513", "0", "7", "7", "0", "7"],
    ["4", "Central Administrative Tribunal", "CAT", "Assistant / ASO", "Level-7", "Group B (Non Gazetted)", "YES", "3", "1", "0", "3", "1", "8", "0", "0", "0", "0", "0"],
    ["5", "Central Vigilance Commission", "CVC", "Assistant Section Officer (ASO)", "Level-7", "Group B (Non Gazetted)", "YES", "0", "0", "1", "0", "1", "2", "0", "0", "0", "0", "0"],
    ["6", "Ministry of Defence", "AFHQ", "Assistant Section Officer (ASO)", "Level-7", "Group B (Non Gazetted)", "YES", "25", "9", "2", "18", "5", "59", "0", "0", "0", "1", "1"],
    ["7", "Ministry of Finance", "CBDT", "Inspector Of Income Tax", "Level-7", "Group B (Non Gazetted)", "YES", "238", "102", "48", "158", "49", "595", "0", "11", "8", "5", "7"],
    ["8", "Ministry of Home Affairs", "IB", "Assistant Section Officer (ASO)", "Level-7", "Group B (Non Gazetted)", "YES", "29", "14", "2", "23", "10", "78", "0", "1", "1", "1", "0"],
    ["9", "Ministry of Personnel, PG & Pensions", "CBI", "Sub Inspector (CBI)", "Level-7", "Group B (Non Gazetted)", "YES", "1", "2", "0", "4", "0", "7", "0", "0", "0", "0", "0"],
    ["10", "Ministry of Personnel, PG & Pensions", "CSS (DoPT)", "Assistant Section Officer (ASO)", "Level-7", "Group B (Non Gazetted)", "YES", "268", "139", "70", "125", "66", "668", "0", "7", "6", "6", "7"],
    ["11", "Ministry of Labour & Employment", "EPFO", "Assistant Section Officer (ASO)", "Level-7", "Group B (Non Gazetted)", "YES", "40", "13", "6", "25", "9", "93", "0", "0", "0", "1", "0"],
    ["12", "Ministry of Railways", "Railway Board", "Assistant Section Officer (ASO)", "Level-7", "Group B (Non Gazetted)", "YES", "17", "4", "2", "11", "2", "36", "0", "0", "2", "1", "0"],
    ["13", "Ministry of Finance", "CBIC", "Inspector (Central Excise)", "Level-7", "Group B (Non Gazetted)", "NO", "908", "431", "172", "634", "221", "2366", "0", "28", "39", "27", "26"],
    ["14", "Ministry of Communications", "Dept of Posts", "Inspector Of Posts", "Level-7", "Group B (Non Gazetted)", "YES", "7", "3", "1", "5", "3", "19", "0", "0", "0", "0", "0"],
    ["15", "National Human Rights Commission", "NHRC", "Assistant Section Officer (ASO)", "Level-7", "Group B (Non Gazetted)", "NO", "10", "2", "1", "5", "1", "19", "0", "0", "0", "0", "0"],
    ["16", "Ministry of Electronics & IT", "MeitY", "Assistant Section Officer (ASO)", "Level-7", "Group B (Non Gazetted)", "YES", "1", "0", "0", "1", "1", "3", "0", "0", "0", "0", "0"],
    ["17", "Ministry of External Affairs", "MEA", "Assistant Section Officer (ASO)", "Level-7", "Group B (Non Gazetted)", "YES", "14", "7", "1", "6", "3", "31", "0", "0", "0", "0", "1"],
    ["18", "Ministry of Finance", "ED", "Assistant Enforcement Officer", "Level-7", "Group B (Non Gazetted)", "NO", "10", "7", "6", "0", "0", "23", "0", "0", "0", "0", "0"],
    ["19", "Ministry of Finance", "CBIC", "Inspector (Examiner)", "Level-7", "Group B (Non Gazetted)", "NO", "20", "10", "3", "6", "3", "42", "0", "0", "0", "1", "1"],
    ["20", "Ministry of Finance", "CBIC", "Inspector (Preventive Officer)", "Level-7", "Group B (Non Gazetted)", "NO", "54", "23", "8", "10", "3", "98", "0", "0", "1", "1", "0"],
    ["21", "Election Commission of India", "ECI", "Assistant Section Officer (ASO)", "Level-7", "Group B (Non Gazetted)", "YES", "0", "1", "1", "0", "0", "2", "0", "0", "0", "0", "0"],
    ["22", "Ministry of Corporate Affairs", "NCLT", "Assistant grade pay(4200)", "Level-6", "Group B (Non Gazetted)", "YES", "3", "0", "1", "0", "1", "5", "0", "0", "0", "1", "0"],
    ["23", "Ministry of Finance", "CBDT", "Office Superintendent", "Level-6", "Group B (Non Gazetted)", "YES", "180", "64", "33", "110", "39", "426", "0", "4", "4", "5", "5"],
    ["24", "Ministry of Home Affairs", "RGI / Census", "Statistical Investigator Gr-II", "Level-6", "Group B (Non Gazetted)", "NO", "13", "0", "11", "19", "5", "48", "0", "0", "7", "5", "7"],
    ["25", "Ministry of Home Affairs", "NCB", "Sub-Inspector / JIO (NCB)", "Level-6", "Group B (Non Gazetted)", "YES", "6", "0", "2", "1", "0", "9", "0", "0", "0", "0", "0"],
    ["26", "Ministry of Home Affairs", "NCB", "Assistant grade pay(4200)", "Level-6", "Group B (Non Gazetted)", "YES", "2", "0", "0", "1", "0", "3", "0", "0", "0", "0", "0"]
  ];

  const p2Rows = [
    ["27", "Ministry of Statistics & PI", "MoSPI", "Junior Statistical Officer", "Level-6", "Group B (Non Gazetted)", "YES", "48", "38", "10", "53", "9", "158", "0", "1", "1", "3", "8"],
    ["28", "Ministry of Earth Sciences", "IMD", "Assistant grade pay(4200)", "Level-6", "Group B (Non Gazetted)", "YES", "3", "2", "0", "4", "0", "9", "0", "0", "0", "0", "0"],
    ["29", "Ministry of Finance", "ED", "Assistant grade pay(4200)", "Level-6", "Group B (Non Gazetted)", "YES", "4", "0", "0", "2", "0", "6", "0", "0", "0", "0", "0"],
    ["30", "Ministry of Finance", "CBIC", "Executive Assistant", "Level-6", "Group B (Non Gazetted)", "YES", "147", "54", "25", "87", "27", "340", "0", "5", "4", "4", "1"],
    ["31", "Ministry of Textiles", "Ministry of Textiles", "Assistant grade pay(4200)", "Level-6", "Group B (Non Gazetted)", "YES", "1", "0", "0", "0", "0", "1", "0", "0", "0", "0", "0"],
    ["32", "Comptroller & Auditor General", "C&AG", "Accountant", "Level-5", "Group C (Non Technical)", "YES", "162", "59", "29", "106", "40", "396", "40", "6", "5", "0", "5"],
    ["33", "Ministry of Communications", "DoT (CGCA)", "Accountant / Jr. Accountant", "Level-5", "Group C (Non Technical)", "YES", "10", "3", "1", "11", "5", "30", "1", "0", "0", "0", "0"],
    ["34", "Ministry of Defence", "CGDA", "Auditor", "Level-5", "Group C (Non Technical)", "YES", "357", "131", "63", "236", "88", "875", "88", "9", "9", "9", "9"],
    ["35", "Ministry of Finance", "CGA", "Accountant", "Level-5", "Group C (Non Technical)", "YES", "94", "27", "13", "57", "12", "203", "7", "1", "1", "0", "1"],
    ["36", "Ministry of Home Affairs", "IB", "Junior Accountant", "Level-5", "Group C (Non Technical)", "YES", "5", "2", "1", "2", "1", "11", "1", "0", "0", "1", "0"],
    ["37", "Ministry of Communications", "Postal Accounts", "Accountant / Jr. Accountant", "Level-5", "Group C (Non Technical)", "YES", "14", "3", "2", "9", "4", "32", "7", "1", "0", "1", "0"],
    ["38", "Ministry of Defence", "BRO", "Upper Division Clerk (UDC)", "Level-4", "Group C (Non Technical)", "NO", "25", "2", "3", "6", "0", "36", "5", "1", "0", "0", "0"],
    ["39", "Ministry of Defence", "DGDE", "UDC / Senior Sec. Assistant", "Level-4", "Group C (Non Technical)", "YES", "25", "9", "5", "16", "6", "61", "6", "1", "0", "0", "0"],
    ["40", "Ministry of Finance", "CBDT", "Tax Assistant", "Level-4", "Group C (Non Technical)", "YES", "545", "210", "116", "362", "167", "1400", "146", "13", "16", "17", "11"],
    ["41", "Ministry of Finance", "CESTAT", "Upper Division Clerk (UDC)", "Level-4", "Group C (Non Technical)", "YES", "0", "1", "0", "2", "0", "3", "0", "0", "0", "0", "0"],
    ["42", "Ministry of Finance", "CBN", "Upper Division Clerk (UDC)", "Level-4", "Group C (Non Technical)", "YES", "0", "0", "0", "1", "0", "1", "0", "0", "0", "0", "0"],
    ["43", "Ministry of Finance", "CBN", "Sub Inspector", "Level-4", "Group C (Non Technical)", "NO", "3", "0", "2", "0", "0", "5", "0", "0", "0", "0", "0"],
    ["44", "Ministry of Fisheries, AH & Dairying", "Dept of Fisheries", "Upper Division Clerk (UDC)", "Level-4", "Group C (Non Technical)", "NO", "1", "0", "0", "1", "0", "2", "0", "0", "0", "0", "0"],
    ["45", "Ministry of Health & Family Welfare", "DGHS", "UDC / Senior Sec. Assistant", "Level-4", "Group C (Non Technical)", "YES", "14", "1", "0", "2", "0", "17", "0", "0", "0", "2", "0"],
    ["46", "Ministry of Home Affairs", "NCB", "Upper Division Clerk (UDC)", "Level-4", "Group C (Non Technical)", "YES", "2", "0", "0", "0", "0", "2", "0", "0", "1", "1", "0"],
    ["47", "Ministry of Jal Shakti", "Water Resources", "Upper Division Clerk (UDC)", "Level-4", "Group C (Non Technical)", "YES", "7", "0", "1", "0", "0", "8", "0", "0", "0", "0", "0"],
    ["48", "Ministry of MSME", "DC MSME", "Upper Division Clerk (UDC)", "Level-4", "Group C (Non Technical)", "YES", "17", "5", "3", "13", "6", "44", "4", "1", "0", "0", "0"],
    ["49", "Ministry of Science & Tech", "DST", "UDC / Senior Sec. Assistant", "Level-4", "Group C (Non Technical)", "YES", "9", "4", "2", "7", "3", "25", "3", "1", "0", "0", "0"],
    ["50", "Ministry of Finance", "CBIC", "Tax Assistant", "Level-4", "Group C (Non Technical)", "YES", "320", "130", "58", "232", "101", "841", "59", "10", "17", "5", "4"],
    ["51", "Ministry of Fisheries, AH & D", "Animal Husbandry", "Upper Division Clerk (UDC)", "Level-4", "Group C (Non Technical)", "YES", "4", "0", "0", "1", "0", "5", "1", "0", "1", "1", "0"],
    ["52", "Ministry of Consumer Affairs", "Consumer Affairs", "Upper Division Clerk (UDC)", "Level-4", "Group C (Non Technical)", "YES", "4", "0", "0", "1", "0", "5", "0", "0", "0", "0", "0"],
    ["53", "Ministry of Earth Sciences", "IMD", "UDC / Senior Sec. Assistant", "Level-4", "Group C (Non Technical)", "YES", "4", "0", "1", "2", "4", "11", "1", "0", "0", "0", "1"],
    ["54", "National Human Rights Commission", "NHRC", "Accountant / Jr. Accountant", "Level-4", "Group C (Non Technical)", "NO", "3", "0", "0", "0", "0", "3", "0", "0", "0", "0", "0"]
  ];

  const p3Rows = [
    ["55", "Ministry of Textiles", "Ministry of Textiles", "UDC / Senior Sec. Assistant", "Level-4", "Group C (Non Technical)", "YES", "4", "0", "1", "0", "0", "5", "0", "0", "0", "0", "0"],
    ["56", "Ministry of Mines", "Ministry of Mines", "Upper Division Clerk (UDC)", "Level-4", "Group C (Non Technical)", "YES", "6", "0", "0", "3", "0", "9", "2", "0", "1", "0", "0"],
    ["57", "Ministry of Personnel, PG & Pensions", "CIC", "UDC / Senior Sec. Assistant", "Level-4", "Group C (Non Technical)", "NO", "2", "1", "1", "0", "1", "5", "0", "0", "0", "0", "0"],
    ["58", "Ministry of Housing & Urban Affairs", "MoHUA", "UDC / Senior Sec. Assistant", "Level-4", "Group C (Non Technical)", "YES", "4", "2", "1", "3", "1", "11", "1", "0", "0", "0", "0"],
    ["59", "Ministry of Agriculture & FW", "Dept of Agriculture", "UDC / Senior Sec. Assistant", "Level-4", "Group C (Non Technical)", "YES", "9", "0", "0", "0", "1", "10", "1", "0", "1", "0", "1"],
  ];

  const colWidths = [20, 115, 75, 140, 38, 95, 30, 26, 22, 22, 26, 24, 34, 25, 20, 20, 20, 28];
  const headers = ["S.No", "Ministry Name", "Department", "Post Name", "Pay", "Classification", "CB", "UR", "SC", "ST", "OBC", "EWS", "Total", "ESM", "OH", "HH", "VH", "PWD"];

  function drawTablePage(rows, pageNum, totalPages, isLastP3 = false) {
    const page = pdfDoc.addPage([W, H]);
    
    // Top banner
    page.drawText("STATE WISE/ZONE WISE VACANCIES ARE NOT COLLECTED BY SSC. PLEASE CONTACT USER DEPARTMENTS FOR STATE WISE/ZONE WISE VACANCIES.", {
      x: 30,
      y: H - 25,
      size: 7.5,
      font: fontBold,
      color: rgb(0.8, 0.1, 0.1),
    });

    page.drawText("TENTATIVE VACANCIES FOR COMBINED GRADUATE LEVEL EXAMINATION, 2026 (as on 24.09.2026)", {
      x: 30,
      y: H - 40,
      size: 11,
      font: fontBold,
      color: rgb(0.1, 0.1, 0.6),
    });

    let startY = H - 65;
    const rowH = 15;

    // Header Background
    page.drawRectangle({
      x: 30,
      y: startY - rowH + 4,
      width: W - 60,
      height: rowH + 2,
      color: rgb(0.9, 0.93, 0.98),
      borderColor: rgb(0.6, 0.7, 0.85),
      borderWidth: 0.5,
    });

    // Draw header text
    let currX = 32;
    headers.forEach((h, idx) => {
      page.drawText(h, {
        x: currX,
        y: startY - 7,
        size: 7,
        font: fontBold,
        color: rgb(0.1, 0.2, 0.4),
      });
      currX += colWidths[idx];
    });

    startY -= rowH;

    // Draw rows
    rows.forEach((row, rIdx) => {
      const y = startY - rIdx * rowH;
      
      // Zebra stripe
      if (rIdx % 2 === 1) {
        page.drawRectangle({
          x: 30,
          y: y - 2,
          width: W - 60,
          height: rowH,
          color: rgb(0.97, 0.98, 1.0),
        });
      }

      // Border line
      page.drawLine({
        start: { x: 30, y: y - 2 },
        end: { x: W - 30, y: y - 2 },
        thickness: 0.3,
        color: rgb(0.85, 0.85, 0.85),
      });

      let cX = 32;
      row.forEach((val, cIdx) => {
        const text = String(val);
        // Truncate if too long
        const maxLen = cIdx === 1 ? 26 : cIdx === 3 ? 30 : 20;
        const dispText = text.length > maxLen ? text.substring(0, maxLen - 1) + "…" : text;
        
        page.drawText(dispText, {
          x: cX,
          y: y + 2,
          size: 6.5,
          font: cIdx === 12 ? fontBold : font,
          color: cIdx === 12 ? rgb(0.8, 0.2, 0.1) : rgb(0.1, 0.1, 0.1),
        });
        cX += colWidths[cIdx];
      });
    });

    if (isLastP3) {
      const totalY = startY - rows.length * rowH - 10;
      page.drawRectangle({
        x: 30,
        y: totalY - 4,
        width: W - 60,
        height: 18,
        color: rgb(0.92, 0.96, 0.92),
        borderColor: rgb(0.2, 0.6, 0.2),
        borderWidth: 0.8,
      });

      page.drawText("TOTAL TENTATIVE VACANCIES: 10,731 (UR: 4412 | SC: 1715 | ST: 804 | OBC: 2772 | EWS: 1028 | ESM: 373 | PWD: 464)", {
        x: 40,
        y: totalY + 2,
        size: 9,
        font: fontBold,
        color: rgb(0.05, 0.45, 0.1),
      });

      page.drawText("* Language-wise bifurcation - Annexure 'A' (Assistant Audit Officer) on Page 4", {
        x: 40,
        y: totalY - 20,
        size: 8,
        font: font,
        color: rgb(0.3, 0.3, 0.3),
      });

      page.drawText("# Language-wise bifurcation - Annexure 'B' (Assistant Accounts Officer) on Page 5 & 6", {
        x: 40,
        y: totalY - 32,
        size: 8,
        font: font,
        color: rgb(0.3, 0.3, 0.3),
      });

      page.drawText("NOTE: FINAL VACANCIES MAY VARY FROM THE TENTATIVE VACANCIES.", {
        x: 40,
        y: totalY - 48,
        size: 8,
        font: fontBold,
        color: rgb(0.7, 0.1, 0.1),
      });
    }

    // Page footer
    page.drawText(`Page ${pageNum} of ${totalPages} • Staff Selection Commission (SSC CGL 2026)`, {
      x: W / 2 - 120,
      y: 15,
      size: 7.5,
      font: font,
      color: rgb(0.5, 0.5, 0.5),
    });
  }

  // Draw Page 1, 2, 3
  drawTablePage(p1Rows, 1, 6);
  drawTablePage(p2Rows, 2, 6);
  drawTablePage(p3Rows, 3, 6, true);

  // Annexure A: Portrait (595 x 842)
  const a4W = 595;
  const a4H = 842;

  const annexureARows = [
    ["Andhra Pradesh", "Telugu", "4", "2", "8", "2", "14", "30", "1", "0", "0"],
    ["Arunachal Pradesh", "English", "0", "0", "0", "0", "2", "2", "0", "0", "0"],
    ["Assam", "Assamese", "2", "1", "5", "1", "10", "19", "0", "0", "0"],
    ["Chhattisgarh", "Hindi", "2", "1", "4", "1", "8", "16", "0", "0", "0"],
    ["Goa", "Konkani", "1", "0", "2", "0", "5", "8", "0", "0", "0"],
    ["Gujarat", "Gujarati", "0", "0", "0", "0", "1", "1", "0", "0", "0"],
    ["Himachal Pradesh", "Hindi", "0", "0", "1", "0", "4", "5", "0", "0", "0"],
    ["Himachal Pradesh", "Hindi", "2", "1", "5", "1", "10", "19", "0", "0", "0"],
    ["Jammu & Kashmir", "Kashmiri/Dogri/Urdu/Hindi/English", "10", "5", "18", "6", "30", "69", "1", "1", "0"],
    ["Karnataka", "Kannada", "9", "4", "18", "6", "30", "67", "1", "1", "0"],
    ["Kerala", "Malayalam", "3", "1", "5", "2", "11", "22", "0", "0", "0"],
    ["Maharashtra", "Marathi", "4", "2", "8", "3", "16", "33", "1", "0", "0"],
    ["Manipur", "Manipuri/Meeteilon/English", "0", "0", "0", "0", "2", "2", "0", "0", "0"],
    ["Meghalaya", "English", "1", "0", "2", "1", "6", "10", "0", "0", "0"],
    ["Mizoram", "Mizo/English", "0", "0", "1", "0", "4", "5", "0", "0", "0"],
    ["Nagaland", "English", "0", "0", "0", "0", "2", "2", "0", "0", "0"],
    ["Punjab", "Punjabi", "1", "0", "2", "1", "6", "10", "0", "0", "0"],
    ["Rajasthan", "Hindi", "4", "2", "7", "2", "13", "28", "1", "0", "0"],
    ["Sikkim", "English/Nepali", "0", "0", "1", "0", "5", "6", "0", "0", "0"],
    ["Tamil Nadu", "Tamil", "16", "8", "29", "11", "46", "110", "2", "1", "1"],
    ["Telangana", "Telugu/Urdu", "1", "1", "3", "1", "8", "14", "0", "0", "0"],
    ["Tripura", "Bengali/Kokborok", "0", "0", "1", "0", "4", "5", "0", "0", "0"],
    ["Uttar Pradesh", "Hindi", "3", "1", "5", "2", "10", "21", "0", "0", "0"],
  ];

  function drawAnnexurePage(title, subtitle, rows, totals, pageNum, totalPages) {
    const page = pdfDoc.addPage([a4W, a4H]);

    page.drawText(title, {
      x: a4W / 2 - 50,
      y: a4H - 40,
      size: 11,
      font: fontBold,
      color: rgb(0.1, 0.1, 0.5),
    });

    page.drawText(subtitle, {
      x: 40,
      y: a4H - 60,
      size: 10,
      font: fontBold,
      color: rgb(0.2, 0.2, 0.2),
    });

    const headersA = ["State / Post", "Regional Language", "SC", "ST", "OBC", "EWS", "UR", "Total", "OH", "HH", "Others"];
    const colWA = [115, 120, 30, 30, 32, 32, 35, 40, 26, 26, 30];

    let startY = a4H - 85;
    const rowH = 17;

    page.drawRectangle({
      x: 35,
      y: startY - rowH + 4,
      width: a4W - 70,
      height: rowH + 2,
      color: rgb(0.92, 0.94, 0.98),
      borderColor: rgb(0.7, 0.75, 0.85),
      borderWidth: 0.5,
    });

    let currX = 40;
    headersA.forEach((h, idx) => {
      page.drawText(h, {
        x: currX,
        y: startY - 8,
        size: 7.5,
        font: fontBold,
        color: rgb(0.1, 0.2, 0.4),
      });
      currX += colWA[idx];
    });

    startY -= rowH;

    rows.forEach((r, idx) => {
      const y = startY - idx * rowH;
      if (idx % 2 === 1) {
        page.drawRectangle({
          x: 35,
          y: y - 2,
          width: a4W - 70,
          height: rowH,
          color: rgb(0.98, 0.98, 0.99),
        });
      }

      page.drawLine({
        start: { x: 35, y: y - 2 },
        end: { x: a4W - 35, y: y - 2 },
        thickness: 0.3,
        color: rgb(0.85, 0.85, 0.85),
      });

      let cX = 40;
      r.forEach((val, cIdx) => {
        const text = String(val);
        const maxLen = cIdx === 0 ? 18 : cIdx === 1 ? 22 : 10;
        const dispText = text.length > maxLen ? text.substring(0, maxLen - 1) + "…" : text;
        const isMaharashtra = r[0] === "Maharashtra";

        page.drawText(dispText, {
          x: cX,
          y: y + 3,
          size: 7.5,
          font: isMaharashtra ? fontBold : (cIdx === 7 ? fontBold : font),
          color: isMaharashtra ? rgb(0.8, 0.2, 0.1) : (cIdx === 7 ? rgb(0.1, 0.2, 0.6) : rgb(0.1, 0.1, 0.1)),
        });
        cX += colWA[cIdx];
      });
    });

    if (totals) {
      const totalY = startY - rows.length * rowH - 5;
      page.drawRectangle({
        x: 35,
        y: totalY - 3,
        width: a4W - 70,
        height: rowH + 2,
        color: rgb(0.92, 0.96, 0.92),
        borderColor: rgb(0.2, 0.6, 0.2),
        borderWidth: 0.8,
      });

      let cX = 40;
      totals.forEach((val, cIdx) => {
        page.drawText(String(val), {
          x: cX,
          y: totalY + 2,
          size: 8,
          font: fontBold,
          color: rgb(0.05, 0.45, 0.1),
        });
        cX += colWA[cIdx];
      });
    }

    page.drawText(`Page ${pageNum} of ${totalPages} • Staff Selection Commission (SSC CGL 2026)`, {
      x: a4W / 2 - 120,
      y: 20,
      size: 7.5,
      font: font,
      color: rgb(0.5, 0.5, 0.5),
    });
  }

  // Draw Annexure A (Page 4)
  drawAnnexurePage(
    "Annexure 'A'",
    "Assistant Audit Officer (State Cadre) - Category & Regional Language Vacancies",
    annexureARows,
    ["Total", "", "63", "29", "125", "40", "247", "504", "7", "3", "1"],
    4,
    6
  );

  // Annexure B rows Page 5
  const annexureBRowsP1 = [
    ["Andhra Pradesh", "Telugu", "1", "0", "2", "1", "7", "11", "0", "0", "0"],
    ["Arunachal Pradesh", "English", "0", "0", "0", "0", "2", "2", "0", "0", "0"],
    ["Assam", "Assamese", "3", "1", "6", "2", "12", "24", "0", "0", "0"],
    ["Chhattisgarh", "Hindi", "1", "0", "3", "1", "7", "12", "0", "0", "0"],
    ["Gujarat", "Gujarati", "3", "1", "6", "2", "11", "23", "0", "0", "0"],
    ["Himachal Pradesh", "Hindi", "2", "1", "4", "1", "8", "16", "0", "0", "0"],
    ["Himachal Pradesh", "Hindi", "1", "0", "3", "1", "8", "13", "0", "0", "0"],
    ["Jammu & Kashmir", "Kashmiri/Dogri/Urdu/Hindi/English", "4", "2", "8", "2", "14", "30", "1", "0", "0"],
    ["Jharkhand", "Hindi", "0", "0", "1", "0", "4", "5", "0", "0", "0"],
    ["Karnataka", "Kannada", "4", "2", "8", "3", "15", "32", "1", "0", "0"],
    ["Kerala", "Malayalam", "11", "6", "21", "7", "35", "80", "1", "1", "1"],
    ["Madhya Pradesh", "Hindi", "1", "1", "3", "1", "8", "14", "0", "0", "0"],
    ["Maharashtra", "Marathi", "8", "4", "15", "5", "26", "58", "1", "1", "0"],
    ["Manipur", "Manipuri/Meeteilon/English", "0", "0", "1", "0", "4", "5", "0", "0", "0"],
    ["Meghalaya", "English", "0", "0", "1", "0", "4", "5", "0", "0", "0"],
    ["Mizoram", "Mizo/English", "0", "0", "0", "0", "2", "2", "0", "0", "0"],
    ["Nagaland", "English", "0", "0", "0", "0", "3", "3", "0", "0", "0"],
    ["Odisha", "Odia", "4", "2", "8", "2", "14", "30", "1", "0", "0"],
    ["Rajasthan", "Hindi", "2", "1", "4", "1", "8", "16", "0", "0", "0"],
    ["Sikkim", "English/Nepali", "0", "0", "1", "0", "3", "4", "0", "0", "0"],
    ["Tamil Nadu", "Tamil", "8", "4", "15", "5", "27", "59", "1", "1", "0"],
  ];

  const annexureBRowsP2 = [
    ["Telangana", "Telugu/Urdu", "1", "0", "3", "1", "7", "12", "0", "0", "0"],
    ["Tripura", "Bengali/Kokborok", "1", "0", "2", "0", "5", "8", "0", "0", "0"],
    ["Uttar Pradesh", "Hindi", "5", "3", "10", "3", "19", "40", "1", "0", "0"],
  ];

  // Draw Annexure B Page 5
  drawAnnexurePage(
    "Annexure 'B'",
    "Assistant Accounts Officer (State Cadre) - Category & Regional Language Vacancies (Part 1)",
    annexureBRowsP1,
    null,
    5,
    6
  );

  // Draw Annexure B Page 6
  drawAnnexurePage(
    "Annexure 'B'",
    "Assistant Accounts Officer (State Cadre) - Category & Regional Language Vacancies (Part 2)",
    annexureBRowsP2,
    ["Total", "", "60", "28", "125", "38", "253", "504", "7", "3", "1"],
    6,
    6
  );

  const pdfBytes = await pdfDoc.save();
  
  const destPublic = path.resolve('public', 'documents', 'ssc_2026_tentative_vacancies.pdf');
  const destDist = path.resolve('dist', 'documents', 'ssc_2026_tentative_vacancies.pdf');

  fs.mkdirSync(path.dirname(destPublic), { recursive: true });
  fs.writeFileSync(destPublic, pdfBytes);
  console.log('Saved to', destPublic, '(', pdfBytes.length, 'bytes)');

  if (fs.existsSync('dist')) {
    fs.mkdirSync(path.dirname(destDist), { recursive: true });
    fs.writeFileSync(destDist, pdfBytes);
    console.log('Saved to', destDist);
  }
}

generatePDF().catch(console.error);
