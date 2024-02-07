## Purpose

- This utility helps to create the [JWT](https://developer.atlassian.com/cloud/jira/platform/understanding-jwt-for-connect-apps/) for the [Zephyr Squad Cloud APIs](https://zephyrsquad.docs.apiary.io/) via Node JS.
- This also has [sample ZAPI operations](https://zephyrsquad.docs.apiary.io/#) to get you started using [AXIOS](https://axios-http.com/docs/intro).

## Setup / Usage

### Pre-Requisites (** as applicable **)

- Get the ZAPI access key / secret: Go to your `JIRA project` --> Click on `Zephyr Squad` -->  `API Keys`



    ![image-2](https://github.com/sramgn/jira_zephyr_squad_zapi_nodejs_with_jwt_generator_and_axios/assets/7971131/59489f61-8e1b-4514-b91a-57aa8ef15626)

- Get the JIRA `account ID` by clicking on your profile. The value after `/people/` is your `account ID`. E.g. `https://acme.looney-tunes.net/jira/people/beep-beep-roadrunner-id`



    ![image-3](https://github.com/sramgn/jira_zephyr_squad_zapi_nodejs_with_jwt_generator_and_axios/assets/7971131/c62bbdb5-0683-4df8-b527-a16cbd28f5bb)

- Make sure you have an `active / unreleased fix version` in your project (E.g. below)


    ![image-5](https://github.com/sramgn/jira_zephyr_squad_zapi_nodejs_with_jwt_generator_and_axios/assets/7971131/3ee109f5-5652-4eb8-935b-6f6442310743)

- Get the `project ID` and `version ID`
    - `Project ID:` "Project --> Project Settings --> Details --> See the URL and grab the value after `pid`". E.g. `https://acme.looney-tunes.net/secure/project/EditProject!default.jspa?pid=99999`
    - `Version ID:` "Project --> Releases --> Click on the desired release / fix version --> See the URL and grab the value after `/versions/`". You can also dynamically fetch this from the ZAPI as well if you chose to go that route. E.g. `https://acme.looney-tunes.net/projects/WileECoyote/versions/11111/`

### Using / Running the Project

- Clone the project and run `yarn` at the root so all the dependencies are installed.
- Examples can be found under `sampleUsage.js`.
- Change the value of the var `RUN_METHODS` to `true` / `false`. Default is `true`.
- Change the value of the var `OPERATION` to the desired operation that you want generate the JWT / want to run. (E.g. GET CYCLES / CREATE FOLDER / ADD TEST TO A FOLDER)
- The `.env` file contains all the project properties. So please change the properties under this file based on your project / set up / need(s).
- Run the `sampleUsage.js` via your favorite IDE with the aforementioned configurations.

## Getting Help

- Contact - [Ram Sivasubramnaiam](https://www.linkedin.com/in/ramgopalsivasubramaniam/). If you decide to enhance / modify this repo by forking it, do let me know if you need any help. You can hit me up via LinkedIn.
- If you want to share feedback (or) report issues, please reach out via the repo's [issues](https://github.com/sramgn/jira_zephyr_squad_zapi_nodejs_with_jwt_generator_and_axios/issues) option.

 ## Additional Notes

 - This was forked from an [archived repo](https://github.com/zephyrdeveloper/zapi_nodejs). The original repo & the related forked repo(s) had some issues related to generating the JWT due to QSH, issues related to older versions of the packages being used, the way in which the ZAPI calls were made using a deprecated package `https://github.com/request`, etc.

- The current repo is updated with the latest package versions, custom code to resolve the QSH issue, custom code to invoke the API calls via AXIOS, etc.

## License

 - [MIT License](https://github.com/sramgn/jira_zephyr_squad_zapi_nodejs_with_jwt_generator_and_axios/tree/main?tab=MIT-1-ov-file)
 
