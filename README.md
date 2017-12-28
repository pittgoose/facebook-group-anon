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