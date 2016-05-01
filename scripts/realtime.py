import pyaudio
import wave
import audioop

FILENAME_PREFIX = "recordings/audio"
FILENAME_SUFFIX = ".wav"
CHUNK = 8192
FORMAT = pyaudio.paInt16
CHANNELS = 1
RATE = 44100
RECORD_SECONDS = 10
INPUT_DEVICE = 2
TALKING_THRESHOLD = 2000
QUIET_FRAME_THRESHOLD = 5
MAX_FRAMES = 61

def writeFrames(audio, frames, index, prefix, suffix, channels, jformat, rate):
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

    frames = []

    try:
        index = 0
        while True:
            data = stream.read(CHUNK)
            if audioop.rms(data, 2) > TALKING_THRESHOLD:
                print("Recording")
                frames.append(data)
                quietFrames = 0
                while len(frames) < MAX_FRAMES and quietFrames < QUIET_FRAME_THRESHOLD:
                    data = stream.read(CHUNK)
                    frames.append(data)
                    if audioop.rms(data, 2) < TALKING_THRESHOLD:
                        quietFrames = quietFrames + 1
                    else:
                        quietFrames = 0
                print("Finished")
            if len(frames) >= MAX_FRAMES:
                writeFrames(p, frames, index, FILENAME_PREFIX, FILENAME_SUFFIX, CHANNELS, FORMAT, RATE)
                frames = []
                index = index + 1
    except KeyboardInterrupt:
        if len(frames) > 0:
            writeFrames(p, frames, index, FILENAME_PREFIX, FILENAME_SUFFIX, CHANNELS, FORMAT, RATE)
        pass

    print("")
    print("Cleaning up")
    stream.stop_stream()
    stream.close()
    p.terminate()

if __name__ == "__main__":
    main()
