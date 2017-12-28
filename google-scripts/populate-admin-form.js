function populateAdminForm() {
    var postSubmissionForm = FormApp.openById('post submission form ID');
    var submissionFormCheckboxID = postSubmissionForm.getItemById('checkbox ID').asCheckboxItem();

    var postDeletionForm = FormApp.openById('post deletion form ID');
    var deletionFormCheckboxID = postDeletionForm.getItemById('checkbox ID').asCheckboxItem();

    var dataStorageSheet = SpreadsheetApp.getActive();
    var formSubmissionsSheet = dataStorageSheet.getSheetByName('Form Responses 1');

    var allRows = formSubmissionsSheet.getRange('A2:C').getValues();

    var anonPosts = [];

    for (var i = 0; i < allRows.length; i++) {
        if (allRows[i][0] != "") {
            anonPosts[i] = allRows[i][0] + " --- " + allRows[i][1];
        }
    }
    if (anonPosts.length < 1) {
        anonPosts = ['Nothing to review'];
    }
    submissionFormCheckboxID.setChoiceValues(anonPosts);
    deletionFormCheckboxID.setChoiceValues(anonPosts);
}
