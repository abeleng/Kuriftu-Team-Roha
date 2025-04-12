import { useState, useRef } from 'react';
import { Star, Mic, StopCircle, ArrowLeft } from 'lucide-react';

export function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setAudioStream(stream);
      setIsRecording(true);

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
      };

      mediaRecorder.start();
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    if (audioStream) {
      audioStream.getTracks().forEach(track => track.stop());
      setAudioStream(null);
    }
    setIsRecording(false);
  };

  const discardRecording = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
  };

  return (
    <div className="min-h-screen bg-brand-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1582610116397-edb318620f90?auto=format&fit=crop&q=80"
          alt="Resort Background"
          className="w-full h-full object-cover fixed"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
      </div>

      {/* Voice Recording Modal */}
      {isRecording && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 text-center relative">
            <button
              onClick={stopRecording}
              className="absolute top-4 left-4 text-white/80 hover:text-white transition"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            
            {/* Voice Visualization */}
            <div className="w-48 h-48 relative mb-8">
              <div className="absolute inset-0 bg-brand-600/20 rounded-full animate-ping" />
              <div className="absolute inset-4 bg-brand-600/30 rounded-full animate-ping animation-delay-150" />
              <div className="absolute inset-8 bg-brand-600/40 rounded-full animate-ping animation-delay-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Mic className="h-12 w-12 text-white" />
              </div>
            </div>

            <p className="text-white/90 font-serif text-xl mb-8 animate-fade-in">
              Listening... Share your feedback
            </p>

            <button
              onClick={stopRecording}
              className="px-8 py-3 bg-brand-600 text-white rounded-full hover:bg-brand-700 transition transform hover:scale-105 flex items-center justify-center space-x-2 mx-auto"
            >
              <StopCircle className="h-5 w-5" />
              <span className="font-serif">Stop Recording</span>
            </button>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="bg-white/80 backdrop-blur-md rounded-lg shadow-2xl">
          <div className="px-8 py-12">
            <h2 className="text-4xl font-serif font-light text-center text-brand-900 mb-8">
              Share Your Experience
            </h2>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="text-center">
                  <label className="block text-xl font-serif text-brand-800 mb-4">
                    How would you rate your stay?
                  </label>
                  <div className="flex justify-center space-x-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="focus:outline-none transform hover:scale-110 transition"
                      >
                        <Star
                          className={`h-10 w-10 ${
                            star <= rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-brand-200'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-xl font-serif text-brand-800 mb-4">
                    Tell us about your experience
                  </label>
                  
                  {audioUrl ? (
                    <div className="bg-brand-50 rounded-lg p-4 space-y-4">
                      <audio src={audioUrl} controls className="w-full" />
                      <div className="flex justify-end space-x-4">
                        <button
                          type="button"
                          onClick={discardRecording}
                          className="px-4 py-2 text-brand-600 hover:text-brand-700 font-serif"
                        >
                          Discard
                        </button>
                        <button
                          type="button"
                          onClick={startRecording}
                          className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition font-serif"
                        >
                          Record Again
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        rows={4}
                        className="block w-full px-4 py-3 border border-brand-200 rounded-lg bg-white/70 backdrop-blur-sm shadow-sm focus:ring-brand-500 focus:border-brand-500 font-serif text-lg"
                        placeholder="Share your thoughts with us..."
                      />
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={startRecording}
                          className="flex items-center space-x-2 px-4 py-2 text-brand-600 hover:text-brand-700 font-serif"
                        >
                          <Mic className="h-5 w-5" />
                          <span>Record Voice Feedback</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-lg font-serif text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition transform hover:scale-105"
                >
                  Submit Feedback
                </button>
              </form>
            ) : (
              <div className="text-center animate-fade-in">
                <div className="text-brand-600 text-6xl mb-6">✦</div>
                <h3 className="text-3xl font-serif font-light text-brand-900 mb-4">
                  Thank you for sharing
                </h3>
                <p className="text-xl text-brand-600 font-serif">
                  Your feedback helps us create even more memorable experiences for our guests.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}