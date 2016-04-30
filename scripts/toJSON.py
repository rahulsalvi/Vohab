from textAnalytics import getSentiment
import json
import sys

def main():
    # dicts 0 initialized?
    wordFreq = { 'tnemitnes': '' }
    for filename in sys.stdin:
    # Determine sentiment
        print(filename)
        filename = filename.rstrip()
        js = getSentiment(filename)
        print(js)
        sentiment = js['documents'][0]['score']
        wordFreq['tnemitnes'] = str(sentiment)


    # Counting word frequency
        f = open(filename)
        body = f.read();

        words = body.split(' ')
        for word in words:
            if word in wordFreq.keys():
                wordFreq[word] = str(int(wordFreq[word]) + 1)
            else:
                wordFreq[word] = str(1)

        f.close()


    # Converting to JSON Object
    jsonObj = json.dumps(wordFreq,indent=2)
    print(jsonObj)

if __name__ == "__main__":
    main()
