# facebook-group-anon
Code and guidelines for anonymous posting to a Facebook group using Google Drive

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
2 | Last Refresh | 2017-12-10T11:31:45+02:00
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

### 5: Create a form where admins can moderate submissions
1. Add a new form called 'Moderator Post Submission Form'. This form MUST be kept private. It is technically a publicly accessible link, but should be kept to moderator use only.
1. Add a single "Checkboxes" field and don't give it any values. Call it whatever you'd like (I used "Posts waiting for moderation").
1. At the top right corner of the form, to the right of the "Send" button, click on the vertical three dots, and select "Script editor".



















