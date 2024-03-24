require('dotenv').config({path: '.env.deploy'});

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REPO, DEPLOY_REF = 'origin/master',
} = process.env;

module.exports = {
  apps: [{
    name: 'api-service',
    script: './dist/app.js',
  }],

  // Настройка деплоя
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      'pre-deploy': `RSYNC_RSH='ssh -o StrictHostKeyChecking=no' rsync -av ./*.env sashaslab@178.154.201.109:/home/sashaslab/web-plus-pm2-deploy`,
      'post-deploy': 'npm i && npm run build',
    },
  },
};