function removePostSubmissions(e) {
    var formResponses = e.response.getItemResponses();
    var moderatedPosts = formResponses[0].getResponse();
    var dataStorageSheet = SpreadsheetApp.openById('this is the ID of the Data Storage sheet');
    var memberPostsSheet = dataStorageSheet.getSheetByName('Form Responses 1');

    // Do this for each post approved by the admins
    moderatedPosts.forEach(function (moderatedPost) {
        var postPieces = moderatedPost.split(' --- ');
        var subject = postPieces[0];

        // Delete the row from the approved topic
        var allRows = memberPostsSheet.getRange(2, 2, memberPostsSheet.getMaxRows() - 1, 1).getValues();
        var filledRows = [];

        for (var i = 0; i < allRows.length; i++) {
            if (allRows[i][0] != "") {
                filledRows[i] = allRows[i][0];
            }
        }
        Logger.log(filledRows);

        filledRows.forEach(function (row, index) {
            Logger.log('subject: ' + ' .' + subject.trim() + '.');
            Logger.log('row: ' + ' .' + row.trim() + '.');
            Logger.log(' .' + subject.trim() + '.' == ' .' + row.trim() + '.');
            if (subject.trim() == row.trim()) {
                memberPostsSheet.deleteRow(index + 2)
            }
        });

    });
}
