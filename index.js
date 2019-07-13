#!/usr/bin/env node

/*!
 * sknode
 * Copyright(c) 2019 Chantatha Polsamak <chantatha.p@gmail.com>
 * MIT Licensed
 */

'use strict'
const { version } = require('./package.json')
const git = require('simple-git')
const rimraf = require('rimraf')
const fs = require('fs')
const Path = require('path')
const PATH = './'
const MOCK_REPO = 'https://github.com/enta1234/nodejs-slim-skeletion.git'
const MAIN_REPO = 'http://git.entronica.co.th:8888/chantatha/skeleton-node-entro.git'
const argv = require('minimist')(process.argv.slice(2), {
  alias: {
    h: 'help',
    v: 'version',
    m: 'mock'
  }
})
// console.log('input', argv)

if (argv.v || argv.version || argv._[0] === 'version') { process.stdout.write(version) } else if (argv.h || argv.help || argv._[0] === 'help') {
  process.stdout.write(
    'Sknode is the main command, used to build your skeleton project.\nSknode is a Fast and Easy use\nbuilt with love by chantatha.p(enta1234) and friends in Nodejs.\n\nUsage:\n  sknode [flages]\n  sknode [command]\n\nAvailable Commands:\n  create\t Create new Project for you\n\n'
  )
  process.stdout.write(
    'Flags:\n  -h, --help\t Help for sknode\n  -v, --version\t Print the version number of Sknode\n  -m, --mock\t For create mock skeleton\n\n'
  )
  process.stdout.write(
    'Use "sknode create <project-name> [flages]" for create you project.'
  )
} else if (argv._[0] === 'create') {
  const pname = argv._[1]
  createProject(PATH, pname)
}

async function createProject (path, name) {
  git(path).clone(argv.m ? MOCK_REPO : MAIN_REPO, name, (err, stu) => {
    if (err) return
    rimraf.sync(Path.join(path, name, '.git'))
    const packagejs = JSON.parse(fs.readFileSync(Path.join(path, name, 'package.json'), 'utf-8'))
    packagejs.name = name
    fs.writeFileSync(Path.join(path, name, 'package.json'), JSON.stringify(packagejs, null, 4))
    process.stdout.write('Sknode create project successfully.')
  }).clearQueue()
}
