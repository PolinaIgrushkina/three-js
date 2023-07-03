# Short documentation

## Installation and build
1. npm i --force - install dependencies
2. npm run start - run for development
3. npm run build - if you need get markup just run for prod build

## Setting for auto-deploy

1. Please notify your Team lead/Tech lead/PM/DevOps that you need to set auto-deploy on GitLab. 
2. Choice the git branch for auto-deploy and sent branch's name to DevOps.
3. When you will got username/projectName for gitlab-ci.yml please change it there on the 19th and 20th line

  `ssh -p22 yoursProjectName@157.90.224.110 "cd /home/yoursProjectFolder/projectFolder &&`
  `source /home/yoursProjectFolder/.nvm/nvm.sh &&`

4. That is it. Just make a commit and push new code to GitLab.

## Documentation for creating a markup project
<https://mettevo.worksection.com/d/7579531/>
