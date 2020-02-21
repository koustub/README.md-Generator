const inquirer = require('inquirer');
const axios = require('axios');
const util = require("util");
const fs = require('fs');
var response2;
var userProfile;
const writeFileAsync = util.promisify(fs.writeFile);
inquirer
    .prompt([{
        type: 'input',
        message: "whats your is Github user-name?",
        name: 'userName'
    }]).then(function (response) {
        userProfile = response.userName;
        console.log(`${userProfile}`);
        getRepos();
    });
async function getRepos() {
    try {
        response2 = await axios.get(`https://api.github.com/users/${userProfile}`);
        console.log(`${JSON.stringify(response2.data.avatar_url)}`);
        createReadme();

    }
    catch (error) {
        console.error(error);
    }
}

async function createReadme() {

    const myresponses = await inquirer
        .prompt([{
            type: 'input',
            message: "whats your is Project title?",
            name: 'ProjectTitle'
        },
        {
            type: 'input',
            message: "description for the project?",
            name: 'Description'
        },
        {
            type: 'input',
            message: "contents of the project?",
            name: 'TableOfContents'
        },
        {
            type: 'input',
            message: "what are installations for this project?",
            name: 'Installation'
        },
        {
            type: 'input',
            message: "what is usage of the project?",
            name: 'Usage'
        },

        {
            type: 'input',
            message: 'contribution to any of the project?',
            name: 'contribtuting'
        },
        {
            type: 'input',
            message: 'testing the projects ??',
            name: 'Tests'
        },
        {
            type: 'input',
            message: 'License for the project ??',
            name: 'License'
        }
        ]);

    const mydata = `## Git-hub\nProfile-name:**${response2.data.login}**\n## Profile Picture\n![Git-hub Profile Pictures](${response2.data.avatar_url})\n## PROJECT TITLE\n${myresponses.ProjectTitle}\n## DESCRIPTION\n${myresponses.Description}\n## Table Of Contents\n${myresponses.TableOfContents}\n## Installation\n${myresponses.Installation}\n## Usage\n${myresponses.Usage}\n## License\n${myresponses.License}\n## Contributions\n${myresponses.contribtuting}\n## Test\n${myresponses.Tests}`;
    const writeResult = await writeFileAsync('README.md', mydata);


}