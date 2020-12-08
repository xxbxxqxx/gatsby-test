version: 2
jobs:
  build:
    docker:
      - image: circleci/node:latest
    branches:
      only: master
    steps:
      - checkout
      - restore_cache:
          keys:
            - dependencies-
            # fallback to using the latest cache if no exact match is found
            - dependencies-
      - run:
          name: Install
          command: yarn install
      - save_cache:
          paths:
            - node_modules
          key: dependencies-
      - run:
          name: Gatsby build site
          command: yarn build
      - run: curl -L https://github.com/bep/s3deploy/releases/download/v2.2.0/s3deploy_2.2.0_Linux-64bit.tar.gz | tar xvz
      - run:
          name: deploy
          command: ./s3deploy -source=public/ -region=ap-northeast-1 -bucket=numb86.net