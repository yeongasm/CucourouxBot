const fs = require('fs');

class Logger {
    /**
     * Specify the path made to store the logfiles.
     * @param {string} logpath 
     */
    constructor(logpath) {
        this.__logdir = logpath;
        this.__logfile = `${this.GetCurrentDate().date}.log`;
    }

    Init() {
        fs.access(this.__logdir + this.__logfile, fs.constants.R_OK, err => {
            if (err) {
                console.log(`${logfile} 'not found! Making one now~'`);
                fs.writeFile(__logdir + logfile, '[LOGS]', (err) => {
                    if (err)
                        throw err;
            
                    console.log('Log file successfully created');
                });    
            }
        });
    }

    /**
     * Writes log data into the log files.
     * @param {string} data
     */
    Write(logcode, data) {
        let logstring = `[${this.GetCurrentDate().now}] ${logcode} ${data}.\n`;
        fs.appendFileSync(this.__logdir + this.__logfile, logstring, 'utf8');
    }

    GetCurrentDate() {
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let currTime = date.toLocaleTimeString();
    
        if (day < 10) day = '0' + day;
        if (month < 10) month = '0' + month;
    
        let today = {
            now : `${day}-${month}-${year}, ${currTime}`,
            time: currTime,
            date: `${day}-${month}-${year}`
        };
    
        return today;
    }
}

class Bot {
    /**
     * Specify the path made to store Cucouroux bot logs.
     * @param {string} logpath
     */
    constructor(logpath) {
        this.Log    = new Logger(logpath);
        this.reply  = false;
        this.msg    = ``;
    }

    /**
     * Takes in Discord's message and processes a return object.
     * @param {string} message
     */
    Listen(message) {
        let input_regex = new RegExp(`(~)(\\w+)(\\s)*(\\w+)*(\\s)*(\\w+)*`);

        let result = input_regex.exec(message);
        let obj = result[2];
        let ver = (this.IsVersion(result[4])) ? result[4] : '';
        let subfilter = (this.IsFilter(result[6])) ? result[6] : (this.IsFilter(result[4])) ? result[4] : '';

        let ver_regex = (this.IsVersion(ver)) ? `(${obj}[A-Za-z\\s'.]*)(.json)` : `(${obj}[A-Za-z\\s']*)(\\(${ver}\\)){0,1}(.json)`;
        let files;
        files = fs.readdirSync('./dump_data/characters/');
        let parser = new RegExp(ver_regex, 'i');
        let res_file = parser.exec(files.toString());

        if (!res_file) {
            this.Log("Could not find for obj in db. Check ./dump_data/ directory");
            this.reply  = true;
            this.msg    = 'ごめんなさい! Cucouroux wasn\'t able to find for it :(';
        }
    }



    Reply() {
        this.reply = false;
        return this.msg;
    }

    IsVersion(string) {
        let versionStr  = ['themed', 'halloween', 'sr', 'summer', 'event'];

        if (!string.length) {
            return false;
        }

        for (var i = 0; i < versionStr.length; i++) {
            if (string !== versionStr[i]) {
                return false;
            }
        }

        return true;
    }

    IsFilter(string) {
        let filterStr   = ['skill', 'ability', 'notes'];

        if (!string.length) {
            return false;
        }

        for (var i = 0; i < filterStr.length; i++) {
            if (string !== filterStr[i]) {
                return false;
            }
        }

        return true;
    }
}

module.exports = Bot;

