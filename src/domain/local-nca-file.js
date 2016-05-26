// @flow

import ProjectRootDirectory from './project-root-directory'

export default class LocalNcaFile {

    rootDir: ProjectRootDirectory

    static isValid(rootDir: ProjectRootDirectory): boolean {
        return rootDir.isInstalled('node-circleci-autorelease') && rootDir.hasBin('nca')
    }

    static assertValid(filePath: string) {
        if (!this.isValid(filePath))
            throw new Error(`"${filePath}": node-circleci-autorelease is not installed.`)
    }


    constructor(dir: string) {
        this.rootDir = new ProjectRootDirectory(dir)
        this.constructor.assertValid(this.rootDir)
    }


    execute(argv: Array<string>) {

        const binPath = this.rootDir.getBinPath('nca')
        // $FlowIssue - requiring non-literal
        const nca = require(binPath)
        nca.run(argv)
    }
}
