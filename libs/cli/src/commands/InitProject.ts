import commander from 'commander';
import {getCurrentFolderName, isProject, PROJECT_CONFIG_FILE, writeConfig} from '../ConfigManager';
import {Colors, detectFramework, Frameworks, getDomain, packageVersion} from '../utils';
import ora from 'ora';
import {axiosInstance} from '../index';
import {ProjectConfigModel} from '../dtos/ProjectConfigModel';
import chalk from 'chalk';
import {displayLoginError, isLoggedIn} from '../services/UserService';
import {ProjectEntity} from '@upli/shared';

const prompts = require('prompts');

export const InitProject = commander.program.createCommand('init')
  .description('Initialize project in current path')
  .action(() => {
    if (!isLoggedIn()) {
      displayLoginError();
      return;
    }

    if (isProject()) {
      console.log(`${Colors.FgRed} This project has already been initialized${Colors.Reset}`);
    } else {
      (async () => {
        const detectedFramework = detectFramework();
        const promptResponse = await prompts([
            {
              type: 'text',
              name: 'name',
              message: `Project Name?`,
              initial: getCurrentFolderName(),
              validate: (name: string) => {
                if (name == 'exist') // TODO: check if project already exist
                  return `This project name already exist in your user account. You can delete it with ${Colors.FgCyan}upli project rm ${name}`;
                return true;
              }
            },
            {
              type: 'select',
              name: 'framework',
              message: 'Select a framework',
              choices: Frameworks.map(f => ({
                title: f.title,
                value: f.defaultConfig.framework,
                description: detectedFramework == f ? '(Auto detected)' : null
              })),
              initial: Frameworks.indexOf(detectedFramework)
            },
            {
              type: 'toggle',
              name: 'confirmation',
              message: 'Should the project be created now?',
              initial: true,
              active: 'yes',
              inactive: 'no'
            }
          ]
        );

        if (promptResponse.confirmation) {
          const spinner = ora('Create project').start();

          const selectedFramework = Frameworks.find(f => f.defaultConfig.framework == promptResponse.framework);
          if (!selectedFramework) {
            console.log(chalk.red(`Framework ${promptResponse.framework} not found`));
            return;
          }

          let project = {
            name: promptResponse.name,
            config: selectedFramework.defaultConfig
          } as ProjectEntity;


          spinner.info('Creating project...');
          axiosInstance.post('/api/project/create', project).then(res => {
            spinner.stop();
            project = res.data;
            spinner.succeed(`Project successfully created! Domain: ${chalk.bold(getDomain(project.domain))}`);
            writeConfig(PROJECT_CONFIG_FILE, {
              project: project,
              version: packageVersion
            } as ProjectConfigModel);
          }).catch(() => spinner.stop());
        }
      })();


    }
  });
