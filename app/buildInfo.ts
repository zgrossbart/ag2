export class BuildInfo {
    revision: number;
    date: Date;

    constructor() {
        console.log('BuildInfo constructor');
        this.revision = -1;
    }

}