import fs from "fs"
import { exec } from "child_process"
import * as url from 'url'
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const getVersion = () => JSON.parse(fs.readFileSync(`${__dirname}/../package.json`)).version;

/**
 * Converting it callback to promise to await for that nicely :)
 */
const execAsync = (cmd, verbose) => new Promise((ok, nok)=>{
    exec(cmd, (error, stdout) => {
        if (error) {
            console.log(error);
            nok(error.message);
            return;
        }
        verbose && console.log(stdout);
        ok(stdout);
    })
});

const replaceLocalsTFVersion = ({version}) => {
    const template = fs.readFileSync(`${__dirname}/locals.tf.template`).toString()
    fs.writeFileSync(`${__dirname}/../deploy/terraform/environments/prod/001/locals.tf`, template.replace('#tag-placeholder#', version))
}

const newNpmVersion = async({releaseType}) =>{
    await execAsync(`npm config set git-tag-version=false && npm version ${releaseType}`);
    return getVersion();
}

const hasTag = async({version}) =>{
    const existentTags = await execAsync(`git tag -l`);
    return existentTags.indexOf(version)!==-1
}

const setVersionFile = async ({version}) =>{
    await execAsync(`echo "export const version = '${version}'//autocreated with release.js" > src/version.js`);
}

const newReleaseLink = ({version}) => `https://github.com/elninhojs/graphql-random-data/releases/new?tag=v${version}`

const doGitStuff = async ({version, releaseType}) =>{

    if(!await hasTag({version})){
        await execAsync(`git add package*`);
        await execAsync(`git add src/version.js`);
        await execAsync(`git add deploy/terraform/environments/prod/001/locals.tf`);
        await execAsync(`git commit -m 'Releasing new version using npm run release:${releaseType}'`);
        await execAsync(`git push & exit 0`);
        console.log(`😎  The package.json, lock and src/version.js were pushed! Yay!`)

        await execAsync(`git tag v${version}`);
        await execAsync(`git push origin refs/tags/v${version}`);
        console.log(`🤓  Nice! the tag v${version} was created and we did push it already!`)

        console.log(`🥳  See below the next steps to complete the task!`)
    }else{
        console.log(`😔  Ow no! The tag v${version} already exist!`)
    }
}



const [arg0, agr1, releaseType] = process.argv;
const invalid = (!releaseType || releaseType.length===0 || "patchminormajor".indexOf(releaseType)===-1);
invalid && console.error("😰  Release type not found!! To use: npm run release <patch, minor or major>")

if(!invalid){
    (async () =>{
        
        try{
            const version = await newNpmVersion({releaseType})
            console.log(`🧐  Working with npm version ${version}`)
            await setVersionFile({version});
            replaceLocalsTFVersion({version})
            await doGitStuff({version, releaseType});
            console.log(`ℹ️  CD under construction`)
        }catch(e){
            console.error(`Unexpected error! ${e}`);
        }
    })();
}
