import pyaudio
import wave
import audioop

FILENAME_PREFIX = "recordings/audio"
FILENAME_SUFFIX = ".wav"
INDEX = 0
CHUNK = 8192
FORMAT = pyaudio.paInt16
CHANNELS = 1
RATE = 44100
RECORD_SECONDS = 9

def recordFragment(audio, index, chunk, jformat, channels, rate, prefix, suffix, time):
    frames = []
    for i in range(0, int(rate / chunk * time)):
        data = stream.read(chunk)
        frames.append(data)
    waveFile = wave.open(prefix+str(index)+suffix, 'wb')
    waveFile.setnchannels(channels)
    waveFile.setsampwidth(audio.get_sample_size(jformat))
    waveFile.setframerate(rate)
    waveFile.writeframes(b''.join(frames))
    waveFile.close()

p = pyaudio.PyAudio()

stream = p.open(format=FORMAT,
                channels=CHANNELS,
                rate=RATE,
                input=True,
                frames_per_buffer=CHUNK,
                input_device_index=2)

try:
    while True:
        data = stream.read(CHUNK)
        rms = audioop.rms(data, 2)    # here's where you calculate the volume
        print(rms)
        if rms > 2000:
            print("Recording")
            recordFragment(p, INDEX, CHUNK, FORMAT, CHANNELS, RATE, FILENAME_PREFIX, FILENAME_SUFFIX, RECORD_SECONDS)
            INDEX = INDEX + 1
            print("Finished")
except KeyboardInterrupt:
        pass

print("")
print("Cleaning up")
stream.stop_stream()
stream.close()
p.terminate()
