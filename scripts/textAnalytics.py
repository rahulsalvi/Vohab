import json
import requests
import sys
import argparse

def getSentiment(filename):
    #parser = argparse.ArgumentParser(description="Get transcription of audio file using Microsoft Cognitive Services.")
    #parser.add_argument('transcript')
    #filename = parser.parse_args()
    #print(filename.transcript)

#    topics = 'https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/topics'
#    keyword = 'https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases'
    sentiment = 'https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment'

    #fr = open(filename.transcript, "r")
    fr = open(filename, "r")
    #print(fr.read())

#    topicData = {
#            "stopWords": [
#                "string"
#                ],
#            "topicsToExclude": [
#                "string"
#                ],
#            "documents": [
#                {
#                    "id": "string",
#                    "text": fr.read()
#                    }
#                ]
#            }
#    fr.seek(0)
#
#    keywordData = {
#            "documents": [
#                {
#                    "language": "string",
#                    "id": "string",
#                    "text": fr.read()
#                    }
#                ]
#            }
#    fr.seek(0)
#
    sentimentData = {
            "documents": [
                {
                    "id": "transcript",
                    "text": fr.read()
                    },
                ]
            }
    fr.seek(0)
    fr.close()

#    jsonTopic = json.dumps(topicData,indent=4)
#    jsonKeyword = json.dumps(keywordData,indent=4)
    jsonSentiment = json.dumps(sentimentData,indent=4)
#    topicDataLen = (sys.getsizeof(jsonTopic))
#    keywordDataLen = (sys.getsizeof(jsonKeyword))
    sentimentDataLen = (sys.getsizeof(jsonSentiment))

    contentType = 'application/json'
    host = 'westus.api.cognitive.microsoft.com'
    key = '25ca688a32ae400fa3eb96b3b78745a6'

#    topicHeaders = {'Content-Type':contentType,'Host': host,'Content-Length':topicDataLen,'Ocp-Apim-Subscription-Key':key}
#    keywordHeaders = {'Content-Type':contentType,'Host': host,'Content-Length':keywordDataLen,'Ocp-Apim-Subscription-Key':key}
    sentimentHeaders = {'Content-Type':contentType,'Host': host,'Content-Length':sentimentDataLen,'Ocp-Apim-Subscription-Key':key}

    #r = requests.post(url, headers=headers, json=payload)
    #print(r.json())
#   print(len(repr(json.dumps(sentimentData, indent=2))))
#    print (jsonSentiment)
    sentRes = requests.post(sentiment, headers=sentimentHeaders, json=sentimentData)
    return sentRes.json()
#    print(sentRes.json())
