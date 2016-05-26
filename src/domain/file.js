// @flow

import fs from 'fs'

export default class File {

    filePath: string

    static isValid(filePath: string): boolean {
        return fs.existsSync(filePath) && fs.statSync(filePath).isFile()
    }

    static assertValid(filePath: string) {
        if (!this.isValid(filePath))
            throw new Error(`"${filePath}": No such file.`)
    }


    constructor(filePath: string) {
        this.filePath = filePath
        this.constructor.assertValid(this.filePath)
    }

    toString(): string {
        return this.filePath
    }
}
