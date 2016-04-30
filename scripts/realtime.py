import pyaudio
import wave
import audioop

FILENAME_PREFIX = "recordings/audio"
FILENAME_SUFFIX = ".wav"
CHUNK = 8192
FORMAT = pyaudio.paInt16
CHANNELS = 1
RATE = 44100
RECORD_SECONDS = 9
INPUT_DEVICE = 2

def recordFragment(audio, stream, index, chunk, jformat, channels, rate, prefix, suffix, time):
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


def main():
    p = pyaudio.PyAudio()

    stream = p.open(format=FORMAT,
                    channels=CHANNELS,
                    rate=RATE,
                    input=True,
                    frames_per_buffer=CHUNK,
                    input_device_index=INPUT_DEVICE)

    try:
        index = 0
        while True:
            data = stream.read(CHUNK)
            rms = audioop.rms(data, 2)    # here's where you calculate the volume
            print(rms)
            if rms > 2000:
                print("Recording")
                recordFragment(p, stream, index, CHUNK, FORMAT, CHANNELS, RATE, FILENAME_PREFIX, FILENAME_SUFFIX, RECORD_SECONDS)
                index = index + 1
                print("Finished")
    except KeyboardInterrupt:
            pass

    print("")
    print("Cleaning up")
    stream.stop_stream()
    stream.close()
    p.terminate()

if __name__ == "__main__":
    main()
