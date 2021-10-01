import ytdl from 'ytdl-core'; // import youtube downloader core
import fs from 'fs'; // import fs
import chalk from 'chalk';

const regex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/
const url = 'https://www.youtube.com/watch?v=xvltG-i6AS0'; // url of YouTube video to download

// confirm URL is a valid YouTube URL.
if(!regex.test(url)) {
    console.log(chalk.red("Please provide a valid YouTube URL."))
    process.exit(1)
}

const fileName = `${new Date().getDate() < 9 ? "0"+new Date().getDate() : new Date().getDate()}-${new Date().getDate() < 9 ? "0"+new Date().getMonth() : new Date().getMonth()}-${new Date().getFullYear()}_${new Date().getTime()}`; // name of file to store video in
const extension = 'mp4'; // file extension

// download and save
let video = ytdl(url).pipe(fs.createWriteStream(`./videos/${fileName}.${extension}`))

video.on("open", () => {
    console.log(chalk.green("Your download has started!"))
})

video.on('finish', () => {
    console.log(chalk.greenBright(`\nYour video from '${url}' has been saved to ${__dirname+`/videos/${fileName}.${extension}`}`))
    process.exit(0)
})

video.on("error", (error) => {
    throw new Error(`${error}`);
})