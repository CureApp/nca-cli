import fs from 'fs'
import Directory from './directory'
import Path from './path'
import File from './file'

/**
 * Node.js project root
 */
export default class ProjectRootDirectory {

    dir: Directory


    /**
     * Check if the given string is a valid project root directory.
     * Project root must contain node_modules and package.json
     */
    static isValid(dirPath: string): boolean {
        const packageJSONPath = new Path(dirPath, 'package.json').toString()
        const nodeModulePath = new Path(dirPath, 'node_modules').toString()

        // TODO: new File() && new Directory()
        return File.isValid(packageJSONPath) && Directory.isValid(nodeModulePath)
    }

    static assertValid(dirPath: string) {
        if (!this.isValid(dirPath))
            throw new Error(`"${dirPath}": package.json or node_modules is missing.`)
    }

    constructor(dirPath: string) {
        this.dir = new Directory(dirPath)
        this.constructor.assertValid(this.dir.toString())
    }

    /**
     * Get path of the given bin command
     */
    getBinPath(name: string): string {
        return new Path(this.dir.toString(), 'node_modules', '.bin', name).toString()
    }

    /**
     * Check if the project has the given bin command
     */
    hasBin(name: string): boolean {
        const path = this.getBinPath(name)
        return fs.existsSync(path) // TODO: needs symlink class
    }


    /**
     * Check if the project has the given node module
     */
    isInstalled(packageName: string): boolean {
        const path = new Path(this.dir.toString(), 'node_modules', packageName).toString()
        // TODO: new File() && new Directory()
        return Directory.isValid(path)
    }


    toString(): string {
        return this.dir.toString()
    }
}
