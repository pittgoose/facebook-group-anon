function postToTheFacebook(e) {
    var formResponses = e.response.getItemResponses();
    var moderatedPosts = formResponses[0].getResponse();
    var dataStorageSheet = SpreadsheetApp.openById('this is the ID of the Data Storage sheet');
    var memberPostsSheet = dataStorageSheet.getSheetByName('Form Responses 1');

    var facebookInfoSheet = dataStorageSheet.getSheetByName('Facebook Info');
    var userTokenCell = facebookInfoSheet.getRange(1, 2);
    var lastRefreshDateCell = facebookInfoSheet.getRange(2, 2);
    var appId = facebookInfoSheet.getRange(3, 2).getValue();
    var appSecret = facebookInfoSheet.getRange(4, 2).getValue();
    var groupId = facebookInfoSheet.getRange(5, 2).getValue();

    var tokenDate = Moment.moment(lastRefreshDateCell.getValue());
    var daysSinceLastToken = Moment.moment().diff(tokenDate, 'days');

    if (daysSinceLastToken > 45) {
        var response = UrlFetchApp.fetch('https://graph.facebook.com/v2.10/oauth/access_token?grant_type=fb_exchange_token&client_id=' + appId + '&client_secret=' + appSecret + '&fb_exchange_token=' + userTokenCell.getValue(), {method: 'get'});
        userTokenCell.setValue(JSON.parse(response).access_token);
        lastRefreshDateCell.setValue(Moment.moment().format())
    }

    var userToken = userTokenCell.getValue();

    // Do this for each post approved by the admins
    moderatedPosts.forEach(function (moderatedPost) {
        var postPieces = moderatedPost.split(' --- ');
        var subject = postPieces[0];
        var body = postPieces[1];
        var postMessage = "Anon Post: " + subject + "\n--------\n" + body;
        var options = {
            method: 'post',
            payload: {
                message: postMessage
            }
        };

        // Post to facebook
        var postResponse = UrlFetchApp.fetch('https://graph.facebook.com/v2.10/' + groupId + '/feed?access_token=' + userToken, options);

        // Delete the row from the approved topic
        var allRows = memberPostsSheet.getRange(2, 2, memberPostsSheet.getMaxRows() - 1, 1).getValues();
        var filledRows = [];

        for (var i = 0; i < allRows.length; i++) {
            if (allRows[i][0] != "") {
                filledRows[i] = allRows[i][0];
            }
        }

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
