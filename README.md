# Twilio Serverless JWT Callback

Twilio Serverless Function to demonstrate JWT Oauth callbacks/webhooks to Box and Google Sheets

**Important: Twilio Functions are limited to ~20 executions / second, so this is purely for demonstration and/or
relatively light use cases**

This uses the [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart) with the [Twilio Serverless Plugin](https://www.twilio.com/docs/twilio-cli/plugins)

## Installation

1.  Clone this Repo

2.  Copy the key from Google Step 2 (below) into the assets folder of your function and rename to key.private.json

3.  Deploy the Serverless Function using Twilio CLI

    ```zsh
    twilio serverless:deploy
    ```

    _Following initial deploy, if you want to overwrite an existing project_

    ```zsh
    twilio serverless:deploy --override-existing-project
    ```

4.  Once deployed, visit your [Twilio Functions](https://www.twilio.com/console/functions/overview/services) click on the service link and grab the URL for the Function and path - `https://jwt-callback-NNNN-dev.twil.io/google_callback`

5.  Alternatively, you can run this locally for testing. See [Developing with the Serverless Toolkit](https://www.twilio.com/docs/labs/serverless-toolkit/developing?code-sample=code-run-a-serverless-project-locally&code-language=twilio-cli&code-sdk-version=default)

## Basics for Google Auth Key

_(Google changes their IAM console regularly, so keeping this relatively generic)_

    1. Create a service account: https://console.developers.google.com/iam-admin/serviceaccounts/
    2. In options, create a key: this key client_secret.json
    3. Make the role owner for the service account
        - Member name = service account ID = service account email ex: someapp@appname-201813.iam.gserviceaccount.com
    4. Copy the email address of your service account = service account ID
    5. Simply go in your browser to the Google sheet you want to interact with
    6. Go to SHARE on the top right of your screen
    7. Go to advanced settings and share it with email address of your service account
        - ex: someapp@appname-201813.iam.gserviceaccount.com
