# Chatroom frontend
Entry: https://practice-272116.appspot.com/

Simple chat app frontend implemented with React.

### How to run
Make sure you have `node` and `npm` installed, and run `npm i -g serve` first if you want to serve static built files.  
  
Create `.env` file according to `.env.example`.

* Run `npm run start` to serve static built files at `localhost:5000`, you should run `npm run build` before this command.
* Run `num run local` to start a local app.

Note: You can set environment variable `PORT` to run the server on different port.

### Deployment
* `gcloud auth login`
* `gcloud app deploy`
* `gcloud app deploy dispatch.yaml` for routing requests that matches specific pattern to api service, you only need to run this once.
