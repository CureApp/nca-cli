// @flow

import {join} from 'path'

export default class Path {

    path: string;

    constructor(...names: Array<string>) {
        this.path = join(...names)
    }

    toString(): string {
        return this.path
    }
}
