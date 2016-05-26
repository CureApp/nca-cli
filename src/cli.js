#!/usr/bin/env node
/*eslint no-console: 0 */
// @flow
import LocalNcaFile from './domain/local-nca-file'

export default function runNca(cwd: string, argv: Array<string>) {

    let localNca

    try {
        localNca = new LocalNcaFile(cwd)
    }
    catch (e) {
        console.error(NCA_NOT_INSTALLED)
        return process.exit(1)
    }

    localNca.execute(argv)
}

const NCA_NOT_INSTALLED = `
-------------------------------------------------------------------
    node-circleci-autorelease is not installed locally.

        npm install --save-dev node-circleci-autorelease

    If already isntalled, make sure you are in the project root.
-------------------------------------------------------------------
`

if (require.main === module) runNca(process.cwd(), process.argv.slice(2))
