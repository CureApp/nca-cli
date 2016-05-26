// @flow

import fs from 'fs'

export default class Directory {

    dirPath: string

    static isValid(dirPath: string): boolean {
        return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()
    }

    static assertValid(dirPath: string) {
        if (!this.isValid(dirPath))
            throw new Error(`"${dirPath}": No such directory.`)
    }


    constructor(dirPath: string) {
        this.dirPath = dirPath
        this.constructor.assertValid(this.dirPath)
    }

    toString(): string {
        return this.dirPath
    }
}
