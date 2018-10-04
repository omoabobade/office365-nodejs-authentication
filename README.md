## office365-nodejs-authentication
Authentication layer for nodejs off office365, it is a workaround and currently rides on nodemailer to authenticate users.

## Code Example

  var office365Auth = require('office365-nodejs-authentication');

    var formattedNum = office365Auth(email, password, applicationName, (error, info)=>{
      if(error)return error;
      console.log(info.messageId, info.response);
    });

## Motivation

I am trying to authenticate users off office365 in a react application but could find API access to get that done. I noticed when sending email via Office365 SMTP server user details gets authenticated, so i decided to use this as a workaround. Hope you enjoy using the plugin.

## Installation

  `npm install office365-nodejs-authentication`

## API Reference

Depending on the size of the project, if it is small and simple enough the reference docs can be added to the README. For medium size to larger projects it is important to at least provide a link to where the API reference docs live.

## Tests

  `npm test`

## Contributors

Contributions are welcome via pull requests and issues.
