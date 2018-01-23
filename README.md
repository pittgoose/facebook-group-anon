# facebook-group-anon
Code and guidelines for anonymous posting to a Facebook group using Google Drive.

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=T7B8GJUUWWGGE)

I'm not going to charge for this, but I did spend quite a bit of time on it and would love contributions. So please, [PWYW](https://en.wikipedia.org/wiki/Pay_what_you_want) ($5 recommended).

## Background and requirements
* You need to be an administrator of the Facebook group you are doing this for.
* Create a new Facebook account (we'll call it "Facebook Anon" from here on out) which will be solely used to make the anonymous posts. This account must be a group admin as well.
* Create a Google account which you will use for creating Google Drive spreadsheets and forms.

## Step by step
### 1: Create a Facebook app to integrate with your group
1. As Facebook Anon, create a new Facebook app using [this step-by-step guide](https://www.popwebdesign.net/how-to-create-facebook-app.html). 
    1. In step 3 (Choose platform) choose "website".
    1. In step 4 (Choose a name) do not choose the "Test App" option.
    1. In step 9 (App details) it asks for an App domain. I created a simple one-page website on [Heroku](https://www.heroku.com/). (Mine: [Anshei Chayil](https://anshei-chayil-anon.herokuapp.com/)). The code for this can be found at in the `heroku` directory of this project. It is deployed as a PHP app.
    1. Also in step 9, do not turn on "App Center Listed Platform".
1. When you've completed this you will need to gather a few things:
    1. App ID: On the main dashboard of your new Facebook app you will see your App ID listed at the top of the page. You will also see your App Secret (hidden). Make a note of both of these. 
    1. Go to the [developer access token tool](https://developers.facebook.com/tools/accesstoken/) and also make a note of your User Token.
    1. Lastly, find your Facebook group's Group ID by using this [third party lookup tool](http://lookup-id.com/#). Make a note of this as well. You will need all of it later.
    
### 2: Store your Facebook data in Google Drive
1. Log into Google Drive and create a new Sheet called 'Data Storage'.
1. Change the name of the first sheet to 'Facebook Info'.
1. Add the Facebook data to the sheet like this (replacing the cells in column B with the corresponding pieces of data you saved in step 1): 

#|A | B
--- | --- | ---
1 | User Token | `your user token`
2 | Last Refresh | 2016-12-10T11:31:45+02:00
3 | App ID | `your App ID`
4 | App Secret | `your App Secret`
5 | Group ID | `your Group Id`

(Just use the date I supplied for Last Refresh. It will automatically be updated anyway later on.)

### 3: Create a form for users to submit their anonymous posts
1. Add a new form called 'Anonymous Post Submission Form'. This URL is eventually shared with the members in your group.
1. Give the form whatever Form Title you wish.
1. Add a "short answer" question (I have "Please write a short subject line for your post" as the text, and I limited this field to 50 characters).
1. Add a "paragraph" question (I have "Please write your post here" and I limited it to 3000 characters to make the moderators job less hellish).
1. Switch to the 'Responses' tab and click the vertical three dots next to the green 'Create a spreadsheet' button. Choose 'Select response destination'.
1. Choose 'Select existing spreadsheet'.
1. Choose the 'Data Storage' sheet.
1. Finally, at the top right corner of the form, to the right of the "Send" button, click on the vertical three dots, and select "Script editor". This will take you to...

### 4: Create a script to send user submissions to moderators for moderation
1. In the script editor, replace all of the code in Code.gs file with the code found in `google-scripts/member-post-submission.js`.
1. There are 2 missing pieces of data here. You can access one of them now but the other needs to wait.
1. For the dataStorageSheet ID (line 5), you need to open the Data Storage sheet, and in the URL, take the section which comes after the `d/` and before the `/edit` segments of the URL (ex: `https://docs.google.com/spreadsheets/d/[your-id-is-this]/edit`).
1. Back in the Data Storage spreadsheet, add a new sheet called 'Moderator Emails'.
    1. Enter the email addresses of the moderators who would like to get notified when a new post is submitted. Each of these people will get an email whenever someone submits a post.
1. Leave this script open, and proceed to... 

### 5: Create 2 forms where admins can moderate submissions
1. Add a new form called 'Moderator Post Submission Form' and another form called 'Moderator Post Deletion Form'. These forms MUST be kept private. They are technically publicly accessible links, but should be kept to moderator use only.
1. For both of these forms:
    1. Add a single "Checkboxes" field and don't give it any values. Call it whatever you'd like (I used "Posts waiting for moderation/deletion").
    1. Click on the preview (eye icon) button at the top right in order to see the finished form.
    1. Here's a bit of a tricky part: right click on the title of the question and click 'Inspect Element'.
    1. Search the source of the page for 'data-item-id'. Hang onto the number next to this value as you will need it in the next section. This is the postsCheckboxItD.
    1. Back in the form editor tab, look in the URL and grab the Form ID. It is in between `d/` and `/edit` (ex: `https://docs.google.com/forms/d/[your-id-is-this]/edit`).

### 6: Create a script to populate the moderator form
1. In the Data Storage spreadsheet, click the Tools menu and choose the Script editor.
1. Replace all of the code in the Code.gs file with the code found in `google-scripts/populate-admin-form.js`.
1. For each of the forms in step 5, fill in the corresponding values in lines 2-3 and 5-6 of this script.
1. Save the script.
1. Click Edit > Current Project Triggers
1. Add 2 new triggers:
    1. Time-driven, Minutes timer, Every minute
    1. From spreadsheet, On change
1. Save these, and you will be asked to grant the script access to several google services. Accept all of them.

### 7: Go back and finish up the user submission form
1. Back in the script editor for the Anon Post Submission Form, fill in the value on line 4 for `moderatorFormId` with the form ID you got in step 5.2.v.
1. Click Edit > Current Project Triggers
1. Add a new trigger:
    1. From form, On form submit
1. Save the trigger, and you will be asked to grant the script access to several google services. Accept all of them.

### 8: Create a script attached to the Admin Submission form to post submission to the Facebook Group
1. In the 'Moderator Post Submission Form', click the vertical three dots in the header and open the script editor.
1. In the menu, click on 'Resources > Libraries...' to open the external libraries pane.
1. In the 'Add a library' section, add 'MHMchiX6c1bwSqGM1PZiW_PxhMjh3Sh48' and click Add. Then click Save.
1. Replace all of the code in the Code.gs file with the code found in `google-scripts/admin-post-to-group.js`.
1. Replace the spreadsheet ID value in line 4 for 'dataStorageSheet' with the ID of the Data Storage sheet. (You've done this before in previous steps.)
1. Click Edit > Current Project Triggers
1. Add a new trigger:
    1. From form, On form submit
1. Save the trigger, and you will be asked to grant the script access to several google services. Accept all of them.

### 9: Create a script attached to the Admin Deletion form to delete submissions from the queue 
1. For the 'Moderator Post Deletion Form', follow the same instructions as the previous step, skipping steps 2 and 3 (adding the Moment library), and in step 4 taking the code from `google-scripts/admin-delete-from-queue.js`
1. The form in step 8 will post the submissions to the Facebook group. 
1. The form in this step removes posts from the queue if the moderators feel it should not be posted.
1. (An added step I took was to change the color of the post deletion form to red so that it's understood that it's a different action.)















