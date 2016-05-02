import http.client, urllib.parse, json
import os
import sys
import time

NUM_FILES_TO_AGGREGATE = 1

def main():
    #Note: Sign up at http://www.projectoxford.ai to get a subscription key.
    #Search for Speech APIs from Azure Marketplace.
    #Use the subscription key as Client secret below.
    clientId = "Alex"
    clientSecret = "f7013958686b4b80a033031915374b14"
    ttsHost = "https://speech.platform.bing.com"

    params = urllib.parse.urlencode({'grant_type': 'client_credentials', 'client_id': clientId, 'client_secret': clientSecret, 'scope': ttsHost})

    #print ("The body data: %s" %(params))

    headers = {"Content-type": "application/x-www-form-urlencoded"}

    AccessTokenHost = "oxford-speech.cloudapp.net"
    path = "/token/issueToken"

    # Connect to server to get the Oxford Access Token
    conn = http.client.HTTPSConnection(AccessTokenHost)
    conn.request("POST", path, params, headers)
    response = conn.getresponse()
    #print(response.status, response.reason)

    data = response.read()
    conn.close()
    accesstoken = data.decode("UTF-8")
    #print ("Oxford Access Token: " + accesstoken)

    #decode the object from json
    data=json.loads(accesstoken)
    access_token = data['access_token']

    # read filename from first arg
    # parser = argparse.ArgumentParser(description="Get transcription of audio file using Microsoft Cognitive Services.")
    #parser.add_argument("wav file",metavar='FILE',type=argparse.FileType('r'))
    # parser.add_argument('wavfile')
    # filename = parser.parse_args()
    #print("Beginning main loop")
    wavFilesProcessed = 0
    index = 0
    aggregatedTranscripts = ""
    for filename in sys.stdin:
        time.sleep(1)
        filename = filename.rstrip()
    #    print("recordings/" + filename)

        # Read the binary from wave file
        f = open("recordings/" + filename,'rb')
        try:
            body = f.read();
        finally:
            f.close()

        headers = {"Content-type": "audio/wav; samplerate=8000",
                   "Authorization": "Bearer " + access_token}

        #Connect to server to recognize the wave binary
        conn = http.client.HTTPSConnection("speech.platform.bing.com")
        conn.request("POST", "/recognize/query?scenarios=ulm&appid=D4D52672-91D7-4C74-8AD8-42B1D98141A5&locale=en-US&device.os=wp7&version=3.0&format=xml&requestid=1d4b6030-9099-11e0-91e4-0800200c9a66&instanceid=1d4b6030-9099-11e0-91e4-0800200c9a66", body, headers)
        response = conn.getresponse()

        #print(response.status, response.reason)
        data = response.read().decode()
        start = data.find("<lexical>")
        end = data.find("</lexical>")
        transcript = data[start+9:end]

        # print out the transcribed text
        if (not "NOSPEECH" in transcript) and (not "FALSERECO" in transcript):
            print(transcript)
            aggregatedTranscripts += (" " + transcript)
            wavFilesProcessed = wavFilesProcessed + 1
        else:
            print("NOSPEECH")

        conn.close()
        os.remove("recordings/" + filename)

        if wavFilesProcessed == NUM_FILES_TO_AGGREGATE:
            fo = open("transcripts/text" + str(index) + ".txt", "w")
            fo.write(aggregatedTranscripts)
            wavFilesProcessed = 0
            index = index + 1
            aggregatedTranscripts = ""
            fo.close()

if __name__ == "__main__":
    main()
