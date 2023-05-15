# ab-initio

> Playing around with NextJs server actions, trying to build a very basic weight tracking application without a single api route having to be written.

Name of repo: <https://en.wikipedia.org/wiki/Ab_initio>

## Goals

* [x] mobile first UI design
* [x] ability to set goal
  * [ ] useFormStatus to update ui to show mutation is happening, maybe even optomistic update?
* [ ] weigh in crud without rest api
  * [X] create
    * [x] have progress tracked for weigh ins (x lbs lost, to goal, etc)
    * [ ] useFormStatus to update ui to show mutation is happening
  * [X] read
    * [ ] pagination, maybe grab top 10 and then next button
  * [ ] update
    * [ ] use gesture such as slide it right to get edit/delete options
  * [ ] delete
    * [ ] use gesture such as slide it right to get edit/delete options
* [ ] Make form fields typed and validated, like zod/yup/react-hook-form. Need to wait some to see how server actions develop. Right now, I'm using ideas used over on remix forms since it has a similar approach to this idea of server actions
