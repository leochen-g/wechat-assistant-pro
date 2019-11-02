var Recognizers = require('@microsoft/recognizers-text-suite');
const defaultCulture = Recognizers.Culture.Chinese;
const debug = require("debug")("nlp.js")
Date.prototype.format = function(formatStr){
    var str = formatStr;
    if(!formatStr){
        str = "yyyy-MM-dd hh:mm:ss";//默认格式
    }
    var Week = ['日','一','二','三','四','五','六'];
     
    str=str.replace(/yyyy|YYYY/,this.getFullYear());
    str=str.replace(/yy|YY/,(this.getYear() % 100)>9?(this.getYear() % 100).toString():'0' + (this.getYear() % 100));
     
    str=str.replace(/MM/,this.getMonth()>=9?(parseInt(this.getMonth())+1).toString():'0' + (parseInt(this.getMonth())+1));
    str=str.replace(/M/g,(parseInt(this.getMonth())+1));
     
    str=str.replace(/w|W/g,Week[this.getDay()]);
     
    str=str.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());
    str=str.replace(/d|D/g,this.getDate());
     
    str=str.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());
    str=str.replace(/h|H/g,this.getHours());
    str=str.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());
    str=str.replace(/m/g,this.getMinutes());
     
    str=str.replace(/ss|SS/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());
    str=str.replace(/s|S/g,this.getSeconds());
     
    str=str.replace(/iii/g,this.getMilliseconds()<10?'00'+this.getMilliseconds():(this.getMilliseconds()<100?'0'+this.getMilliseconds():this.getMilliseconds()));
     
    return str;
}
//const NLP = require('chi-time-nlp')
//	var nlp = new NLP()

var bosonnlp = require('bosonnlp')
var b_nlp = new bosonnlp.BosonNLP('6wXvIkZk.35344.lbaaVKiTzyh6')

function getTimeInResults(results) {
    debug('getTimeInResult()', {results})
    var result
    var date
    var time
    var datetime

    // if results have date and time, just return value
    result = results.find(x => x.typeName === 'datetimeV2.datetime')
    if (result) {
        if (result.resolution.values[1])
            datetime = new Date(result.resolution.values[1].value).toLocaleString()
        else
            datetime = new Date(result.resolution.values[0].value).toLocaleString()

        return datetime
    }

    // first deal with time
    time = results.find(x => x.typeName === 'datetimeV2.time')
    var timeStr
    if (time) {
        timeStr = time.resolution.values[0].value
        if (time.resolution.values[1] && time.resolution.values[1] < "23:59:59")  // we prefer the later time for kid's class
            timeStr = time.resolution.values[1].value
    } else {
        time = results.find(x => x.typeName === 'datetimeV2.timerange')
        if (time) {
            timeStr = time.resolution.values[0].start
        } else {
            // do nothing with timeStr
        }
    }
    debug({timeStr})

    if (!timeStr) {
        // if results have date and time range, we return start
        result = results.find(x => x.typeName === 'datetimeV2.datetimerange')
        if (result) {
	        if(result.resolution.values[1])
		        datetime = new Date(result.resolution.values[1].start).toLocaleString()
	        else
		        datetime = new Date(result.resolution.values[0].start).toLocaleString()

            return datetime
        } else
            return // undefined
    }

    // then deal with date
    date = results.find(x => x.typeName === 'datetimeV2.date')
    var dateStr
    if (date) {
        dateStr = date.resolution.values[0].value
        if(date.resolution.values[1])
            dateStr = date.resolution.values[1].value
    } else {
        date = results.find(x => x.typeName === 'datetimeV2.daterange')
        if (date) {
            dateStr = date.resolution.values[0].start
        } else {
            result = results.find(x => x.typeName === 'datetimeV2.datetimerange')
            if (result) {
                if(result.resolution.values[1])
                    dateStr = new Date(result.resolution.values[1].start).toDateString()
                else
                    dateStr = new Date(result.resolution.values[0].start).toDateString()
            } else {
                dateStr = new Date().format('yyyy/MM/dd')
            }
        }
    }
    debug({dateStr})
    
    datetime = new Date(`${dateStr} ${timeStr}`).toLocaleString()
    return datetime
}

function parseTime(input) {
    debug('input before recognizeDateTime', input)
	// no longer using ChiTimeNlp
	//const time = nlp.parse(input)
	//return time

    var results = Recognizers.recognizeDateTime(input, defaultCulture)
    console.log('2132',results);
    
    
    debug('results after recognizeDateTime', results)
    var time = null

    if (results.length > 0) {
        // show details in results, we can not use one line to print due to values[] inside
        results.forEach(function (result) {
            debug(JSON.stringify(result, null, "\t"));
        });

        // we only pick up those item which has datetime or time
        //results = results.filter(r => r.typeName === 'datetimeV2.date' || r.typeName === 'datetimeV2.datetime' || r.typeName === 'datetimeV2.time' || r.typeName === 'datetimeV2.timerange' || r.typeName === 'datetimeV2.datetimerange')
        //debug('results after filter', results)

        if (results.length > 0) {
            time = getTimeInResults(results)
            debug('time: ', time && time.toLocaleString())
        }
    }

    return time
}

function parseTitleAndLocation(input, callback) {
        var title = input.substring(0, 16)
        var location = 'beijing'

        b_nlp.ner(input, function (result) {
            debug('result:', result);

            var b_result = JSON.parse(result)
            debug('result[0]:', b_result[0]);
            if (b_result[0]) {
                const length = b_result[0]["word"].length
                for (var i = 0; i < length; i++)
                    debug('[index, word, tag] -> ', i, b_result[0]["word"][i], b_result[0]["tag"][i])

                //debug('result[0]["word"]', b_result[0]["word"])
                title = b_result[0]["word"].filter((x,index) =>
                    b_result[0]["tag"][index] === 'n' ||
                    b_result[0]["tag"][index] === 'nl' ||
                    b_result[0]["tag"][index] === 'nz' ||
                    b_result[0]["tag"][index] === 'v' ||
                    b_result[0]["tag"][index] === 'vi' ||
                    b_result[0]["tag"][index] === 's')
                    .slice(0, 3)
                    .join('')

                location = b_result[0]["word"].filter((x,index) =>
                    b_result[0]["tag"][index] === 'ns' ||
                    b_result[0]["tag"][index] === 'nt' ||
                    b_result[0]["tag"][index] === 'nz' ||
                    b_result[0]["tag"][index] === 'an' ||
                    b_result[0]["tag"][index] === 'n' ||
                    b_result[0]["tag"][index] === 'm' ||
                    b_result[0]["tag"][index] === 'q' ||
                    b_result[0]["tag"][index] === 's')
                    .slice(0, 5)
                    .join('')

                // [2, 9, "location"]
                var location_array = b_result[0].entity.filter(item => item.indexOf("location")>=0)

                if (location_array.length > 0) {
                    // clear the old location value
                    location = ""

                    for (var i = 0; i < location_array.length; i++) {
                        const from = location_array[i][0]
                        const to = location_array[i][1]
                        //debug({from}, {to})

                        const l = b_result[0]["word"].slice(from, to).join('')
                        //debug(l)

                        // make the new location value
                        location += l
                    }
                }

                callback(title, location)
            }
        });
}
let res = parseTime('两个月前')
console.log(res);

module.exports = { parseTime, parseTitleAndLocation }
