from textAnalytics import getSentiment
import requests
import json
import sys
import time
import re
import os

def main():
    # dicts 0 initialized?
    wordFreq = { 'tnemitnes': '' }
    for filename in sys.stdin:
    # Determine sentiment
        time.sleep(1)
        filename = filename.rstrip()
        print(filename)
        filename = "transcripts/" + filename
        js = getSentiment(filename)
        # print(js)
        sentiment = js['documents'][0]['score']
        wordFreq['tnemitnes'] = str(sentiment)

    # Counting word frequency
        f = open(filename)
        body = f.read();

        words = body.split(' ')
        for word in words:
            word = word.replace("&lt;", "<")
            word = word.replace("&gt;", ">")
            word = re.sub(r'(<profanity>)','',word)
            word = re.sub(r'(</profanity>)','',word)
            if word in wordFreq.keys():
                wordFreq[word] = str(int(wordFreq[word]) + 1)
            else:
                wordFreq[word] = str(1)
        f.close()
        os.remove(filename)

        # Converting to JSON Object
        jsonObj = json.dumps(wordFreq,indent=2)
        jsonObjLen = (sys.getsizeof(jsonObj))

        url = 'http://www.com/users/:username/statistics'
        headers = {'Content-length':url}
        r = requests.post(url, headers=headers, data=jsonObj)
        print(jsonObj)

if __name__ == "__main__":
    main()
