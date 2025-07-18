function doGet(e) {
  try {
    
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    var sheet = ss.getSheetByName('Registros'); 

    if (!sheet) { 
      sheet = ss.getSheets()[0];
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(['Nome de Entrada','Atividade', 'Hora de Entrada', 'Hora de Saída', 'Tempo Total', 'Data de Entrada', 'Data de Saída']);
      }
    } else {
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(['Nome de Entrada', Atividade, 'Hora de Entrada', 'Hora de Saída', 'Tempo Total', 'Data de Entrada', 'Data de Saída']);
      }
    }

    var nomeEntrada = e.parameter.nomeEntrada || '';
    var horaEntrada = e.parameter.horaEntrada || '';
    var horaSaida   = e.parameter.horaSaida   || '';
    var tempoTotal  = e.parameter.tempoTotal  || '';
    var dataEntrada = e.parameter.dataEntrada || '';
    var dataSaida   = e.parameter.dataSaida   || '';
    var atividade   = e.parameter.atividadeTipo || '';

    sheet.appendRow([nomeEntrada, atividade, horaEntrada, horaSaida, tempoTotal, dataEntrada, dataSaida]);
    
    Logger.log('Dados recebidos: ' + JSON.stringify(e.parameter));

    return ContentService.createTextOutput('SUCESSO! Dados para ' + nomeEntrada + ' adicionados à planilha.')
                         .setMimeType(ContentService.MimeType.TEXT);
  } catch (error) {
    Logger.log('ERRO no Apps Script: ' + error.toString() + ' Parâmetros recebidos: ' + JSON.stringify(e.parameter));

    return ContentService.createTextOutput('ERRO no Apps Script: ' + error.toString())
                         .setMimeType(ContentService.MimeType.TEXT);
  }
}
