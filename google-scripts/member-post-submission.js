function sendPostToModeratorEmail(formResponses) {
    var rawResponses = formResponses.response;
    var responseObjects = rawResponses.getItemResponses();
    var moderatorFormId = "you'll fill this in later";
    var dataStorageSheet = SpreadsheetApp.openById('this is the ID of the Data Storage sheet');
    var moderatorEmailsSheet = dataStorageSheet.getSheetByName('Moderator Emails');
    var moderatorEmailsColumn = moderatorEmailsSheet.getRange('A:A').getValues();
    var moderatorEmails = [];
    for (var i = 0; i < moderatorEmailsColumn.length; i++) {
        if (moderatorEmailsColumn[i][0] != "") {
            moderatorEmails[i] = moderatorEmailsColumn[i][0];
        }
    }

    var userInputs = {
        subject: responseObjects[0].getResponse().toString(),
        post: responseObjects[1].getResponse().toString()
    };

    MailApp.sendEmail(moderatorEmails.join(','), 'New Anon Post: ' + userInputs.subject,
        'Subject: ' + userInputs.subject + '\n\nPost:\n' + userInputs.post
        + '\n------\nLink to portal: https://goo.gl/forms/' + moderatorFormId);
}
