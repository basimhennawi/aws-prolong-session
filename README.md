# aws-prolong-session


### Problem

We want to keep AWS account logged-in for displaying some dashboards but Amazon cut the session out every 12 hours, as follow:

> For security purpose, a login session will expire in 12 hours when you sign into the AWS Management Console with your AWS or IAM account credentials. To resume your work after the session expires, we ask you to click the "Click login to continue" button and login again. The duration of federated sessions varies depending on the federation API (GetFederationToken or AssumeRole) and the administrator’s preference.

More about it here in [AWS FAQ](https://aws.amazon.com/console/faqs/#session_expire).

### Solution
A server that has a cron job running every specific time (_default: every 11 hours Mon-Fri_) to open the browser, go to AWS console page, enter the credentials, go to the desired Dashboard on CloudWatch service (_default: MainDashboard_).

### Setup process

Cloning the repo locally:
```bash
git clone https://github.com/basimhennawi/aws-prolong-session.git
``` 
Installing dependencies:
```bash
npm install
``` 
Run the server passing credentials as env params:

```bash
ACCOUNT_ID=<ACCOUNT_ID> USER=<USER> PASSWORD=<PASSWORD> URL=<DASHBOARD_URL> node app
``` 
License
---------
MIT @[Basim Hennawi](http://basimhennawi.com)
